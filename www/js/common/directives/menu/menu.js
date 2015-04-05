app.directive('menu', function () {
    return {
        restrict: 'E',
        // scope: true,
        controller: "menuCtrl",
        templateUrl: 'js/common/directives/menu/menu.html',
    };
});

app.controller('MenuCtrl', function($scope, $rootScope) {
  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(show_map);
    function show_map(position) {
      $scope.long = position.coords.longitude;
      $scope.lat = position.coords.latitude;
      $rootScope.coordinates = [position.coords.longitude, position.coords.latitude];
      console.log("coordinates", $rootScope.coordinates)
    }
  }
})
