


jQuery.get("https://raw.githubusercontent.com/LePtC/LeDataFile/master/FindRank2Fansu.txt", function(response){
var dat = response.split("\n").map(function(row){return row.split(",");});


jQuery.get("https://raw.githubusercontent.com/LePtC/LeDataFile/master/FindIDZf-f17.txt", function(response){
var datid = response.split("\n").map(function(row){return row.split(",");});




String.prototype.format = function(args) {
  var result = this;
  if (arguments.length < 1) {
    return result;
  }
  var data = arguments;
  if (arguments.length == 1 && typeof(args) == "object") {
    data = args;
  }
  for (var key in data) {
    var value = data[key];
    if (undefined != value) {
      result = result.replace("{" + key + "}", value);
    }
  }
  return result;
}

Highcharts.chart('container', {

    chart: {
        zoomType: 'xy'
    },

    title: {
        text: 'B 站 UP 主排名对应粉丝量'
    },

    subtitle: {
        text: '<span style="font-size:12px">数据统计＆网页制作：B站UP主 <a herf="http://space.bilibili.com/2654670/" style="font-size:12px;color:#ff8800">＠狸子LePtC</a></span>'
    },

    xAxis: {
          type: 'datetime',
          gridLineWidth: 1,

        labels: {
          formatter: function () {
            var d = new Date(this.value);
            return Highcharts.dateFormat('%y.%m.%d',this.value) + '<br/>周' +'日一二三四五六'[d.getDay()];
          }
        }

    },

  yAxis: [{ // Primary yAxis
        title: {
          text: '排名对应粉丝量',
          style: {
            fontSize: "18px"
          }
        },
        minTickInterval: 1,
        gridLineWidth: 1

      }, { // Secondary yAxis
        title: {
          text: 'UP主粉丝量',
          style: {
            fontSize: "18px"
          }
        },
        opposite: true,
        minTickInterval: 1,
        gridLineWidth: 1
      }],


    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
          cursor: 'pointer',
            label: {
                connectorAllowed: false
            }
        }
    },

    tooltip: {

      formatter: function () {
        var d = new Date(this.x);
        var dayName = "";//'星期' + '日一二三四五六'[d.getDay()];
        var tooltip_str = '<span style="font-size: 10px">{0}</span>'.format(dayName);
        for(var i=0; i<this.points.length; i++){
          tooltip_str = tooltip_str + '<br/><span style="color:{0}">\u25CF</span> {1}: <b>{2}</b>'.format(
            this.points[i].series.color, this.points[i].series.name, this.points[i].y);
        }
        return Highcharts.dateFormat('%Y.%m.%d',this.x) + ' 周' +'日一二三四五六'[d.getDay()] + tooltip_str;
      },

        shared: true,
        crosshairs: [true, true]  // 同时启用竖直及水平准星线
    },

    series: [
    {
        name: '第1名',
        yAxis: 0,
        data: getCol(dat, 1)
    }, {
        name: '第10名',
        yAxis: 0,
        data: getCol(dat, 2)
    }, {
        name: '第100名',
        yAxis: 0,
        data: getCol(dat, 3)
    }, {
        name: '第1000名',
        yAxis: 0,
        data: getCol(dat, 4)
    }, {
        name: '第5000名',
        yAxis: 0,
        data: getCol(dat, 5)
    }, {
        name: '第1万名',
        yAxis: 0,
        data: getCol(dat, 6)
    }, {
        name: '狸子LePtC粉丝数',
        yAxis: 0,
        data: getCol(datid, 13)
    },
    {
        name: 'LKs粉丝数',
        yAxis: 0,
        data: getCol(datid, 4)
    }, {
        name: '十音粉丝数',
        yAxis: 0,
        data: getCol(datid, 25)
    }
    ],


    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});



});
});





function getCol(matrix, col){
   var column = [];
   for(var i=0; i<matrix.length; i++){
    column.push([parseInt(matrix[i][0]), parseInt(matrix[i][col])]);
   }
   return column;
}











/* *
 *
 *  (c) 2010-2019 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  Dark theme for Highcharts JS
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* global document */
// Load the fonts
// import Highcharts from '../parts/Globals.js';
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);
Highcharts.theme = {
    colors: ['#9E4258','#FF9940','#D3D022', '#8FB131','#93CFCF','#5E81B5', '#f45b5b', '#CE6D91', '#eeaaee', '#5E81B5', '#8FB131'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: 'sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);