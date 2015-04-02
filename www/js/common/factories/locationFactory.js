app.factory('locationFactory', function($q, $rootScope) {
  var coordinates;
  return {
    getLocation: function() {
      // var deffered = $q.defer();
      // navigator.geolocation.getCurrentPosition(function(position){
      //   $rootScope.$apply(function(){deffered.resolve(position);})
      // });
      // return deffered.promise;
    }
  }
});
