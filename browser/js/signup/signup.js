'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        resolve: {
            getLoggedInUser: function(AuthService, $state){
                return AuthService.getLoggedInUser().then(function(user){
                    if(user){
                        $state.go("checkout");
                    }
                })
            }
        },
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.html'
    });

});


app.controller('SignupCtrl', function ($scope, $location, $state, AddUserFactory, CheckUserFactory) {
    $scope.signup = function(){

        if($scope.signInForm.$valid){//adds user to the db

            AddUserFactory.AddUser($scope.user).then(function(){//if sucessful then logs in the user automatically
                CheckUserFactory.checkuser($scope.user).then(function(user){

                    if(user) {
                        $state.go("checkout");
                    }
                })
            });
        }else{
            $scope.signInForm.submitted = true;
        }
    };

});
