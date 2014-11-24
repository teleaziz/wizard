<?php
header("Access-Control-Allow-Origin: *");

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form fields and remove whitespace.
  $question_title = strip_tags(trim($_POST["questionTitle"]));
  $question_category =trim($_POST["category"]);
  $question_body = $_POST["questionBody"];
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $isUrgent = $_POST["isUrgent"];
  $isPrivate = $_POST["isPrivate"];
  $limit = $_POST["limit"];

  // Check that data was sent to the mailer.
  if ( empty($question_title) OR empty($question_body) OR empty($question_category) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Set a 400 (bad request) response code and exit.
    http_response_code(400);
    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
    exit;
  }

  // Set the recipient email address.
  // FIXME: Update this to your desired email address.
  $recipient = " jimmyzhong@studypool.com";

  // Set the email subject.
  $subject = "@teleaziz registration form | New question in $question_category";

  // Build the email content.
  $email_content = "Title: $question_title\n";
  $email_content .= "Email: $email\n\n";
  $email_content .= "Category: $question_category\n\n";
  $email_content .= "Question Body:\n$question_body\n\n";
  $email_content .= "Urgent: $isUrgent\n";
  $email_content .= "Private: $isPrivate\n";
  $email_content .= "Limit:$limit\n";




  // Build the email headers.
  $email_headers = "From: Registration form <$email>";

  // Send the email.
  if (mail($recipient, $subject, $email_content, $email_headers)) {
    // Set a 200 (okay) response code.
    http_response_code(200);
    header( "refresh:0; url=http://teleaziz.github.io/wizard" ); 

  } else {
    // Set a 500 (internal server error) response code.
    http_response_code(500);
    header( "refresh:0;  url=http://teleaziz.github.io/wizard" ); 

  }

} else {
  // Not a POST request, set a 403 (forbidden) response code.
  http_response_code(403);
  header( "refresh:0;  url=http://teleaziz.github.io/wizard" ); 

}

?>
