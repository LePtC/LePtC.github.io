// showlxy.js for LePtC [2015.0320]
// 代码来自 http://www.bilibilijj.com/

function ShowLXY() {

    if (!window.localStorage.LX1) { $.ajax({ type: "GET", async: false, url: "/js/lx1.html", data: { t: Math.random() }, dataType: "text", success: function (data) { window.localStorage.LX1 = data; } }); }

    var ID = Math.random().toString().substring(2, 9); var Speed = 5 + parseFloat(Math.random() * 5); var Wdith = 50 + parseFloat(Math.random() * 70); var Temp = "<img id='" + ID + "' style='width:" + Wdith + "px;position: fixed; top: -200px; left: " + (300 + Math.random() * ($(window).width() + 700)) + "px; transition: top " + Speed + "s, left " + Speed + "s, right " + Speed + "s, height " + Speed + "s, width " + Speed + "s; -webkit-transition: top " + Speed + "s, left " + Speed + "s, right " + Speed + "s, height " + Speed + "s, width " + Speed + "s;z-index: -5;'>"; $("body").append(Temp); setTimeout(function () {

        $("#" + ID).attr("src", window.localStorage.LX1)

        $("#" + ID).css({ "top": "2000px", "left": (parseInt($("#" + ID).css("left").toString().replace("xp", "")) - 3100) + "px", "opacity": parseFloat("0." + (3 + Math.random() * 7)) });

    }, 100); setTimeout(function () { $("#" + ID).remove(); }, 3500);

}

var LXTime = 1000; var LXSet;

function ShowLXYGo() {
	clearInterval(LXSet);
	ShowLXY();
	LXTime = Math.random() * 3000;
	LXSet = setInterval(function () { ShowLXYGo(); }, LXTime);
}

ShowLXYGo();
