<?php

/* Get the inventory items */
$app->post('/getInventory', function() use ($app) {
    $db = new DbHandler();
    // $sql = "SELECT `itemid` , `name` , `tag1` , `tag2` , `tag3` , `tag4` , `tag5` , `status`, `quantityAvailable` FROM `items`";
    $sql = "SELECT * FROM items JOIN locations ON locations.locationid=items.locationid";
    $result = $db->getMultRecords($sql);
    $response = $result;
    echoResponse(200, $response);
});

/* Get the list of locations */
$app->post('/getLocationsList', function() use ($app) {
    $db = new DbHandler();
    $sql = "SELECT * FROM locations";
    $result = $db->getMultRecords($sql);
    $response = $result;
    echoResponse(200, $response);
});


// get the reservation and chedckouts for an item
$app->post('/getCalendarInfo', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $sql = "SELECT quantity, return_date FROM items_checkedout WHERE itemid = $itemid  UNION SELECT quantity, daterange  FROM items_reserved WHERE itemid =  ".$itemid;
    $result["reservations"] = $db->getMultRecords($sql);
    $result["quantityTotal"] = $db->getOneRecord("SELECT quantityTotal FROM items WHERE itemid = $itemid")["quantityTotal"];
    $response = $result;
    echoResponse(200, $response);
});




/* Get the checkout list */
$app->post('/getCheckoutList', function() use ($app) {
    $db = new DbHandler();
    // $sql = "SELECT `itemid` , `name` , `tag1` , `tag2` , `tag3` , `tag4` , `tag5` , `status`, `quantityAvailable` FROM `items`";
    $sql = "SELECT * FROM items_checkedout";
    $result = $db->getMultRecords($sql);
    $response = $result;
    echoResponse(200, $response);
});

/* Get the reserved list */
$app->post('/getReservedList', function() use ($app) {
    $db = new DbHandler();
    // $sql = "SELECT `itemid` , `name` , `tag1` , `tag2` , `tag3` , `tag4` , `tag5` , `status`, `quantityAvailable` FROM `items`";
    $sql = "SELECT * FROM items_reserved";
    $result = $db->getMultRecords($sql);
    $response = $result;
    echoResponse(200, $response);
});

  /* Get the list of locations */
$app->post('/getLocationsList', function() use ($app) {
   $db = new DbHandler();
   $sql = "SELECT location FROM locations";
   $result = $db->getMultRecords($sql);
   $response = $result;
   echoResponse(200, $response);
});

$app->post('/getHardwareID', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $db = new DbHandler();
    $sql1 ="SELECT `HardwareID` FROM `HardwareTable` WHERE available=1 AND itemid= ".$itemid;
    // $result = $sql1;
    $result = $db->getMultRecords($sql1);
    $response = $result;
    echoResponse(200, $response);



});

/* Get a single item's details */
$app->post('/getItem', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $db = new DbHandler();
    $sql = "SELECT * FROM items JOIN locations ON locations.locationid=items.locationid where itemid = " . $itemid;
    $result = $db->getOneRecord($sql);
    $response = $result;
    echoResponse(200, $response);
});

$app->post('/getItemHardwareFlag', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $db = new DbHandler();
    $sql = "SELECT `hardware` FROM items where itemid = " . $itemid;
    $result = $db->getOneRecord($sql);
    $response = $result;
    echoResponse(200, $response);
});

