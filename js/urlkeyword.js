// urlkeyword.js for LePtC [2016.1206]
// 代码来自：http://stackoverflow.com/questions/2405355/how-to-pass-a-parameter-to-a-javascript-through-a-url-and-display-it-on-a-page

// LePtC.github.io/index.html?Loc=标题&Search=笔记 
var GET = {};
var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++)
{
  if (query[i] === "") 
      continue;
  var param = query[i].split("=");
  GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
} // Usage: GET.Use_id or GET["Use_id"]

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

window.onload = function() {
var lo = GET["Loc"];
var gt = GET["Search"];
if(!isBlank(gt)) {
  document.getElementById(lo).setAttribute("value", gt);
var event = new Event('change');
document.getElementById(lo).dispatchEvent(event);
}
// document.getElementById("debuglpc").innerHTML = gt;
}

function inject(loc,str) {
  
document.getElementById("标题").setAttribute("value", "");
var event = new Event('change');
document.getElementById("标题").dispatchEvent(event);

document.getElementById("站点").setAttribute("value", "");
var event = new Event('change');
document.getElementById("站点").dispatchEvent(event);

document.getElementById("标签").setAttribute("value", "");
var event = new Event('change');
document.getElementById("标签").dispatchEvent(event);

document.getElementById(loc).setAttribute("value", str);
var event = new Event('change');
document.getElementById(loc).dispatchEvent(event);
}

