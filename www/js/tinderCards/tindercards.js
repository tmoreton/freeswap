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
      },
      cards: function(userInfo, productFactory) {
        return productFactory.getAvailableData(userInfo);
      }
    }
  })
})

app.controller('CardsCtrl', function($scope, $window, TDCardDelegate, AuthService, swipe, user, productFactory, userInfo, cards) {
  // get Current User info
  $scope.userInfo = userInfo;
  console.log('Current User Info',$scope.userInfo)

  // get all cards excluding "likes" array, and swapped
  $scope.cards = cards;
  $scope.currentCard = cards[0];

  console.log('Retrieved Cards', cards);
  console.log('Current Card', $scope.currentCard)




  function destroyCurrentCard() {
    $scope.cards.splice(0, 1);
  };

  function addCard() {
    destroyCurrentCard();
    $scope.currentCard = $scope.cards[0];
    console.log('Current Card',$scope.currentCard)
    console.log('Remaining Cards', $scope.cards.length, $scope.cards)
    console.log()
  };

  $scope.cardSwipedLeft = function() {
    console.log('LEFT SWIPE');

    swipe.addToUserDislike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
      console.log('Item successfully added to user dislikes');
    })
    addCard();
  };

  $scope.cardSwipedRight = function() {
    console.log('RIGHT SWIPE');

    swipe.addToUserLike($scope.currentCard._id, $scope.userInfo._id).then(function(response){
      console.log('Item successfully added to user likes');
    })
    swipe.createMatch($scope.currentCard, $scope.userInfo)
    addCard();

    // $window.location.href = ('#/app/chat');
  };

  $scope.view = function() {
    $window.location.href = ('#/app/view');
  };
})
