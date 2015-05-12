// filter.js for LePtC [2015.0310]
// 代码来自 http://blog.csdn.net/dats0407/article/details/7679974

function onSearch(obj,filterobj){//js函数开始
    setTimeout(function(){//因为是即时查询，需要用setTimeout进行延迟，让值写入到input内，再读取
        var storeId = document.getElementById(filterobj);//获取table的id标识
        var rowsLength = storeId.rows.length;//表格总共有多少行
        var key = obj.value;//获取输入框的值

        // var searchCol = 0;//要搜索的哪一列，这里是第一列，从0开始数起

        for(var i=1;i<rowsLength;i++){//按表的行数进行循环，本例第一行是标题，所以i=1，从第二行开始筛选（从0数起）
            var flag = false;
            for(var j=1;j<storeId.rows[i].cells.length;j++){
                var searchText = storeId.rows[i].cells[j].innerHTML;//取得table行，列的值
                flag = flag || searchText.match(key);
            }
            if(flag){//用match函数进行筛选，如果input的值，即变量 key的值为空，返回的是ture，
                storeId.rows[i].style.display='';//显示行操作，
            }else{
                storeId.rows[i].style.display='none';//隐藏行操作
            }
        }
    },100);//100为延时时间
}
