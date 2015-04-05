// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('myApp', ['ionic', 'ionic.contrib.ui.tinderCards', 'firebase']);

app.run(function($ionicPlatform, $state, $rootScope, AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  })

  // $rootScope.$on("$stateChangeStart",
  //     function(event, toState, toParams, fromState, fromParams) {
  //         if (toState.authenticate && !AuthService.isAuthenticated()) {
  //           $state.go('login');
  //           event.preventDefault();
  //         }
  //     });
})

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('app', {
    url: "/app",
    abstract: true,
    controller: 'MainCtrl',
    templateUrl: "js/common/directives/menu/menu.html"
  })

  // if none of the above states are matched, use this as the fallback
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });
});

// FSG Generate - FSA Pre-built
app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
});

app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    var statusDict = {
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
    };
    return {
        responseError: function (response) {
            $rootScope.$broadcast(statusDict[response.status], response);
            return $q.reject(response);
        }
    };
});

app.service('AuthService', function ($http, Session, $rootScope, AUTH_EVENTS, $q) {

    var onSuccessfulLogin = function (response) {
        var data = response.data;
        Session.create(data.id, data.user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        return data.user;
    };



    this.getLoggedInUser = function () {

        if (this.isAuthenticated()) {
            return $q.when(Session.user);
        }

        return $http.get('/session').then(onSuccessfulLogin).catch(function () {
            return null;
        });

    };

    this.login = function (credentials) {
        return $http.post('/login', credentials).then(onSuccessfulLogin);
    };

    this.logout = function () {
        return $http.get('/logout').then(function () {
            Session.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
    };

    this.isAuthenticated = function () {
        return !!Session.user;
    };

});

app.service('Session', function ($rootScope, AUTH_EVENTS) {

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, this.destroy);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, this.destroy);

    this.create = function (sessionId, user) {
        this.id = sessionId;
        this.user = user;
    };

    this.destroy = function () {
        this.id = null;
        this.user = null;
    };

});
