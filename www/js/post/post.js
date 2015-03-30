app.config(function($stateProvider) {
  $stateProvider.state('app.post', {
    url: '/post',
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
  console.log('Current User Info',$scope.userInfo)

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
    console.log("product", product)
    productFactory.addProduct(product).then(function(data){
      console.log("hello in postCtrl: ", data)
      if(data !== null)
      $state.go('app.swap');
    })
  }

})
