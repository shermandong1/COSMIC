
var app = angular.module("myApp", ["ngTable"]);

app.controller('demoController', ['$scope', '$http','NgTableParams', function ($scope, $http, NgTableParams) {

  // http get request to read CSV file content
  $http.get("log_data.txt")
    .then(
      function(response) {
        
        var allText = response.data;
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for ( var i = allTextLines.length-1; i > -1; i--) {
          // split content based on comma
          var data = allTextLines[i].split(',');

          if(data.length == headers.length){
            var tarr = {};

            tarr.name = data[0];
            tarr.email = data[1];
            tarr.item = data[2];
            tarr.quantity = data[3];
            tarr.action = data[4];
            tarr.hardwarenotes = data[5];
            tarr.date = data[6];
            tarr.time = data[7];

            lines.push(tarr);
          }
        }
        $scope.data = lines;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.data});
    },
      function(response) {
      alert('Could not load log_data.txt!');
        $scope.data = [];
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.data});
    }

    );

}]);

angular.module('myApp').run(['$templateCache', function ($templateCache) {
  $templateCache.put('ng-table/filters/text.html', '<input type="text" ng-model="params.filter()[name]" ng-if="filter==\'text\'" placeholder="Search for ID" class="input-filter form-control"/>');
}]);