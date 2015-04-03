// app.config(function($stateProvider) {
//   $stateProvider.state('app.product-detail', {
//     url: "/product-detail/:_id",
//     views: {
//       'menuContent': {
//         templateUrl: "js/view/view.html",
//         controller: 'ProductDetailCtrl'
//       }
//     },
//     resolve: {
//     	product: function($stateParams, productFactory) {
//     		return productFactory.getProduct($stateParams._id);
//     	},
//     	userInfo: function(user) {
//     		return user.info();
//     	}
//     }
//   })
// })

// app.controller('ProductDetailCtrl',function($scope, product, userInfo) {
// 	$scope.userInfo = userInfo;
// 	$scope.product = product;
// 	console.log('Current Product', $scope.product);
// })