/* Check out an item */
$app->post('/checkOut', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $uid = $r->uid;
    $itemid = $r->itemid;
    $date = $r->date;
    $returnDate = $r->returnDate;
    $checkoutUserEmail = $r->checkoutUserEmail;
    $checkoutUserName = $r->checkoutUserName;
    $quantityToCheckOut = $r->quantityToCheckOut;
    $hardwareNotes = $r->uniqueItemIDs;
    $db = new DbHandler();


    $sql4 = "SELECT name, email FROM users WHERE `uid`=".$uid;
    $admin = $db->getOneRecord("SELECT name, email FROM users WHERE `uid`=$uid");

    $adminEmail = $admin["email"];
    $adminName = $admin["name"];



    $sql3 = "INSERT INTO `items_checkedout`(`itemid`, `uid`, `quantity`, `return_date`, `checkout_user`, `checkout_useremail`, `checkout_adminusername`, `checkout_adminemail`) VALUES ($itemid, $uid,$quantityToCheckOut,'$returnDate','$checkoutUserName','$checkoutUserEmail', '$adminName', '$adminEmail')";
    $results["updatedCheckedOutTable"] = $db->update($sql3);

    if($results["updatedCheckedOutTable"] == true)
    {
      // Update the quantity available for the item
      $sql = "UPDATE `items` SET `quantityAvailable` = `quantityAvailable` - ". $quantityToCheckOut  . " WHERE `itemid` =" . $itemid;
      $results["substractVal"] = $db->update($sql);

      // Update the item status to unavailable if the quantity available is now 0
      $sql2 = "UPDATE `items` SET `status` = 'Unavailable' WHERE `quantityAvailable` = 0 AND `itemid` = " . $itemid;
      $results["updateStatus"] = $db->update($sql2);

      // Update the items checked out table
      $alreadyHaveThisItem = $db->getOneRecord("SELECT * FROM `items_checkedout` WHERE `uid`=$uid AND `itemid`=$itemid");
      store_data($checkoutUserName, $checkoutUserEmail, $uid, $itemid, $quantityToCheckOut, "Check Out", $hardwareNotes, $returnDate);
      echoResponse(200, $results);
    }
    else {
      echoResponse(400, $results);
    }


    // if ($alreadyHaveThisItem == NULL) {
    //     // If the user did not already have this item, insert a new row to the items check out table
    //     $sql3 = "INSERT INTO `items_checkedout`(`itemid`, `uid`, `quantity`) VALUES ($itemid, $uid, $quantityToCheckOut)";
    //     $results["updatedCheckedOutTable"] = $db->update($sql3);
    // }
    // else{
    //     // If the user did already have this item, update the quantity
    //     $sql3 = "UPDATE `items_checkedout` SET `quantity` = `quantity` + $quantityToCheckOut WHERE `uid`=$uid AND `itemid`=$itemid";
    //     $results["updatedCheckedOutTable"] = $db->update($sql3);
    // }





});

/* Get the item's details for items checked out by a particular user */
$app->post('/getCheckedOut', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $uid = $r->uid;
    $db = new DbHandler();
    $sql = "SELECT A.itemid, B.name, A.checkout_user, A.checkout_useremail, A.quantity FROM items_checkedout AS A, items AS B WHERE A.itemid = B.itemid AND uid = $uid";
    $result = $db->getMultRecords($sql);
    echoResponse(200, $result);
});




/* Update an item's details */
$app->post('/updateItemDetails', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $name = $r->name;
    $status = $r->status;
    $quantityAvailable = $r->quantityAvailable;
    $reorderThreshold = $r->reorderThreshold;
    $tag1 = $r->tag1;
    $tag2 = $r->tag2;
    $tag3 = $r->tag3;
    $tag4 = $r->tag4;
    $tag5 = $r->tag5;
    $location = $r->location;
    $desc = $r->desc;

    $tag1 = !empty($tag1) ? "'$tag1'" : "NULL";
    $tag2 = !empty($tag2) ? "'$tag2'" : "NULL";
    $tag3 = !empty($tag3) ? "'$tag3'" : "NULL";
    $tag4 = !empty($tag4) ? "'$tag4'" : "NULL";
    $tag5 = !empty($tag5) ? "'$tag5'" : "NULL";

    $db = new DbHandler();

    $sql = "SELECT `quantityAvailable` from `items` where itemid = $itemid";
    $oldQuantityAvailable = $db->getOneRecord($sql);
    $oldQuantityAvailable = $oldQuantityAvailable["quantityAvailable"];

    $sql = "SELECT `quantityTotal` from `items` where itemid = $itemid";
    $oldQuantityTotal = $db->getOneRecord($sql);
    $oldQuantityTotal = $oldQuantityTotal["quantityTotal"];

    $quantityTotal = $oldQuantityTotal - $oldQuantityAvailable + $quantityAvailable;

    $sql = "UPDATE `items` SET `name`='$name',`desc`='$desc',`tag1`=$tag1,`tag2`=$tag2,`tag3`=$tag3,`tag4`=$tag4,`tag5`=$tag5,`status`='$status',`quantityAvailable`=$quantityAvailable,`quantityTotal`=$quantityTotal,`reorderThreshold`=$reorderThreshold,`location`='$location' WHERE `itemid` = $itemid";
    $results = $db->update($sql);

    // Update the item status to available if the quantity available is now > 0
    $sql = "UPDATE `items` SET `status` = 'Available' WHERE `quantityAvailable` > 0 AND `itemid` = $itemid";
    $db->update($sql);

    // Update the item status to unavailable if the quantity available is now == 0
    $sql = "UPDATE `items` SET `status` = 'Unavailable' WHERE `quantityAvailable` = 0 AND `itemid` = $itemid";
    $db->update($sql);

    echoResponse(200, $results);
});

