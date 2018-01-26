app.controller("changepasswordCtrl", function($scope, $filter, $http, Data, $location, screenSize, $rootScope) {

  $scope.oldPass = "";
  $scope.newPass = "";


  $scope.changePass = function () {

    Data.post('updatePassword', {
      uid: $rootScope.uid,
      oldPassword: $scope.oldPass,
      newPassword: $scope.newPass
    }).then(function (results) {
      if(results.updatePassword==="Incorrect Old Password")
      {
        Data.toast({status:"error",message:"Incorrect old password."});
      }
      else if(results.updatePassword)
      {
        Data.toast({status:"success",message:"Password changed."});
      }
      else
      {
        Data.toast({status:"error",message:"Error. Unable to change password."});
      }
    });

  };

});