app.controller("inventoryCtrl", ['$scope','$filter','$http','Data','screenSize' , function($scope, $filter, $http, Data, screenSize) {

  $scope.show = false;
  $scope.query = "";
  $scope.desktop = screenSize.is('md, lg');
  $scope.mobile = screenSize.is('xs, sm');
  $scope.desktop = screenSize.on('md, lg', function(match){
    $scope.desktop = match;
  });
  $scope.mobile = screenSize.on('xs, sm', function(match){
      $scope.mobile = match;
  });

  var sortingOrder = 'name'; //default sort

  Data.get('session').then(function (results) {
    if (results.uid) {
      $scope.sortingOrder = sortingOrder;
      $scope.pageSizes = [1, 5,10,25,50];
      $scope.reverse = false;
      $scope.filteredItems = [];
      $scope.groupedItems = [];
      $scope.itemsPerPage = 5;
      $scope.pagedItems = [];
      $scope.currentPage = 0;
      $scope.items = [];
      $scope.locations = [];
       Data.post('getLocationsList', {
      }).then(function (results) {
        $scope.locations = results;
      });

      Data.post('getInventory', {
      }).then(function (results) {
        $scope.items = results;
        $scope.show = true;
        $scope.showAvailable = true;
        $scope.showUnavailable = true;
        $scope.searchAll();
      });

     
    }
  });





  var searchMatch = function (haystack, needle) {
    if (!needle) {
      return true;
    }
    var found = 0;
    if(haystack != null)
    {
      if(haystack.constructor === Array)
      {
        for(i = 0; i < haystack.length; i++)
        {
          found = (haystack[i].toLowerCase().indexOf(needle.toLowerCase()) !== -1)
          if(found == 1)
          {
            return found;
          }
        }
      }
      else
      {
      	// console.log(typeof(haystack));
      	// console.log(haystack);	
      	// console.log(needle);
      	// console.log(typeof(needle));
      	// console.log(needle.location);
        found = (haystack.toLowerCase()).indexOf(needle.toLowerCase()) !== -1
      }
    }
    return found;
  };


  $scope.searchTagsInd = function (tag) {
    $scope.queryTags = tag;
    $scope.searchAll();
  };




  /*$scope.searchName = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      if (searchMatch(item["name"], $scope.queryName))
          return true;
      return false;
    });
    // take care of the sorting order
    if ($scope.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };

  $scope.searchTags = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      if (searchMatch(item["tag1"], $scope.queryTags))
          return true;
      if (searchMatch(item["tag2"], $scope.queryTags))
          return true;
      if (searchMatch(item["tag3"], $scope.queryTags))
          return true;
      if (searchMatch(item["tag4"], $scope.queryTags))
          return true;
      if (searchMatch(item["tag5"], $scope.queryTags))
          return true;
      return false;
    });
    // take care of the sorting order
    if ($scope.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };

  $scope.searchAvailability = function () {
    var show;
    if($scope.showAvailable && $scope.showUnavailable)
    {
      $scope.filteredItems = $filter('filter')($scope.items, function (item) {
        return true;
      });
    }
    else if($scope.showAvailable)
    {
      $scope.filteredItems = $filter('filter')($scope.items, function (item) {
        if (item["status"] === "Available")
            return true;
        return false;
      });
    }
    else if($scope.showUnavailable)
    {
      $scope.filteredItems = $filter('filter')($scope.items, function (item) {
        if (item["status"] === "Unavailable")
            return true;
        return false;
      });
    }

    // take care of the sorting order
    if ($scope.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };*/

  $scope.searchAll = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      if (searchMatch(item["name"], $scope.queryName) && 
      	// searchMatch(item["location"], $scope.queryLocation.location) &&
        (searchMatch(item["tag1"], $scope.queryTags) || searchMatch(item["tag2"], $scope.queryTags) || searchMatch(item["tag3"], $scope.queryTags) || searchMatch(item["tag4"], $scope.queryTags) || searchMatch(item["tag5"], $scope.queryTags) || searchMatch(item["location"], $scope.queryTags))
        )
          {
            // console.log(item);
            // console.log("item name: " + item["name"] + ", location name: " + item["location"]);
            if($scope.showAvailable && $scope.showUnavailable)
            {
                return true;
            }
            else if($scope.showAvailable)
            {
              if (item["status"] === "Available")
                return true;
            }
            else if($scope.showUnavailable)
            {
              if (item["status"] === "Unavailable")
                  return true;
            }
          }
      return false;
    });
    // take care of the sorting order
    if ($scope.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };

  $scope.searchLoc = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      if ( searchMatch(item["location"], $scope.queryLocation.location))
          {
            // console.log(item);
            // console.log("item name: " + item["name"] + ", location name: " + item["location"]);
            if($scope.showAvailable && $scope.showUnavailable)
            {
                return true;
            }
            else if($scope.showAvailable)
            {
              if (item["status"] === "Available")
                return true;
            }
            else if($scope.showUnavailable)
            {
              if (item["status"] === "Unavailable")
                  return true;
            }
          }
      return false;
    });
    // take care of the sorting order
    if ($scope.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };




  // show items per page
  $scope.perPage = function () {
    $scope.groupToPages();
  };

  // show items per page
  $scope.perPage = function () {
    $scope.groupToPages();
  };

  // calculate page in place
  $scope.groupToPages = function () {
    $scope.pagedItems = [];

    for (var i = 0; i < $scope.filteredItems.length; i++) {
      if (i % $scope.itemsPerPage === 0) {
        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
      } else {
        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
      }
    }
  };

  $scope.range = function (start, end) {
    var ret = [];
    if (!end) {
      end = start;
      start = 0;
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage++;
    }
  };

  $scope.setPage = function () {
    $scope.currentPage = this.n;
  };

  // change sorting order
  $scope.sort_by = function(newSortingOrder) {
    if ($scope.sortingOrder == newSortingOrder)
      $scope.reverse = !$scope.reverse;

    $scope.sortingOrder = newSortingOrder;
  };



}]);
