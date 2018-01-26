function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};

    if($location.path()!=='/4E3D91444D2D47E7ED5711FDCE33FC7928A8A7F9')
    {
        Data.get('session').then(function (results) {
            if (results.uid) {
                $location.path('dashboard');
            }
        });
    }

    $scope.doLogin = function (customer) {

        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('inventory');
            }
        });
    };

    $scope.signup = {email:'',password:'',name:'',type:'USC Student'};
    $scope.signUp = function (customer) {
        if(validateEmail(customer.email))
        {
            Data.post('signUp', {
                customer: customer
            }).then(function (results) {
                Data.toast(results);
                if (results.status == "success") {
                    $location.path('dashboard');
                }
                else if(results.status == "error") {
                    alert(results.message);
                }
                else{
                    console.log(results);
                    alert("Server error: unable to create new user.");
                }
            });
        }
        else{
            alert("Invalid e-mail: unable to create new user.");
        }
    };

    $scope.forgotpass = {email: ''};
    $scope.showForgotPass = function ()
    {
        document.getElementById('forgotPassModal').style.display = "block";
    }

    $scope.forgotPassButtonSubmit = function ()
    {
        if($scope.forgotpass.email === "")
        {
            Data.toast({status:"error",message:"Please enter your user e-mail to reset your forgotton password."});
        }
        else
        {
            Data.post('checkEmail', {
                email: $scope.forgotpass.email
            }).then(function (results) {
                if(results.email !== $scope.forgotpass.email)
                {
                    Data.toast({status:"error",message:"No user with this e-mail found in the system."});
                }
                else
                {
                    Data.post('sendForgottenPass', {
                        email: $scope.forgotpass.email
                    }).then(function (results2) {
                        Data.toast({status:"info",message:"A message has been to your e-mail with your reset password."});
                        $scope.forgotPassButtonCancel();
                    });
                }
            });
        }

    }

    $scope.forgotPassButtonCancel = function ()
    {
        $scope.forgotpass.email = "";
        document.getElementById('forgotPassModal').style.display = "none";
    }


});