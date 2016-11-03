function DebugManager(game_manager) {
  this.events = {};
  this.game_manager = game_manager;

  this.listen();
}

function logGridCell() {
    console.log("Grid Cell: (" + this.x + ", " + this.y + ")")
}

DebugManager.prototype.listen = function () {
    var self = this;

    var grids = document.getElementsByClassName("grid-cell");
    var size = this.game_manager.size;
    for (i = 0; i < grids.length; i++) {
        grid = grids[i];
        x = i % size;
        y = Math.floor(i / size);
        grid.addEventListener("click", logGridCell.bind({x: x, y: y, grid: grid}));
    }
    
};
