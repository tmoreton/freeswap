app.config(function($stateProvider) {
  $stateProvider.state('app.post', {
    url: '/post',
    authenticate: true,
    views: {
      'menuContent': {
        templateUrl: "js/post/post.html",
        controller: 'postCtrl'
      }
    },
    resolve: {
      userInfo: function(user) {
        return user.info();
      }
    }
  });
});

// removed $cordovaCamera, $localstorage, $ionicLoading from controller

app.controller('postCtrl', function ($scope, $state, productFactory, userInfo) {

  $scope.userInfo = userInfo._id;
  // $scope.location = getCurrentPosition();
  // console.log('Current User location',$scope.location)
  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(show_map);
    function show_map(position) {
      $scope.long = position.coords.longitude;
      $scope.lat = position.coords.latitude;
      $scope.coordinates = [position.coords.longitude, position.coords.latitude];
      console.log("coordinates", $scope.coordinates)
    }
  }

  $scope.createImage = function() {
    filepicker.setKey("ANpfvtihTTqf5AEXc2fv5z");
    filepicker.pickAndStore({mimetype:"image/*"},{},
      function(InkBlobs){
        $scope.imageUrl = InkBlobs[0].url
        console.log(InkBlobs[0]);
    });
  }

  $scope.newItem = function(product){
    console.log("product", product)
    product.ImageUrls = $scope.imageUrl;
    product.seller = $scope.userInfo;
    product.location = $scope.coordinates;
    console.log("product", product)
    productFactory.addProduct(product).then(function(data){
      console.log("hello in postCtrl: ", data)
      if(data !== null)
      $state.go('app.swap');
    })
    $scope.product = {};
  }

})
