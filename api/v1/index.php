<?php

require_once 'dbHandler.php';
require_once 'passwordHash.php';
require '../libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// User id from db - Global Variable
$user_id = NULL;

require_once 'authentication.php';
require_once 'inventory.php';

/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        $app->stop();
    }
}


function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

function store_data($borrowername, $borroweremail, $uid, $itemid, $quantity, $action, $hardwarenotes, $CRInput) {

    //get the current date and time
      date_default_timezone_set('America/Los_Angeles');
      $date = date("m/d/Y");
      $time = date("h:ia");

      $db = new DbHandler();

      //get user name and email from database
      $sql = "SELECT `name`, `email` from `users` where uid = $uid";
      $user = $db->getOneRecord($sql);
      $name = $user["name"];
      // $email = $user["email"];
      $email = $borroweremail;

      //get item name from database
      $sql2 = "SELECT `name` from `items` where itemid = $itemid";
      $item = $db->getOneRecord($sql2);
      $item = $item["name"];
      $expectedreturn = "N/A";
      $daterange = "N/A";

      if ($action == "Check Out" || $action == "Reservation Check Out") {
        $expectedreturn = $CRInput;
      } else if ($action == "Reserved") {
        $daterange = $CRInput;
      }

      $values = array($name, $borrowername, $email, $item, $quantity, $action, $hardwarenotes, $date, $time, $expectedreturn, $daterange);

      //write to the log txt file
      foreach ($values as $x) {
        $result = file_put_contents("../log/log_data.txt", $x . "," , FILE_APPEND);
      }

      file_put_contents("../log/log_data.txt", "\r\n", FILE_APPEND);

}

function randomString($length = 6) {
  $str = "";
  $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
  $max = count($characters) - 1;
  for ($i = 0; $i < $length; $i++) {
    $rand = mt_rand(0, $max);
    $str .= $characters[$rand];
  }
  return $str;
}

$app->run();
?>
