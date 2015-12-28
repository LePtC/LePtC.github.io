// rotate.js for LePtC [2015.1228]
// 代码来自：https://www.developphp.com/video/JavaScript/Transform-Rotate-Image-Spin-Smooth-Animation-Tutorial


var looper;
var degrees = 0;
function rotateAnimation(el,speed){
  var elem = document.getElementById(el);
  if(navigator.userAgent.match("Chrome")){
    elem.style.WebkitTransform = "rotate("+degrees+"deg)";
  } else if(navigator.userAgent.match("Firefox")){
    elem.style.MozTransform = "rotate("+degrees+"deg)";
  } else if(navigator.userAgent.match("MSIE")){
    elem.style.msTransform = "rotate("+degrees+"deg)";
  } else if(navigator.userAgent.match("Opera")){
    elem.style.OTransform = "rotate("+degrees+"deg)";
  } else {
    elem.style.transform = "rotate("+degrees+"deg)";
  }
  looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
  degrees+=0.1;
  if(degrees > 359.9){
    degrees = 0.1;
  }
  document.getElementById("status").innerHTML = "rotate("+degrees+"deg)";
}

