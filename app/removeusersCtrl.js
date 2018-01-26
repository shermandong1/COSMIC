app.controller("removeusersCtrl", function($scope, $filter, $http, Data, $location, screenSize, $rootScope) {

  $scope.data = [];

  $scope.getAllUsers = function (uid) {
    Data.post('getAllUsers', {
    }).then(function (results) {
      $scope.data = results;
    });
  };


  $scope.removeUser = function (uid, name, email) {

    var r = confirm("Are you sure you want to remove "+name+" ("+email+")?");
    if (r == true) {

      Data.post('getCheckedOut', {
        uid: uid
      }).then(function (results) {
        if (results.length != 0)
        {
          Data.toast({status:"error",message:"User has item(s) checked out. Cannot delete user."});
        }
        else
        {
          Data.post('getReserved', {
            uid: uid
          }).then(function (results2) {
            if (results2.length != 0)
            {
              Data.toast({status:"error",message:"User has item(s) reserved. Cannot delete user."});
            }
            else
            {
              Data.post('removeUser', {
                uid: uid
              }).then(function (results3) {
                if(results3)
                {
                  Data.toast({status:"success",message:"User removed."});
                }
                else
                {
                  Data.toast({status:"error",message:"Unable to remove user."});
                }
                $scope.getAllUsers();
              });
            }

          });

        }


      });
    }

  };

  $scope.getAllUsers();


});