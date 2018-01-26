app.controller("itemCtrl", function($scope, $filter, $routeParams, $rootScope,$http, Data, $location) {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  $scope.uid = $rootScope.uid;
  $scope.user = $rootScope.email;
  $scope.checkout = {uid: $scope.uid, user: $scope.user, quantity: '', itemID: $routeParams.itemID, uniqueItemIDs: "" };


  $scope.checkOut = function () {
    var itemIDs = $scope.checkout.uniqueItemIDs.split(" ");
    var quantity = filterInt($scope.checkout.quantity);
    if($scope.data.hardware == 1)
    {
      var str = $scope.checkout.uniqueItemIDs;
      if(str.indexOf(",") != -1 || str.indexOf(";") != -1)
      {
        Data.toast({status:"error",message:"Please enter the unique IDs as a SPACE separated list (no commas or semicolons)."});
      }
      else if(itemIDs.length != quantity)
      {
        Data.toast({status:"error",message:"Please enter " + quantity + " total unique item IDs, one for each item you are checking out."});
      }
      else
      {
        $scope.doCheckOut();
      }
    }
    else
    {
      $scope.doCheckOut();
    }
  };

  $scope.doCheckOut = function()
  {
    var quantity = filterInt($scope.checkout.quantity);
    if (!isNaN(quantity) && quantity <= $scope.data.quantityAvailable && quantity> 0)
      {
        Data.post('checkOut', {
          itemid: $routeParams.itemID,
          user: $rootScope.email,
          uid: $rootScope.uid,
          quantityToCheckOut: quantity,
          uniqueItemIDs: $scope.checkout.uniqueItemIDs,
          date: Date(),
        }).then(function (results) {
          if(results.substractVal && results.updateStatus && results.updatedCheckedOutTable){
            Data.toast({status:"success",message:"Item checked out"});
          }
          else{
            Data.toast({status:"error",message:"There was an error when checking out the item. Please see the manager."});
          }
        });


        $scope.checkout.quantity = '';
        $scope.checkout.uniqueItemIDs = "";
        $scope.getItemDetails();
      }
    else
    {
      Data.toast({status:"error",message:"Please enter a valid quantity."});
    }
  }

  $scope.getItemDetails = function() {
    Data.get('session').then(function (results) {
    if (results.uid) {
      Data.post('getItem', {
        itemid: $routeParams.itemID
      }).then(function (results) {
        $scope.data = results;
        $scope.updatedItemDetails = {};
        $scope.updatedItemDetails.name = $scope.data.name;
        $scope.updatedItemDetails.status = $scope.data.status;
        $scope.updatedItemDetails.quantityAvailable = $scope.data.quantityAvailable;
        $scope.updatedItemDetails.reorderThreshold = $scope.data.reorderThreshold;
        $scope.updatedItemDetails.tag1 = $scope.data.tag1;
        $scope.updatedItemDetails.tag2 = $scope.data.tag2;
        $scope.updatedItemDetails.tag3 = $scope.data.tag3;
        $scope.updatedItemDetails.tag4 = $scope.data.tag4;
        $scope.updatedItemDetails.tag5 = $scope.data.tag5;
        $scope.updatedItemDetails.location = $scope.data.location;
        $scope.updatedItemDetails.desc = $scope.data.desc;
          $scope.newRes = {};
          $scope.newRes.user = "";
          $scope.newRes.quantity = "";
      });
    }
    });
  };

  $scope.getItemReservations = function() {
    Data.get('session').then(function (results) {
    if (results.uid) {
      Data.post('getItemReservations', {
        itemid: $routeParams.itemID
      }).then(function (results) {
        $scope.reservations = results;
      });
    }
    });
  };
  
  $scope.updateItem = function() {
    Data.get('session').then(function (results) {

    if (results.uid) {
      if($scope.updatedItemDetails.name == null || $scope.updatedItemDetails.name.length <= 0)
      {
        Data.toast({status:"error",message:"Item must have a name."});
      }
      else if($scope.updatedItemDetails.quantityAvailable < 0)
      {
        Data.toast({status:"error",message:"Quantity can be no less than 0."});
      }
      else
      {
        Data.post('updateItemDetails', {
            itemid: $routeParams.itemID,
            name: mysql_real_escape_string ($scope.updatedItemDetails.name),
            status: $scope.updatedItemDetails.status,
            quantityAvailable: $scope.updatedItemDetails.quantityAvailable,
            quantityTotal: $scope.updatedItemDetails.quantityTotal,
            reorderThreshold: $scope.updatedItemDetails.reorderThreshold,
            tag1: mysql_real_escape_string ($scope.updatedItemDetails.tag1),
            tag2: mysql_real_escape_string ($scope.updatedItemDetails.tag2),
            tag3: mysql_real_escape_string ($scope.updatedItemDetails.tag3),
            tag4: mysql_real_escape_string ($scope.updatedItemDetails.tag4),
            tag5: mysql_real_escape_string ($scope.updatedItemDetails.tag5),
            location: mysql_real_escape_string ($scope.updatedItemDetails.location),
            desc: mysql_real_escape_string ($scope.updatedItemDetails.desc),
        }).then(function (results) {
          Data.toast({status:"success",message:"Item details updated."});
          $scope.getItemDetails();
        });
      }

    }


    });
  };

  $scope.updateReservations = function() {
    var dates = $('#newResDates').val();
    var dateStart = dates.split(" ");
    dateStart = dateStart[0];
    var parts = dateStart.split('/')
    var startDateObj = new Date(parts[2],parts[0]-1,parts[1]); 

    var returnDateObj = new Date();
    var returnDateObj = new Date(returnDateObj.getFullYear(),returnDateObj
      .getMonth(),returnDateObj.getDate());
    returnDateObj.setDate(returnDateObj.getDate()+21);

    var resQuantity = filterInt($scope.newRes.quantity);


    var todayDateObj = new Date();
    todayDateObj = new Date(todayDateObj.getFullYear(),todayDateObj
      .getMonth(),todayDateObj.getDate());

    if(startDateObj < todayDateObj){
      Data.toast({status:"error", message:"Reservation must begin in the future."});
    }
    else if(returnDateObj < startDateObj){
       Data.toast({status:"error", message:"Reservation cannot begin more than 3 weeks from today"});
    }
    else if($scope.newRes.user == null || $scope.newRes.user.length == 0){
       Data.toast({status:"error", message:"Reservation requires associated user e-mail."});
    }
    else if(isNaN(resQuantity) || resQuantity > $scope.data.quantityAvailable || resQuantity <= 0){
       Data.toast({status:"error", message:"Please enter valid quantity for reservation."});
    }
    else{
       Data.get('session').then(function (results) {
        if (results.uid) {
          Data.post('addReservation', {
            itemid: $routeParams.itemID,
            user: $scope.newRes.user,
            quantity: resQuantity,
            dates: dates
          }).then(function (results) {
            if(results.addRes && results.updateQuantity && results.updateStatus)
            {
              Data.toast({status:"success",message:"Reservation Added."});
            }
            else if(results==='"User Does Not Exist"')
            {
              Data.toast({status:"error",message:"User with this e-mail does not exist."});
            }
            else if(results.indexOf("Duplicate entry") != -1)
            {
              Data.toast({status:"error",message:"Duplicate reservation."});
            }
            else
            {
              Data.toast({status:"error",message:"There was an error when try to create the reservation."});
            }
          });
          $scope.getItemDetails();
          $scope.getItemReservations();
        }
      });
    }
  };

  $scope.dropReservation = function(index) {
    Data.get('session').then(function (results) {
        if (results.uid) {
          Data.post('dropReservation', {
            itemid: parseInt($routeParams.itemID),
            user: $scope.reservations[index].uid,
            quantity: parseInt($scope.reservations[index].quantity),
            daterange: $scope.reservations[index].daterange
          }).then(function (results) {
            if(results["dropReservation"] && results["addQuantity"] && results["updateStatus"])
            {
              Data.toast({status:"success",message:"Reservation cancelled."});
            }
            else
            {
              Data.toast({status:"error",message:"There was an error when try to cancel the reservation."});
            }
          });
          $scope.getItemDetails();
          $scope.getItemReservations();
        }
      });
  };

  $scope.deleteItem = function() {
    //console.log("delete");

    var r = confirm("Are you sure you want to delete this item?");
    if (r == true) {

      Data.post('getItemCheckedOut', {
        itemid: $routeParams.itemID,
      }).then(function (results) {
        //console.log(results);
        if(results.length != 0){
          Data.toast({status:"error",message:"Item is checked out. Cannot delete item."});
        }
        else{
          Data.post('getItemReservations', {
            itemid: $routeParams.itemID,
          }).then(function (results2) {
            //console.log(results2);
            if(results2.length != 0){
              Data.toast({status:"error",message:"Item is reserved. Cannot delete item."});
            }
            else{


              //console.log("going to delete");
              Data.post('deleteItem', {
                itemid: $routeParams.itemID,
              }).then(function (results3) {
                //console.log(results3);

                if(results3.image)
                {
                  Data.toast({status:"success",message:"Item deleted."});
                }
                else if(!results3.image)
                {
                  Data.toast({status:"error",message:"Item not deleted."});
                }

                if(results3.sqlDelete)
                {
                  Data.toast({status:"success",message:"Item image deleted."});
                }
                else if(!results3.sqlDelete)
                {
                  Data.toast({status:"error",message:"Item image not deleted."});
                }

                if(results3.sqlDelete && results3.image)
                {
                  $location.path('inventory');
                }


              });

            }
          });
        }
      });

    }

  };

  $scope.getItemDetails();
  $scope.getItemReservations();

});