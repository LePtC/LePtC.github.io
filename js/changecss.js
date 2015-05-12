// changecss.js for LePtC [2015.0407]
// 代码来自 http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript


// function myHide(obj){
//   addRule(document.styleSheets[0],'#topwarning','display:none;');
// }

function addRule(sheet, selectorText, value) {
  // W3C model
  if (typeof sheet.insertRule == 'function') {
    sheet.insertRule(selectorText + ' {' + value + '}', sheet.cssRules.length);
  // IE model
  } else if (sheet.addRule) {
    sheet.addRule(selectorText, value, sheet.rules.length);
  }
}
