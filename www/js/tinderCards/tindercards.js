app.config(function($stateProvider) {
  $stateProvider.state('app.swap', {
    url: "/swap",
    views: {
      'menuContent': {
        templateUrl: "js/tinderCards/tindercards.html",
        controller: 'CardsCtrl'
      }
    },
    resolve: { 
      userInfo: function(user) {
        return user.info();
      }
    }
  })
})

app.controller('CardsCtrl', function($scope, $window, TDCardDelegate, AuthService, swipe, user, productFactory, userInfo) {
  // get Current User info
  $scope.userInfo = userInfo;
  console.log('Current User Info',$scope.userInfo)


  // get cards from DB that doesn't contain anything in "likes" array, and swapped
  productFactory.getAvailableData($scope.userInfo).then(function(cards){
    $scope.cards = cards;
    console.log('Current Cards',cards);
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
