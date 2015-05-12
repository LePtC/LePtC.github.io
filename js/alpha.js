// alpha.js for LePtC [2015.0320]
// 代码来自：LePtC 原创
/* Shared under the MIT license */


var d = 1;

function alphaimg(){

	var element1 = document.getElementById("alphaimg1");

	var a = paralpha(d);

	element1.style.opacity = a/20.0;
	element1.style.filter  = 'alpha(opacity='+(a*5)+')'; // IE fallback

	d++;
}

function paralpha(d){
	var a = d % 40;
	if(a>20){
		a = 40-a;
	}
	return a;
}

setInterval(alphaimg,100)

