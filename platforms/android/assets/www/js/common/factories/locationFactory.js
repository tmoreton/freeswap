// app.factory('locationFactory', function($q, $rootScope) {
//   var coordinates;
//   return {
//     getLocation: function() {
//       var deffered = $q.defer();
//       navigator.geolocation.getCurrentPosition(function(position){
//         $rootScope.$apply(function(){deffered.resolve(position);})
//       });
//       return deffered.promise;
//     }
//   }
// });

// app.factory('locationFactory', function($scope) {
//   var coordinates;
//   return {
//     getLocation: function() {
//       navigator.geolocation.getCurrentPosition(show_map);
//       function show_map(position) {
//         $scope.long = position.coords.longitude;
//         $scope.lat = position.coords.latitude;
//         $scope.coordinates = [position.coords.longitude, position.coords.latitude];
//         console.log("coordinates", $scope.coordinates)
//       }
//     }
//   }
// });


