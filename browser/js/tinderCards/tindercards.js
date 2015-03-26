app.config(function($stateProvider) {
  $stateProvider.state('app.swap', {
    url: "/swap",
    controller: 'CardsCtrl',
    views: {
      'menuContent': {
        templateUrl: "js/tinderCards/tindercards.html"
      }
    }
    // resolve: {
    //   user: function(user) {

    //   }
    // }
  })
})

app.controller('CardsCtrl', function($scope, TDCardDelegate, AuthService, swipe, user, productFactory) {

  user.info().then(function(user) {
    $scope.userInfo = user;
    console.log(user);
  })

  var cardTypes = [
    { image: 'http://www.midsouth.com/files/MAC_computer_sales_service_midsouth.com---4-.jpg',
      location: 'New York'},
    { image: 'http://2k13.konaworld.com/images/bikes/hires/lanai.jpg',
      location: 'New York' },
    { image: 'http://ccticketnotifier.com/images/tickets.png',
      location: 'New York' },
  ];

  // get card from DB 

  productFactory.getData().then(function(data){
    $scope.cardfromDb = data;
  })


  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = '5511b521a44a6ba7c7d360bf'; //TEMPORARY DEVELOPMENT PURPOSES
    newCard.sellerId = '5511b521a44a6ba7c7d360bf'; //TEMPORARY DEVELOPMENT PURPOSES
    return newCard;
    // $scope.cards.push(angular.extend({}, newCard));
  };
  


    // console.log('single CARD CTRL');
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.currentCard = $scope.addCard();
    swipe.dislike($scope.currentCard.id,$scope.userInfo._id)
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.currentCard = $scope.addCard();
    swipe.like($scope.currentCard.id, $scope.currentCard.sellerId, $scope.userInfo._id).then(function(response) {
      console.log(response);
    })
  };

})
