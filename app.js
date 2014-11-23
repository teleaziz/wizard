$(function() {

  //jQuery time
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches
  $(".next").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //show the next fieldset
    next_fs.show().addClass('animated bounceInRight'); 
    //hide the current fieldset with style
    current_fs.addClass('animated bounceOutLeft').hide();;
    current_fs.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      current_fs.removeClass('animated bounceOutLeft');
      next_fs.removeClass('animated bounceInRight'); 
      animating = false;
    });
  });

  $(".prev").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show().addClass('animated bounceInLeft'); 
    current_fs.addClass('animated bounceOutRight').hide();;
    current_fs.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      current_fs.removeClass('animated bounceOutRight');
      previous_fs.removeClass('animated bounceInLeft');
      animating = false;
    });  });

  $(".submit").click(function(){
    return false;
  })
})