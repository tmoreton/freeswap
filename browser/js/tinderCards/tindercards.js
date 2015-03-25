app.config(function($stateProvider) {
  $stateProvider.state('app.swap', {
    url: "/swap",
    views: {
      'menuContent': {
        templateUrl: "js/tinderCards/tindercards.html",
        controller: 'CardsCtrl'
      }
    }
  })

})

app.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

app.controller('CardsCtrl', function($scope, TDCardDelegate, AuthService) {
  // console.log('CARDS CTRL');

  AuthService.getLoggedInUser().then(
    function(data) {
      console.log("Auth service", data);
      $scope.userData = data;
  });

  var cardTypes = [
    { image: 'http://www.midsouth.com/files/MAC_computer_sales_service_midsouth.com---4-.jpg' },
    { image: 'http://2k13.konaworld.com/images/bikes/hires/lanai.jpg' },
    { image: 'http://ccticketnotifier.com/images/tickets.png' },
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    // $scope.cards.push(angular.extend({}, newCard));
  };
    // console.log('single CARD CTRL');
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
    $scope.userData.dislikes.push(cardTypes[0]);
    console.log($scope.userData);
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };

})