/* Add a new reservation */
$app->post('/addReservation', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $user = $r->user;
    $resUserEmail = $r->resUserEmail;
    $resUserName = $r->resUserName;
    $quantity = $r->quantity;
    $dates = $r->dates;
    // $res = $r->res;
    $db = new DbHandler();

    // Get the user id for the user from the email
    $sql = "SELECT `uid` FROM `users` WHERE `email` = '$user'";
    $uid = $db->getOneRecord($sql);
    $uid = $uid["uid"];
    if($uid == NULL)
    {
        echoResponse(200, "User Does Not Exist");
    }
    else
    {
        // Add the reservation into the items reserved table
        $sql = "INSERT INTO `items_reserved`(`itemid`, `uid`, `username`, `useremail`, `quantity`, `daterange`) VALUES ($itemid, $uid, '$resUserName', '$resUserEmail', $quantity, '$dates')";
        $results["addRes"] = $db->update($sql);

        /*// Update the quantity available for the item
        $sql2 = "UPDATE `items` SET `quantityAvailable` = `quantityAvailable` - ". $quantity  . " WHERE `itemid` =" . $itemid;
        $results["updateQuantity"] = $db->update($sql2);

        // Update the item status to unavailable if the quantity available is now 0
        $sql3 = "UPDATE `items` SET `status` = 'Unavailable' WHERE `quantityAvailable` = 0 AND `itemid` = " . $itemid;
        $results["updateStatus"] = $db->update($sql3);*/

        store_data($resUserName, $resUserEmail, $uid, $itemid, $quantity, "Reserved", "", $dates);
        echoResponse(200, $results);
    }
});

/* Get a single item's reservations */
$app->post('/getItemReservations', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $itemid = $r->itemid;
    $db = new DbHandler();
    $sql = "SELECT items_reserved.daterange, users.email, items_reserved.username, items_reserved.useremail,items_reserved.quantity\n"
    . "FROM items_reserved\n"
    . "INNER JOIN users ON items_reserved.uid=users.uid\n"
    . "WHERE items_reserved.itemid = $itemid ";
    $result = $db->getMultRecords($sql);
    echoResponse(200, $result);
});

/* Get the item's details for items reserved for a particular user */
$app->post('/getReserved', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $uid = $r->uid;
    $db = new DbHandler();
    $sql = "SELECT A.itemid, B.name, A.username,A.useremail, A.quantity, A.daterange FROM items_reserved AS A, items AS B WHERE A.itemid = B.itemid AND uid = $uid";
    $result = $db->getMultRecords($sql);
    echoResponse(200, $result);
});

/* Drop a particular reservation */
$app->post('/dropReservation', function() use ($app) {
    $r = json_decode($app->request->getBody());
    // print_r($r);
    $uid = $r->user;
    $itemid = $r->itemid;
    //TODO: fill in below
    $resUserName = $r->borrowerName;
    $resUserEmail = $r->borrowerEmail;
    $daterange = $r->daterange;
    $quantity = $r->quantity;
    $db = new DbHandler();

    // Drop the entry from the items reserved table
    $sql = "DELETE FROM `items_reserved` WHERE `uid` = $uid AND `itemid` = $itemid AND `daterange` = '$daterange' AND `quantity` = $quantity AND `username` = '$resUserName' AND `useremail` ='$resUserEmail' ";
    $results["dropReservation"] = $db->update($sql);
    $results["drop"] = $sql;


    // Update the quantity available for the item
    $sql2 = "UPDATE `items` SET `quantityAvailable` = `quantityAvailable` + $quantity WHERE `itemid` = $itemid";
    $results["addQuantity"] = $db->update($sql2);

    // Update the item status to available if the quantity available is now > 0
    $sql3 = "UPDATE `items` SET `status` = 'Available' WHERE `quantityAvailable` > 0 AND `itemid` = $itemid";
    $results["updateStatus"] = $db->update($sql3);

    store_data($resUserName, $resUserEmail, $uid, $itemid, $quantity, "Reservation Cancelled", "", $daterange);
    echoResponse(200, $results);
});

