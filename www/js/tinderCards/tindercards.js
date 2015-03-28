app.config(function($stateProvider) {
  $stateProvider.state('app.swap', {
    url: "/swap",
    controller: 'CardsCtrl',
    views: {
      'menuContent': {
        templateUrl: "js/tinderCards/tindercards.html"
      }
    }
  })
})

app.controller('CardsCtrl', function($scope, $window, TDCardDelegate, AuthService, swipe, user, productFactory) {
  // get Current User infor
  user.info().then(function(user){
    $scope.userInfo = user;
  });

  // get Card from DB
  productFactory.getData().then(function(data){
    $scope.cards = data;
  });

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    $scope.newCard = $scope.cards[Math.floor(Math.random() * $scope.cards.length)];
    $scope.newCard.sellerId = '5511b521a44a6ba7c7d360bf'; //TEMPORARY DEVELOPMENT PURPOSES
    return $scope.newCard;
  };

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.currentCard = $scope.addCard();

    swipe.dislike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
      console.log(response);
    })
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.currentCard = $scope.addCard();

    swipe.like($scope.currentCard._id, $scope.userInfo._id, $scope.newCard.sellerId).then(function(response) {
      console.log(response);
    })

    // find the way to grap userID from sessionstorage
    // productID from product(tinderCard)
    swipe.addToUserLike($scope.currentCard._id, $scope.userInfo._id).then(function(response){
      console.log(response);
    })
    $window.location.href = ('#/app/chat');
  };

  $scope.view = function() {
    $window.location.href = ('#/app/view');
  };
})
