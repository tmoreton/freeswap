// app.config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider

//   .state('front-page', {
//     url: "/front-page",
//     templateUrl: "/js/common/directives/front-page/front-page.html",
//     controller: 'FrontPageCtrl'
//   })
// });

app.directive('frontPage', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/front-page/front-page.js'
	}
})