/* Transfer an item from reserved to checked out */
$app->post('/checkOutReservation', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $uid = $r->uid;
    $itemid = $r->itemid;
    //TODO: fill in below
    $resUserName = $r->ckoutUserName;
    $resUserEmail = $r->ckoutUserEmail;
    $daterange = $r->daterange;
    $quantity = $r->quantity;
    $uniqueItemIDs = $r->uniqueItemIDs;
    $db = new DbHandler();


    $user = $db->getOneRecord("SELECT `email`, `name` FROM `users` WHERE `uid`=$uid");
    $userName = $user["name"];
    $userEmail = $user["email"];

    $pieces = explode(" - ", $daterange);

    $return_date = $pieces[1];

    // check if the user has already checked out an item
    $alreadyHaveThisItem =$db->getOneRecord("SELECT * FROM `items_checkedout` WHERE `uid` = $uid AND `checkout_user` = '$resUserName' AND `checkout_useremail` = '$resUserEmail'");

    if($alreadyHaveThisItem == NULL){

        // Remove from the items reserved table
        $sql = "DELETE FROM `items_reserved` WHERE `uid` = $uid AND `itemid` = $itemid AND `daterange` = '$daterange' AND `quantity` = $quantity";
        $results["dropReservation"] = $db->update($sql);

        // Add to the items checked out table
         $sql = "INSERT INTO `items_checkedout`(`itemid`, `uid`, `quantity`, `return_date`, `checkout_user`, `checkout_useremail`, `checkout_adminusername`, `checkout_adminemail`) VALUES ($itemid, $uid, $quantity, '$return_date', '$resUserName', '$resUserEmail', '$userName', '$userEmail' )";
        $results["addCheckedOut"] = $db->update($sql);

        $sql2 = "UPDATE `items` SET `quantityAvailable` = `quantityAvailable` - ". $quantity  . " WHERE `itemid` =" . $itemid;
        $results["substractVal"] = $db->update($sql2);

        // Update the item status to unavailable if the quantity available is now 0
        $sql3 = "UPDATE `items` SET `status` = 'Unavailable' WHERE `quantityAvailable` = 0 AND `itemid` = " . $itemid;
        $results["updateStatus"] = $db->update($sql3);

   store_data($resUserName, $resUserEmail, $uid, $itemid, $quantity, "Reservation Check Out", $uniqueItemIDs, $return_date);



    }
    else{

        $results["duplicate"] = true;
    }

    echoResponse(200, $results);

});

/* Check in an item */
$app->post('/checkIn', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $uid = $r->uid;
    $itemid = $r->itemid;
    $itemname = $r->itemname;
    $useremail = $r->useremail;
    $checkInConsumed = $r->checkInConsumed;
    $checkInQuantity = $r->checkInQuantity;
    $checkoutUserName = $r->borrowerName;
    $checkoutUserEmail = $r->borrowerEmail;

    $hardwareNotes = $r->hardwareNotes;

    $note = $r->note;
    $db = new DbHandler();


    // Get the manager's email
    $sql = "SELECT `email` FROM `superadmin` WHERE `title` = 'Inventory Manager'";
    $emailManager = $db->getOneRecord($sql);
    $emailManager = $emailManager["email"];


    // Update the value of the quantity
    $sql = "UPDATE `items_checkedout` SET `quantity`=(`quantity`- $checkInConsumed - $checkInQuantity) WHERE `itemid`=$itemid AND `uid` = $uid AND `checkout_useremail` = '$checkoutUserEmail' AND `checkout_user`=  '$checkoutUserName'";
    $results["updateCheckOut"] = $db->update($sql);

    // Remove from items checked out if quantity checked out is now 0
    $sql = "DELETE FROM `items_checkedout` WHERE `itemid`=$itemid AND `uid` = $uid AND `checkout_useremail` = '$checkoutUserEmail' AND `checkout_user`=  '$checkoutUserName' AND `quantity`=0";
    $results["dropCheckOut"] = $db->update($sql);

    // Update quantity available & quantity total
    $sql = "UPDATE `items` SET `quantityAvailable`=(`quantityAvailable`+$checkInQuantity),`quantityTotal`=`quantityTotal`-($checkInConsumed) WHERE `itemid`=$itemid";
    $results["updateQuantities"] = $db->update($sql);

     // Update availability
    $sql = "UPDATE `items` SET `status` = 'Available' WHERE `quantityAvailable` > 0 AND `itemid` = $itemid";
    $results["updateStatus"] = $db->update($sql);


    store_data($checkoutUserName, $checkoutUserEmail, $uid, $itemid, $checkInQuantity, "Check In", $hardwareNotes, "");
     //If quantity total is less than threshold, send a re-order email to the director
    $sql = "SELECT * FROM `items` WHERE `quantityTotal`<`reorderThreshold` AND `itemid`=$itemid";
    $reorder = $db->getOneRecord($sql);

    if($reorder == NULL) // Do not need to reorder
    {
        $results["emailReorder"] = true;
    }
    else // Need to reorder
    {
        $newQuantityTotal = $reorder["quantityTotal"];

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <cosmic-noreply@eccla.org>' . "\r\n";
        $subject = "COSMIC-System Reorder Notification";
        $message = "<b> $itemname </b> total quantity has dropped below the reorder threshold. <br><br> There are now only $newQuantityTotal in the inventory. It is recommended you reorder this item.";

        // Get the admin's emails to send reorder email
        $sql = "SELECT `email` FROM `users` WHERE `type` = 'Admin'";
        $emails = $db->getMultRecords($sql);
        $emails = (array) $emails;
        $to = "";
        foreach($emails as $curr)
        {
            $to = $to . " ," . $curr["email"];
        }
        $results["emailReorder"] =  mail($to,$subject,$message,$headers);
    }

    // Email the manager the notes
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <cosmic-noreply@eccla.org>' . "\r\n";
    $subject = "COSMIC-System Check In Notification";
    $message = "<b> $itemname </b> has been checked in by $useremail <br><br> <b> $checkInConsumed </b> has/have been consumed or broken. <br><br> Notes: $note";
    $results["emailManager"] = mail($emailManager,$subject,$message,$headers);


    if($checkInConsumed > 0)
    {
        store_data($checkoutUserName, $checkoutUserEmail, $uid, $itemid, $checkInConsumed, "Consumed or Broken", $uniqueItemIDs, "");
    }

    echoResponse(200, $results);

});

