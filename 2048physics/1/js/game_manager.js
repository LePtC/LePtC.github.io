var maxscore    = 2;
var ID_LEPTON   = 0; // 轻子
var ID_QUARK    = 2; // 夸克
var ID_HADRON   = 4; // 强子
var ID_NUCLEI   = 8; // 原子核
var ID_ATOM     = 16;// 原子
var MAX_COUNTER = 3;

function GameManager(size, InputManager, Actuator, ScoreManager) {
    this.size         = size; // Size of the grid
    this.inputManager = new InputManager;
    this.scoreManager = new ScoreManager;
    this.actuator     = new Actuator;

    this.startTiles   = 2;

    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

    this.undoStack = [];
    this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  maxscore = 2;
  this.actuator.continue();
  this.setup();
};

// Keep playing after winning
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continue();
};

GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid        = new Grid(this.size);

  this.score       = 0;
  this.over        = false;
  this.won         = false;
  this.keepPlaying = false;
  this.seed        = Math.random();

  // Add the initial tiles
  this.addStartTiles();

  // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
    for (var i = 0; i < this.startTiles; i++) {
        // reduce difficulty
        var tile = new Tile(this.grid.randomAvailableCell(), ID_QUARK);
        this.grid.insertTile(tile);
    }
};

// Count the number of tiles with its value equals to 'value'
GameManager.prototype.countTile = function (value) {
    var count = 0;
    this.grid.eachCell(function (x, y, tile) {
        if (tile && tile.value == value) {
            ++count;
        }
    });
    return count;
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
    if (this.grid.cellsAvailable()) {
        Math.seedrandom(this.seed);
        for (var i=0; i<this.score; i++) {
            Math.random();
        }
        var random = Math.random();
        var countNuclei = this.countTile(ID_NUCLEI);
        var countLepton = this.countTile(ID_LEPTON);
        var value = random < 0.9 ? (random < 0.9 * ((countNuclei - countLepton > 0) ? 1 : 0) ? 0 : 2) : 4;
        // prevent the same continuous result
        var tile = new Tile(this.grid.randomAvailableCell(), value);

        this.grid.insertTile(tile);
    }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.scoreManager.get() < this.score) {
    this.scoreManager.set(this.score);
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.scoreManager.get(),
    terminated: this.isGameTerminated()
  });

};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2:down, 3: left, -1: undo
  var self = this;

  if (direction == -1) {
    if (this.undoStack.length > 0) {
      var prev = this.undoStack.pop();

      this.grid.build();
      this.score = prev.score;
      for (var i in prev.tiles) {
        var t = prev.tiles[i];
        var tile = new Tile({x: t.x, y: t.y}, t.value);
        tile.previousPosition = {
          x: t.previousPosition.x,
          y: t.previousPosition.y
        };
        this.grid.cells[tile.x][tile.y] = tile;
      }
      this.over = false;
      this.won = false;
      this.keepPlaying = false;
      this.actuator.continue();
      this.actuate();
    }
    return;
  }
  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;
  var undo       = {score: this.score, tiles: []};

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);
        
        // 三个夸克合成一个强子
        if (tile.value == ID_QUARK) {
            // get the third tile
            var posnext   = self.findFarthestPosition(positions.next, vector);
            var nextnext  = self.grid.cellContent(posnext.next);
            
            if (next && nextnext
                    && next.value       == ID_QUARK
                    && nextnext.value   == ID_QUARK
                    && !next.mergedFrom) {
                // We need to save tile since it will get removed
                undo.tiles.push(tile.save(posnext.next));
                undo.tiles.push(next.save(posnext.next));
                
                var merged = new Tile(posnext.next, ID_QUARK * 2);
                merged.mergedFrom = [tile, next, nextnext];

                self.grid.insertTile(merged);
                self.grid.removeTile(tile);
                self.grid.removeTile(next);

                // Converge the two tiles' positions
                tile.updatePosition(posnext.next);
                next.updatePosition(posnext.next);

                // Update the score
                self.score += merged.value;
            } else {
                // Save backup information
                undo.tiles.push(tile.save(positions.farthest));
                self.moveTile(tile, positions.farthest)
            }
        }
        // 原子核 与 轻子 合成 原子
        else if (tile.value == ID_LEPTON || tile.value == ID_NUCLEI) {
            if (next && (next.value + tile.value == ID_NUCLEI) && !next.mergedFrom) {
                // We need to save tile since it will get removed
                undo.tiles.push(tile.save(positions.next));
                var merged = new Tile(positions.next, ID_ATOM);
                merged.mergedFrom = [tile, next];

                self.grid.insertTile(merged);
                self.grid.removeTile(tile);

                // Converge the two tiles' positions
                tile.updatePosition(positions.next);

                // Update the score
                self.score += merged.value;
            } else {
                // Save backup information
                undo.tiles.push(tile.save(positions.farthest));
                self.moveTile(tile, positions.farthest);
            }
        }
        // Only one merger per row traversal?
        else if (next && next.value === tile.value && !next.mergedFrom) {
            // We need to save tile since it will get removed
            undo.tiles.push(tile.save(positions.next));
            var merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            self.grid.insertTile(merged);
            self.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            self.score += merged.value;

            if (merged.value > maxscore)
                maxscore = merged.value;

            // The mighty 2048 tile
            if (merged.value === 2048) self.won = true;
        } else {
            // Save backup information
            undo.tiles.push(tile.save(positions.farthest));
            self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    // Save state
    this.undoStack.push(undo);
    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // up
    1: { x: 1,  y: 0 },  // right
    2: { x: 0,  y: 1 },  // down
    3: { x: -1, y: 0 }   // left
  };

  return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};
