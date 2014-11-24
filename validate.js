$(function() {
  var $buttons = $(".next , .submit").attr("disabled",true);
  var $qtitle = $("#question-title");
  var $qbody = $("#question-body");
  var maxTitle =20, maxBody = 20 ;
  var temp = true;
  toastr.options.closeButton = true;

  var formData = {};

  var editor = new MediumEditor(".editable",{
    buttonLabels: "fontawesome",
    placeholder: "What's your question*",
    targetBlank: true
  });



  $buttons.on("click", validateAll);
  $qtitle.on("focusout", validateAll);
  $qbody.on("focusout keyup",validateAll);
  $("#categories").on("focusout", validateAll);

  function validateTitle(hide){
    if($qtitle.val().length >= maxTitle) {
      return true;
    }
    else {
      if(!hide) {
        toastr.warning('Question title must be more than 20 characters long.', 'Questino Title');
      }
      return false;
    }
  }

  function validateCategory(hide){
    if($("#categories option:selected").val().length > 0) {
      return true;
    }
    else {
      if(!hide) {
        toastr.warning("Please choose a category" , "Category not chosen") 
      }
      return false;
    }
  }


  function validateBody(hide){
    if($qbody.text().length >= maxBody) {
      return true;
    }
    else {
      if(!hide) {
        toastr.warning('Question body must be more than 20 characters long.', 'Questino Body');
      }
      return false;
    }
  }
  function validateEmail() {
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    var email =  $("#email").val();
    return regex.test(email);
    debugger;

  };
  function validateAll(event){
    var hide = event.type==="keyup"
    var isValid= validateTitle(hide) && validateCategory(hide) && validateBody(hide);
    $buttons.attr("disabled", !isValid );
  }

  function cleanForm(){
    $qtitle.val("");
    $qbody.html("");
    $( "#categories :selected" ).removeAttr("selected")
    $("#email").val("");
  }




  $("form").on("submit" , function(e){
    e.preventDefault();
    formData.questionTitle= $qtitle.val();
    formData.questionBody= $qbody.html();
    formData.category = $( "#categories :selected" ).text();
    formData.email = $("#email").val();
    formData.isUrgent = $("#urgency").is(":checked");
    formData.isPrivate = $("#privacy").is(":checked");
    formData.limit = $("#time").val() + " "+ $("#unit :selected").text();
    formData.recipient = "teleaziz@gmail.com"
    if(!validateEmail()) {
      toastr.warning("Please enter a valid email" , "Email not valid");
      return false;
    }
    $.ajax({
      type: 'POST',
      url: "http://adinspot.com/assets/mailer-form.php",
      data: formData
    })
    .success(function(response) {
      toastr.success("Please check your email , it might be in the spam folder", "Request Sent");
      $(".thin-progress-bar").width("100%");
      // TOASTER AND CLEAR FORM
      cleanForm();
    })
    .fail(function(data) {
      toastr.error(data.response.text, "Server Error");
      // SHOW IN TOASTR data.response.text
      cleanForm()
    });
  })

})