/* Add a new item */
$app->post('/addItem', function() use ($app) {
    $r = json_decode($app->request->getBody());

    $db = new DbHandler();

    $name = $r->name;
    $isHardware = $r->isHardware;
    $quantityAvailable = $r->quantityAvailable;
    $reorderThreshold = $r->reorderThreshold;
    $tag1 = $r->tag1;
    $tag2 = $r->tag2;
    $tag3 = $r->tag3;
    $tag4 = $r->tag4;
    $tag5 = $r->tag5;
    $location = $r->location;
    $desc = $r->desc;

    $status = "Unavailable";
    if($quantityAvailable > 0)
    {
        $status = "Available";
    }
    $tag1 = !empty($tag1) ? "'$tag1'" : "NULL";
    $tag2 = !empty($tag2) ? "'$tag2'" : "NULL";
    $tag3 = !empty($tag3) ? "'$tag3'" : "NULL";
    $tag4 = !empty($tag4) ? "'$tag4'" : "NULL";
    $tag5 = !empty($tag5) ? "'$tag5'" : "NULL";

    $location = !empty($location) ? "'$location'" : "NULL";

    $quantityTotal = $quantityAvailable;
    // Insert new item
    if(($location)!= "NULL"){
        $sql2 = "INSERT INTO `locations` (`location`) VALUES ($location)";
        $db->insertItem($sql2);
    }

    $sql3 = "SELECT `locationid` FROM `locations` WHERE location=$location";
    $result3 = $db->getOneRecord($sql3);

    if($result3["locationid"] != null){
        $sql = "INSERT INTO `items`(`name`,`hardware`, `desc`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `status`, `quantityAvailable`, `quantityTotal`, `locationid`, `reorderThreshold`) VALUES ('$name','$isHardware','$desc',$tag1,$tag2,$tag3,$tag4,$tag5,'$status',$quantityAvailable,$quantityAvailable,".$result3["locationid"].",$reorderThreshold)";
        $results["addedItem"] = $db->insertItem($sql);
    }
    else{
         $sql = "INSERT INTO `items`(`name`,`hardware`, `desc`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `status`, `quantityAvailable`, `quantityTotal`, `locationid`, `reorderThreshold`) VALUES ('$name','$isHardware','$desc',$tag1,$tag2,$tag3,$tag4,$tag5,'$status',$quantityAvailable,$quantityAvailable, NULL ,$reorderThreshold)";
        $results["addedItem"] = $db->insertItem($sql);
    }

    echoResponse(200, $results);
});


/* Get an items checked out */
$app->post('/getItemCheckedOut', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $itemid = $r->itemid;

    $sql = "SELECT `itemid` FROM `items_checkedout` WHERE itemid = $itemid";
    $result = $result = $db->getMultRecords($sql);
    echoResponse(200, $result);
});

/* Delete an item */
$app->post('/deleteItem', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $itemid = $r->itemid;

    $result["image"] = unlink('../../images/items/' . $itemid . '.jpg');

    $sql = "DELETE FROM `items` WHERE itemid = $itemid";

    $result["sqlDelete"] = $db->update($sql);
    echoResponse(200, $result);
});

?>
