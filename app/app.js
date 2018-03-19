var app = angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'toaster',
  'angularFileUpload',
  'matchMedia',
  'tien.clndr',
  'isteven-multi-select'
]);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/4E3D91444D2D47E7ED5711FDCE33FC7928A8A7F9', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when('/inventory', {
                title: 'Inventory',
                templateUrl: 'partials/inventory.html',
                controller: 'inventoryCtrl'
            })
            .when('/items/:itemID', {
                title: 'Item Details',
                templateUrl: 'partials/item.html',
                controller: 'itemCtrl'
            })
            .when('/newitem', {
                title: 'Item Details',
                templateUrl: 'partials/newitem.html',
                controller: 'newitemCtrl'
            })
            .when('/removeusers', {
                title: 'Remove Users',
                templateUrl: 'partials/removeusers.html',
                controller: 'removeusersCtrl'
            })
            .when('/changepass', {
                title: 'Change Password',
                templateUrl: 'partials/changepassword.html',
                controller: 'changepasswordCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .when('/about', {
                title: 'About',
                templateUrl: 'partials/about.html',
                controller: 'aboutCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.type = results.type;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/4E3D91444D2D47E7ED5711FDCE33FC7928A8A7F9' || nextUrl == '/login' || nextUrl == '/about') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });


var filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

function mysql_real_escape_string (str) {
    if(str == null)
        return null
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
