$(function() {

  //jQuery time
  var currentElem, nextElem, PrevElem; //fieldsets
  var currentStep=0;
  var totalSteps=3;
  var animating; //flag to prevent quick multi-click glitches
  var $steps = $(".stepwizard a");
  function animateProgressBar(curr, next){
    $(".stepwizard").css("display","table");
    currentElem = $("#progress-"+curr);
    nextElem = $("#progress-"+next);
    $steps.removeClass("btn-success").show();
    $('.thin-progress-bar').show().width(((next)/totalSteps)*100 + "%");
    nextElem.addClass("btn-success");
  }


  function moveStep(step){
    return function() {
      var nextStep;
      currentElem= $(".form-card .form-group:visible");
      currentStep= parseInt(currentElem.attr("id").split("-")[1]);
      nextStep=(currentStep+step)%totalSteps
      nextElem = $("#step-"+(nextStep));
      currentElem.fadeOut().hide();
      nextElem.fadeIn().show();
      animateProgressBar(currentStep, nextStep);
    }
  };
  
  $(".next").click(moveStep(1));
  $(".prev").click(moveStep(-1));
  $(".stepwizard-step a").click(function(){
    var step= $(this).attr("id").split("-")[1];
    currentElem= $(".form-card .form-group:visible");
    currentStep= parseInt(currentElem.attr("id").split("-")[1]);
    moveStep(parseInt(step)-currentStep)();
  });
  $(".submit").click(function(){
    return false;
  })
})