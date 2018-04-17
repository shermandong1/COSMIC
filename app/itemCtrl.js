app.controller("itemCtrl", function($scope, $filter, $routeParams, $rootScope,$http, Data, $location) {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $scope.uid = $rootScope.uid;
  $scope.user = $rootScope.email;
  $scope.checkout = {uid: $scope.uid, user: $scope.user, quantity: '', itemID: $routeParams.itemID, uniqueItemIDs: "" };
  $scope.hardwareID = [];
  $scope.queryHardwareID = [];
  $scope.quantityTotal;



  $scope.checkOut = function () {
    var itemIDs = $scope.checkout.uniqueItemIDs.split(" ");
    var quantity = filterInt($scope.checkout.quantity);


     var tickedItems = [];
     angular.forEach( $scope.hardwareID, function( value, key ) {
      if(value.ticked){
        tickedItems.push(key.label);

      }
    });

    if($scope.data.hardware == 1)
    {
      var str = $scope.checkout.uniqueItemIDs;
      if(str.indexOf(",") != -1 || str.indexOf(";") != -1)
      {
        Data.toast({status:"error",message:"Please enter the unique IDs as a SPACE separated list (no commas or semicolons)."});
      }
      else if(tickedItems.length != quantity)
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
    var returnDate = $('#checkoutReturnDate').val();
    var checkoutUserEmail = $scope.checkout.checkoutUserEmail;
    var checkoutUserName = $scope.checkout.checkoutUserName;
    var quantity = filterInt($scope.checkout.quantity);

    console.log(returnDate);

    var tickedItems = [];
     angular.forEach( $scope.hardwareID, function( value, key ) {
      if(value.ticked){
        tickedItems.push(value.label);
      }
    });


    if(!validateEmail(checkoutUserEmail)){
      Data.toast({status:"error",message:"Please enter a valid email."})
    }
    else{
      if (!isNaN(quantity) && $scope.checkAvailability(moment(), moment(returnDate,"MM/DD/YYYY"), quantity) && quantity> 0)
        {
          Data.post('checkOut', {
            itemid: $routeParams.itemID,
            user: $rootScope.email,
            uid: $rootScope.uid,
            quantityToCheckOut: quantity,
            uniqueItemIDs: tickedItems,
            returnDate: returnDate,
            checkoutUserEmail: checkoutUserEmail,
            checkoutUserName: checkoutUserName,
            date: Date(),
          }).then(function (results) {
            console.log(results);
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
          $scope.getCalendarInfo();
        }
      else
      {
        Data.toast({status:"error",message:"Please enter a valid quantity."});
      }
    }
  }

 $scope.getItemDetails = function() {
    Data.get('session').then(function (results) {
    if (results.uid) {
  	  Data.post('getHardwareID', {
        itemid: $routeParams.itemID
      }).then(function (results) {
        for (key in results){
        	$scope.hardwareID.push({label: results[key]['HardwareID']});
        }

      });

      Data.post('getItem', {
        itemid: $routeParams.itemID
      }).then(function (results) {
        // console.log(results);
        $scope.data = results;
        $scope.updatedItemDetails = {};
        $scope.updatedItemDetails.name = $scope.data.name;
        $scope.updatedItemDetails.status = $scope.data.status;
        $scope.updatedItemDetails.quantityAvailable = $scope.data.quantityAvailable;
        $scope.updatedItemDetails.quantityTotal = $scope.data.quantityTotal;
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
          $scope.quantityTotal = $scope.data.quantityTotal;
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
      else if($scope.updatedItemDetails.hardware  && ($scope.updatedItemDetails.quantityAvailable != ( $scope.updatedItemDetails.hardware.split(" ").length + parseInt($scope.data.quantityAvailable ))))
        {
          Data.toast({status:"error",message:"Make sure quantity available takes new hardware IDs into account"});
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
            HardwareID: mysql_real_escape_string( $scope.updatedItemDetails.hardware),
            desc: mysql_real_escape_string ($scope.updatedItemDetails.desc),
        }).then(function (results) {
          console.log(results);
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


    var email =  $scope.newRes.resUserEmail;


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
    else if(isNaN(resQuantity) || !$scope.checkAvailability(moment(startDateObj), moment(returnDateObj), resQuantity) || resQuantity <= 0){
       Data.toast({status:"error", message:"Please enter valid quantity for reservation."});
    }else if (!validateEmail(email)){
      Data.toast({status:"error", message: "Please enter a valid email"});
    }
    else{
       Data.get('session').then(function (results) {
        if (results.uid) {
          Data.post('addReservation', {
            itemid: $routeParams.itemID,
            user: $scope.newRes.user,
            resUserName: $scope.newRes.resUserName,
            resUserEmail: $scope.newRes.resUserEmail,
            quantity: resQuantity,
            dates: dates
          }).then(function (results) {
            if(results.addRes)
            {
              Data.toast({status:"success",message:"Reservation Added."});
            }
            else if(results==='"User Does Not Exist"')
            {
              Data.toast({status:"error",message:"User with this e-mail does not exist."});
            }
          /*  else if(results.indexOf("Duplicate entry") != -1)
            {
              Data.toast({status:"error",message:"Duplicate reservation."});
            }*/
            else
            {
              Data.toast({status:"error",message:"There was an error when try to create the reservation."});
            }
          });
          $scope.getItemDetails();
          $scope.getItemReservations();
          $scope.getCalendarInfo();
        }
      });
    }
  };




  $scope.dropReservation = function(index) {
    Data.get('session').then(function (results) {
        if (results.uid) {
          //console.log($rootScope.uid)
          Data.post('dropReservation', {
            itemid: parseInt($routeParams.itemID),
            user: $rootScope.uid,
            quantity: parseInt($scope.reservations[index].quantity),
            daterange: $scope.reservations[index].daterange,
            borrowerName: $scope.reservations[index].username,
            borrowerEmail: $scope.reservations[index].useremail
          }).then(function (results) {
            if(results["dropReservation"])
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
          $scope.getCalendarInfo();
        }
      });
  };


  $scope.getCalendarInfo = function() {
    Data.get('session').then(function (results) {
        if (results.uid) {
          Data.post('getCalendarInfo', {
            itemid: $routeParams.itemID,
          }).then(function (results) {

            $scope.quantityTotal = parseInt(results.quantityTotal);
            //generate an array of the dates for the next 6 months and calculate the quantity for each date.

            // reservation is being used interchangeably for checkout and reserved items
            var quantityPerDay = results.reservations.map(function(reservation) {
              if(reservation["return_date"].indexOf("-") == -1) // if checkout
              {
                return {
                  start: moment().format("YYYY/MM/DD"),
                  end: moment(reservation["return_date"], "MM/DD/YYYY").format("YYYY/MM/DD"),
                  quantity: parseInt(reservation["quantity"]),
                  reserved: false,
                  checkedOut: true
                };
              }
              else // must be a reserved item
              {
                //parse the reservation dates, items within the date range should be decremented
                var dates = reservation["return_date"].split(" - ");
                return {
                  start: moment(dates[0], "MM/DD/YYYY").format("YYYY/MM/DD"),
                  end: moment(dates[1], "MM/DD/YYYY").format("YYYY/MM/DD"),
                  quantity: parseInt(reservation["quantity"]),
                  checkedOut: false,
                  reserved: true
                };
              }
            });
            $scope.events = quantityPerDay;
      });
      }
    });
  };

  $scope.availableItems = function (events) {
    var totalUnavailable = events.reduce((sum, event) => { return sum + event.quantity }, 0);

    if($scope.quantityTotal - totalUnavailable < 0)
    {
      return 0;
    }
    else {
      return $scope.quantityTotal - totalUnavailable;
    }
  }

  $scope.isAfterToday = function (date) {
    return date.isAfter(moment().subtract(1, 'd'));
  }

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
                // console.log(results3);

                /*if(results3.image)
                {
                  Data.toast({status:"success",message:"Item deleted."});
                }
                else if(!results3.image)
                {
                  Data.toast({status:"error",message:"Item not deleted."});
                }*/

                if(results3.sqlDelete)
                {
                  Data.toast({status:"success",message:"Item image deleted."});
                }
                else if(!results3.sqlDelete)
                {
                  Data.toast({status:"error",message:"Item image not deleted."});
                }

                if(results3.sqlDelete)
                {
                  $location.path('inventory');
                }
               /* if(results3.sqlDelete && results3.image)
                {
                  $location.path('inventory');
                }*/


              });

            }
          });
        }
      });

    }

  };

  $scope.getItemDetails();
  $scope.getItemReservations();



  $scope.options = {
      weekOffset: 0,
      daysOfTheWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      showAdjacentMonths: true,
      multiDayEvents: {
        endDate: 'end',
        startDate: 'start',
    },

  };

 $scope.events = [];
 $scope.getCalendarInfo();

  $scope.showEvents = function(events) {
    var totalUnavailable = events.reduce((sum, event) => { return sum + event.quantity }, 0);
    var checkedOut = events.filter((event) => event.checkedOut).reduce((sum, event) => { return sum + event.quantity }, 0);
    var reserved = events.filter((event) => event.reserved).reduce((sum, event) => { return sum + event.quantity }, 0);

    document.getElementById('calendarModal').style.display = "block";
    $scope.calendarData = {totalUnavailable: totalUnavailable, checkedOut: checkedOut, reserved: reserved};
  };

  $scope.closeCalendarButtonClick = function () {
    document.getElementById('calendarModal').style.display = "none";
  };
  $scope.checkAvailability = function(start, end, quantity){
    $scope.getCalendarInfo();

    var startMoment = moment(start);

    while(startMoment.isSameOrBefore(moment(end), 'day'))
    {
      var sum = quantity;
      for(event in $scope.events)
      {
        //console.log($scope.events[event])
        if(overlappingRanges(startMoment, startMoment, moment($scope.events[event].start,"YYYY/MM/DD"), moment($scope.events[event].end,"YYYY/MM/DD")))
        {
          sum += $scope.events[event].quantity;
        }
      }
      //console.log(sum);
      if(sum > $scope.quantityTotal)
      {
        return false;
      }
      startMoment.add(1, 'day');
      //console.log(startMoment);
    }
    return true;
  };
});

//takes in 4 moment objects
function overlappingRanges(lhsStart, lhsEnd, rhsStart, rhsEnd){
  if(lhsEnd.isSameOrBefore(rhsStart, 'day') || rhsEnd.isSameOrBefore(lhsStart, 'day'))
  {
    return true;
  }
  return false;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
