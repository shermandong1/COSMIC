app.controller("newitemCtrl", ['$scope', '$filter', '$routeParams','$rootScope','$http', 'Data', 'FileUploader', function($scope, $filter, $routeParams, $rootScope, $http, Data, FileUploader) {

  var uploader = $scope.uploader = new FileUploader({
            url: 'api/upload.php',
            queueLimit: 1,
            autoUpload: false
        });


  uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });

  // CALLBACKS
  uploader.onWhenAddingFileFailed  = function(item, filter, options) {
      if(item.type !==  "image/jpeg") {
        Data.toast({status:"error",message:"Images must be JPEG."})
        uploader.clearQueue();
      }
      if(filter.name == "queueLimit") {
          uploader.clearQueue();
          uploader.addToQueue(item);
      }
  }
  uploader.onAfterAddingFile = function(fileItem) {
      if(fileItem.file.type !== "image/jpeg")
      {
        Data.toast({status:"error",message:"Image must be in JPEG format."})
        uploader.clearQueue();
      }
      if(fileItem.file.size/1024/1024 > 10)
      {
        Data.toast({status:"error",message:"Max image size is 10 MB."})
        uploader.clearQueue();
      }
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      Data.toast({status:"success",message:"Item image uploaded."})
      $scope.newItem = {};
      $scope.newItem.name = null;
      $scope.newItem.quantityAvailable = null;
      $scope.newItem.reorderThreshold = null;
      $scope.newItem.tag1 = null;
      $scope.newItem.tag2 = null;
      $scope.newItem.tag3 = null;
      $scope.newItem.tag4 = null;
      $scope.newItem.tag5 = null;
      $scope.newItem.location = null;
      $scope.newItem.desc = null;
      uploader.clearQueue();
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      Data.toast({status:"error",message:"Error uploading item image."});
      uploader.clearQueue();
  };

  $scope.newItem = {};
  $scope.newItem.name = null;
  $scope.newItem.isHardware = false;
  $scope.newItem.quantityAvailable = null;
  $scope.newItem.reorderThreshold = null;
  $scope.newItem.tag1 = null;
  $scope.newItem.tag2 = null;
  $scope.newItem.tag3 = null;
  $scope.newItem.tag4 = null;
  $scope.newItem.tag5 = null;
  $scope.newItem.location = null;
  $scope.newItem.desc = null;
  $scope.newItem.hardware = null;

  $scope.addItem = function () {

    if(isNaN(filterInt($scope.newItem.quantityAvailable)) || filterInt($scope.newItem.quantityAvailable) < 0)
    {
      Data.toast({status:"error",message:"Quantity must be a non-negative number."})
    }
    else if(isNaN(filterInt($scope.newItem.reorderThreshold)) || filterInt($scope.newItem.reorderThreshold) < 0)
    {
      Data.toast({status:"error",message:"Reorder threshold must be a non-negative number."})
    }
    else if (!$scope.newItem.location){
      Data.toast({status:"error",message:"Please specify your location."})

    }
    else
    {
      var hardwareFlag = $scope.newItem.isHardware ? 1 : 0;

      Data.post('addItem', {
        name: mysql_real_escape_string ($scope.newItem.name),
        status: $scope.newItem.status,
        quantityAvailable: $scope.newItem.quantityAvailable,
        isHardware: hardwareFlag,
        HardwareID:  $scope.newItem.hardware,
        reorderThreshold: $scope.newItem.reorderThreshold,
        tag1: mysql_real_escape_string ($scope.newItem.tag1),
        tag2: mysql_real_escape_string ($scope.newItem.tag2),
        tag3: mysql_real_escape_string ($scope.newItem.tag3),
        tag4: mysql_real_escape_string ($scope.newItem.tag4),
        tag5: mysql_real_escape_string ($scope.newItem.tag5),
        location: mysql_real_escape_string ($scope.newItem.location),
        desc: mysql_real_escape_string ($scope.newItem.desc),
      }).then(function (results) {
        if(results["addedItem"] == null || isNaN(results["addedItem"]) || results["locationid"] == null)
        {
          console.log(results);
          Data.toast({status:"error",message:"There was an error when adding the new item."})
        }
        else
        {
          console.log(results);
          Data.toast({status:"success",message:"Item added."})
          uploader.queue[0].file.name=results["addedItem"]+'.jpg';
          uploader.queue[0].upload();
        }
      });
    }
  }

}]);


app.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);