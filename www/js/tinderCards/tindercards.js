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
  $scope.currentCard = cards[cards.length-1]; // Cards displayed are indexed from end of Array

  console.log('Retrieved Cards', cards);
  console.log('Current Card', $scope.currentCard)




  function destroyCurrentCard() {
    $scope.cards.splice($scope.cards.length-1, 1);
  };

  function addCard() {
    destroyCurrentCard();
    $scope.currentCard = $scope.cards[$scope.cards.length-1];
    console.log('Current Card',$scope.currentCard)
  };

  $scope.cardSwipedLeft = function() {
    console.log('LEFT SWIPE');

    // swipe.dislike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
    //   console.log(response);
    // })
    addCard();
  };

  $scope.cardSwipedRight = function() {
    console.log('RIGHT SWIPE');

    swipe.addToUserLike($scope.currentCard._id, $scope.userInfo._id).then(function(response){
      console.log(response);
    })
    swipe.createMatch($scope.currentCard, $scope.userInfo)
    addCard();

    // $window.location.href = ('#/app/chat');
  };

  $scope.view = function() {
    $window.location.href = ('#/app/view');
  };
})
