// changeblur.js for LePtC [2015.0910]
// 代码来自：http://stackoverflow.com/questions/17390576/replace-image-in-div-on-scroll-down


$(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 200) {
      if($('#logo-img img').css("opacity")>0){
        // $('#logo-imgbk img').attr('src','/img/sky15B.png');
        $('#logo-img img').fadeOut(2000);
      }
    }
    if($(this).scrollTop() <= 200) {
      if($('#logo-img img').css("opacity")<100){
        $('#logo-img img').fadeIn(2000);
      }
    }
  });
});

