<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    $response["type"] = $session['type'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select uid,name,password,email,type,created from users where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['type'] = $user['type'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        $_SESSION['type'] = $user['type'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials.';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});

$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password', 'type'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $name = $r->customer->name;
    $email = $r->customer->email;
    $password = $r->customer->password;
    $type = $r->customer->type;
    $isUserExists = $db->getOneRecord("select 1 from users where email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $table_name = "users";
        $column_names = array('name', 'email', 'password', 'type');
        $result = $db->insertIntoTable($r->customer, $column_names, $table_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully.";
            $response["uid"] = $result;
            /*if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['type'] = $type;*/
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create user. Please try again.";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "A user with the provided email already exists!";
        echoResponse(201, $response);
    }
});

$app->post('/updatePassword', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $uid = $r->uid;
    $oldPassword = $r->oldPassword;
    $newPassword = $r->newPassword;

    $user = $db->getOneRecord("SELECT uid,name,password,email,type,created FROM users WHERE uid='$uid'");

    if(passwordHash::check_password($user['password'],$oldPassword))
    {
        $password = passwordHash::hash($newPassword);

        $sql = "UPDATE `users` SET `password` = '$password' WHERE `uid` = $uid";
        $result["updatePassword"] = $db->update($sql);
        
        $user = $db->getOneRecord("SELECT uid,name,password,email,type,created FROM users WHERE uid='$uid'");

        $result["newPassword2"] = passwordHash::check_password($user['password'],$newPassword);

        $result["oldPass"] = $oldPassword;
        $result["newPass"] = $newPassword;
    }
    else
    {
        $result["updatePassword"] = "Incorrect Old Password";
    }

    echoResponse(200, $result);


});


$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

/* Get list of all users */
$app->post('/getAllUsers', function() use ($app) {
    $db = new DbHandler();
    $sql = "SELECT uid, name, email, type FROM users";
    $result = $db->getMultRecords($sql);
    echoResponse(200, $result);
});

/* Remove a user */
$app->post('/removeUser', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $uid = $r->uid;

    $sql = "DELETE FROM `users` WHERE uid = $uid";
    $result = $db->update($sql);
    echoResponse(200, $result);
});

/* Check if a user exists based on email */
$app->post('/checkEmail', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $email = $r->email;

    $sql = "SELECT email FROM users where email = '$email'";
    $result = $db->getOneRecord($sql);
    $response = $result;
    echoResponse(200, $response);
});


/* Check if a user exists based on email */
$app->post('/sendForgottenPass', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $email = $r->email;

    $newPassword = randomString();
    $password = passwordHash::hash($newPassword);
    $sql = "UPDATE `users` SET `password` = '$password' WHERE `email` = '$email'";
    $result["updatePassword"] = $db->update($sql);

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <cosmic-noreply@eccla.org>' . "\r\n";
    $subject = "COSMIC-System Password Reset";
    $message = "Your password for the COSMIC-System has been reset. Please use the following new password to login: <br>" . $newPassword . "<br><br> It is recommended you change your password immediately.";
    $to = $email;

    $result["emailForgottenPass"] =  mail($to,$subject,$message,$headers);
    echoResponse(200, $result);
});

?>