// mousetoggle.js for LePtC [2015.03.17]
// 代码来自 http://stackoverflow.com/questions/2707100/how-to-show-hidden-divs-on-mouseover

function show(id) {
  document.getElementById(id).style.visibility = "visible";
}
function hide(id) {
  document.getElementById(id).style.visibility = "hidden";
}

// [2016.09.08]
// http://www.dustindiaz.com/seven-togglers/

function toggle(obj) {
  var el = document.getElementById(obj);
  if ( el.style.display != 'block' ) {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}
