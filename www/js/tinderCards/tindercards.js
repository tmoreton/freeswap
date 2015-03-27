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
    console.log('User Information',user);
  })


// get data, push it to cardTypes, set it as cards, 
// in html, call it with {{card.image}} / {{ card.location}} 
// {{ card.title }} // {{ card.description }}
  
  var cardTypes = [
    { image: 'http://images.craigslist.org/00R0R_jAy9qRyxuR6_300x300.jpg' },
    { image: 'http://2k13.konaworld.com/images/bikes/hires/lanai.jpg' },
    { image: 'http://ccticketnotifier.com/images/tickets.png' },
    { image: 'http://images.craigslist.org/00R0R_jAy9qRyxuR6_300x300.jpg' },
    { image: 'http://images.craigslist.org/00y0y_aT3GSujAQOX_300x300.jpg' }
  ];

  // $scope.cards = Array.prototype.slice.call(cardTypes, 0);


  // get Card from DB
 
  productFactory.getData().then(function(data){
    $scope.cards = data;
  });


  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  // I assume addcCard function doesn't do anything? - Sehwan
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
    swipe.dislike($scope.currentCard.id,$scope.userInfo._id).then(function(response) {
      console.log(response);
    })
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.currentCard = $scope.addCard();
    swipe.like($scope.currentCard.id, $scope.currentCard.sellerId, $scope.userInfo._id).then(function(response) {
      console.log(response);
    })
  };
})
