app.controller("dashboardCtrl", function($scope, $filter, $http, Data, $location, screenSize) {

  $scope.show = false;

  $scope.checkOutData = { hasIDs: 0, HardwareUniqueIDs: ""};

  $scope.desktop = screenSize.is('md, lg');
  $scope.mobile = screenSize.is('xs, sm');
  $scope.desktop = screenSize.on('md, lg', function(match){
    $scope.desktop = match;
  });
  $scope.mobile = screenSize.on('xs, sm', function(match){
      $scope.mobile = match;
  });


   



  $scope.logout = function () {
      Data.get('logout').then(function (results) {
          Data.toast(results);
          $location.path('login');
      });
  };

  $scope.getCheckedOut = function () {
    Data.get('session').then(function (results) {
      if (results.uid) {
        Data.post('getCheckedOut', {
          uid: results.uid
        }).then(function (results) {
          $scope.data = results;
          console.log(results);
        });
      }
      $scope.show = true;
    });
  };

  $scope.getReserved = function () {
    Data.get('session').then(function (results) {
      if (results.uid) {
        Data.post('getReserved', {
          uid: results.uid
        }).then(function (results) {
          //console.log(results);
          $scope.reservations = results;
        });
      }
      $scope.show = true;
    });
  };

  $scope.checkIn = function (itemname, itemid, quantity, name, email) {
	

    Data.post('getItemHardwareFlag', {
      itemid: itemid,
    }).then(function (results) {
      document.getElementById('checkInModal').style.display = "block";
      $scope.checkInData = {checkOutQuantity: quantity, checkInConsumed: null, checkInQuantity: null, note: "", itemid: itemid, itemname: itemname, isHardware: results.hardware, HardwareUniqueIDs: "", borrowerName:name, borrowerEmail:email};

    });

    $scope.queryHardwareID = [];




    $scope.hardwareID = [];
    Data.post('getHardwareIDCheckin', {
        itemid: itemid,
      }).then(function (results) {
        console.log(results);
        // $scope.hardwareID = results;
        for (key in results){
        	$scope.hardwareID.push({label: results[key]['HardwareID']});
        }

      });
  		console.log($scope.hardwareID);

};

    


  $scope.checkInButtonClick = function () {
    document.getElementById('checkInModal').style.display = "none";
    var checkInQuantity = filterInt($scope.checkInData.checkInQuantity);
    var checkInConsumed = filterInt($scope.checkInData.checkInConsumed);

    // var itemIDs = $scope.checkInData.HardwareUniqueIDs.split(" ");
    // var str = $scope.checkInData.HardwareUniqueIDs;

    var tickedItems = [];
    angular.forEach( $scope.hardwareID, function(value, key){
		if (value.ticked){
			tickedItems.push(value.label);
		}
    });

    console.log(tickedItems);


    if(checkInQuantity == 0 && tickedItems.length == 1 && tickedItems[0] == "")
    {
      tickedItems = [];
    }

    if($scope.checkInData.checkInQuantity == null || $scope.checkInData.checkInConsumed == null)
    {
      Data.toast({status:"error",message:"Quantities cannot be empty."});
    }
    else if( (isNaN(checkInQuantity) || checkInQuantity < 0) || (isNaN(checkInConsumed) || checkInConsumed < 0))
    {
      Data.toast({status:"error",message:"Quantities must be a valid number."});
    }
    else if( (checkInQuantity + checkInConsumed) > $scope.checkInData.checkOutQuantity)
    {
      Data.toast({status:"error",message:"Total Quantities cannot be greater than total checked out quantity."});
    }
    else if($scope.checkInData.isHardware == 1 && tickedItems.length != checkInQuantity)
    {
      Data.toast({status:"error",message:"Please enter " + checkInQuantity + " total unique item IDs, one for each item you are checking in."});
    }
    else
    {
        Data.get('session').then(function (results) {
          if (results.uid) {
            Data.post('checkIn', {
              itemid: $scope.checkInData.itemid,
              itemname: $scope.checkInData.itemname,
              uid: results.uid,
              useremail: results.email,
              checkInQuantity: $scope.checkInData.checkInQuantity,
              checkInConsumed: $scope.checkInData.checkInConsumed,
              borrowerName: $scope.checkInData.borrowerName,
              borrowerEmail: $scope.checkInData.borrowerEmail,
              hardwareNotes: tickedItems,
              note: $scope.checkInData.note,
            }).then(function (results) {
              if( results["updateCheckOut"] && results["dropCheckOut"] && results["updateStatus"] )
              {
                Data.toast({status:"success",message:"Item checked in."});
              }
              else if (results["checkedout"] == null)
              {
                Data.toast({status:"error",message:"This item was already checked in"});
              }
              else
              {
                Data.toast({status:"error",message:"There was an error when trying to check in the item."});
              }

            });
            $scope.getCheckedOut();
          }
        });
      }
  };

  $scope.checkInButtonCancel = function () {
    document.getElementById('checkInModal').style.display = "none";
    Data.toast({status:"info",message:"Check in cancelled."});
  };

  $scope.dropReservation = function (index) {
    Data.get('session').then(function (results) {
      if (results.uid) {
        Data.post('dropReservation', {
          itemid: $scope.reservations[index].itemid,
          user: results.uid,
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
            Data.toast({status:"error",message:"There was an error when trying to cancel the reservation."});
          }


        });
        $scope.getReserved();
      }
    });
  };

  $scope.checkOutHardwareButtonClick = function () {
    $scope.checkOutReservationSuccess($scope.checkOutHardwareModalID);
    document.getElementById('checkOutHardwareModal').style.display = "none";
  };

  $scope.checkOutHardwareButtonCancel = function () {
    document.getElementById('checkOutHardwareModal').style.display = "none";
    Data.toast({status:"info",message:"Check Out cancelled."});
  };

  $scope.checkOutReservation = function (index) {

    Data.post('getItemHardwareFlag', {
      itemid: $scope.reservations[index].itemid,
    }).then(function (results) {
      if(results.hardware == 1)
      {
        document.getElementById('checkOutHardwareModal').style.display = "block";
        $scope.checkOutHardwareModalID = index;
        $scope.checkOutData.hasIDs = 1;
        $scope.checkOutData.quantity = $scope.reservations[index].quantity;
      }
      else
      {
        $scope.checkOutReservationSuccess(index);
      }

      $scope.queryHardwareID = [];

	    $scope.hardwareID = [];
	    Data.post('getHardwareID', {
	        itemid: $scope.reservations[index].itemid,
	      }).then(function (results) {
	        console.log(results);
	        // $scope.hardwareID = results;
	        for (key in results){
	        	$scope.hardwareID.push({label: results[key]['HardwareID']});
	        }

	      });
	  		console.log($scope.hardwareID);
    });

  }

  $scope.checkOutReservationSuccess = function (index) {

    //Check that the current date is within the reservation window
    var currDate = new Date();
    currDate = new Date(currDate.getFullYear(),currDate
      .getMonth(),currDate.getDate());

    var dateRange = $scope.reservations[index].daterange.split(" ");

    var startDate = dateRange[0];
    var endDate = dateRange[2];

    var partsStart = startDate.split('/')
    var partsEnd = endDate.split('/')

    var startDateObj = new Date(partsStart[2],partsStart[0]-1,partsStart[1]);
    var endDateObj = new Date(partsEnd[2],partsEnd[0]-1,partsEnd[1]);
    var dateOkToCheckOut = (startDateObj <= currDate && currDate <= endDateObj);



    if(dateOkToCheckOut)
    {
      /*if($scope.checkOutData.hasIDs == 1 && ($scope.checkOutData.HardwareUniqueIDs === "" || $scope.checkOutData.HardwareUniqueIDs.split(" ").length != $scope.reservations[index].quantity))
      {
        Data.toast({status:"error",message:"Please enter the unique ID of each item you are checking out, separated by spaces."});
      }*/

      var tickedItems = [];
      angular.forEach( $scope.hardwareID, function( value, key ) {
        if(value.ticked){
          tickedItems.push(value.label);
        }
      });

      if($scope.checkOutData.hasIDs == 1 && tickedItems.length != $scope.reservations[index].quantity)
      {
        Data.toast({status:"error",message:"Please select " + $scope.reservations[index].quantity + " total unique item IDs, one for each item you are checking out."});
      }
      else
      {
        Data.get('session').then(function (results) {
          if (results.uid) {
            Data.post('checkOutReservation', {
              itemid: $scope.reservations[index].itemid,
              ckoutUserName: $scope.reservations[index].username,
              ckoutUserEmail: $scope.reservations[index].useremail,
              uid: results.uid,
              quantity: parseInt($scope.reservations[index].quantity),
              daterange: $scope.reservations[index].daterange,
              uniqueItemIDs: tickedItems,
            }).then(function (results) {
              if(results["duplicate"]){
                Data.toast({status:"error",message:"User must return all previously checkout items before checking out again."});
              }
              else if(results["dropReservation"] && results["addCheckedOut"] && results["substractVal"] && results["updateStatus"])
              {
                Data.toast({status:"success",message:"Reservation checked out."});
              }
              else
              {
                Data.toast({status:"error",message:"There was an error when trying to check out the reservation."});
              }
            });
            $scope.checkOutHardwareUniqueIDs = "";
            $scope.checkOutData.hasIDs = 0;
            $scope.checkOutData.quantity = 0;
            $scope.getCheckedOut();
            $scope.getReserved();
          }
        });
      }
    }
    else
    {
      Data.toast({status:"error",message:"Reservation can be checked out between reserved dates only."});
    }
  };

  $scope.getCheckedOut();
  $scope.getReserved();

});
