app.config(function($stateProvider) {
  $stateProvider.state('app.swap', {
    url: "/swap",
    authenticate: true,
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


app.controller('CardsCtrl', function($scope, $rootScope, $window, $ionicModal, TDCardDelegate, AuthService, swipe, user, productFactory, userInfo, cards, chat, $firebaseObject, $ionicPopup) {
  $scope.createRoom = chat.createRoom;
  $scope.userInfo = userInfo;
  $scope.cards = cards.reverse();
  $scope.currentCard = cards[0];

  console.log('Current User', userInfo)
  console.log('Retrieved Cards', cards);
  console.log('Current Card', $scope.currentCard);

  function destroyCurrentCard() {
    $scope.cards.splice(0, 1);
  };

  function addCard() {
    destroyCurrentCard();
    // if ($scope.cards.length > 0) {
    $scope.currentCard = $scope.cards[0];
    console.log('Current Card', $scope.currentCard)
    console.log($scope.cards.length, ' Remaining Cards', $scope.cards)
      // }
      // else {
      //   productFactory.getAvailableData(userInfo).then(function(newCards) {
      //     $scope.cards = newCards;
      //     $scope.currentCard = newCards[0];
      //     console.log('Retrieved' + newCards.length+ ' cards', newCards);
      //     console.log('Current Card', $scope.currentCard);
      //   })
      // }
  };

  $scope.cardSwipedLeft = function() {
    console.log('LEFT SWIPE');

    swipe.addToUserDislike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
      console.log('Item successfully added to user dislikes');
    })
    addCard();
  };

  $scope.skipCard = function() {
    destroyCurrentCard();
    $scope.currentCard = $scope.cards[0];
    console.log('Current Card', $scope.currentCard)
  };

  $scope.cardSwipedRight = function() {
    console.log('RIGHT SWIPE');

    swipe.addToUserLike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
      console.log('Item successfully added to user likes');
    })

    swipe.createMatch($scope.currentCard, $scope.userInfo).then(function(matchResponse) {
      var swipedCard = $scope.currentCard;
      if (swipedCard.seller) {
        (function() {
          $scope.data = {}
          $scope.data.message = 'Hi! I\'m interested in your product! Can we meet?'

          var myPopup = $ionicPopup.show({
            template: '<textarea ng-model="data.message">',
            title: 'Send Message',
            subTitle: 'You can also a message them later!',
            scope: $scope,
            buttons: [{
              text: 'Message Later',
              onTap: function(e) {
                $scope.data.from = 'Free-Swap Admin';
                $scope.data.message = 'Room created';
                return $scope.data;
              }
            }, {
              text: '<b>Send</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.message) {
                  //don't allow the user to close unless they write something
                  e.preventDefault();
                } else {
                  $scope.data.from = $scope.userInfo.username;
                  return $scope.data;
                }
              }
            }]
          });
          myPopup.then(function(data) {
            $scope.createRoom[matchResponse._id] = [{
              from: data.from,
              content: data.message
            }];
            return $scope.createRoom.$save().then(function(fbResponse) {
              console.log('Saved to Firebase');
            }).catch(function(err) {
              console.log('Firebase error',err)
            });
          });
        })();
      } else {
        (function() {
          var myPopup = $ionicPopup.show({
            title: 'Craigslist Url',
            subTitle: 'Note: This will take you to an external link',
            scope: $scope,
            buttons: [{
              text: 'Try Later'
            }, {
              text: '<b>Go!</b>',
              type: 'button-positive',
              onTap: function(e) {
                return swipedCard.productUrl;
              }
            }]
          });
          myPopup.then(function(data) {
            if (data) $window.open(data)
          })
        })();
      };
    addCard();
    });

  };

  $ionicModal.fromTemplateUrl('js/view/view.html', {
    scope: $scope,
    animation: 'slide-in-up',
    controller: 'CardsCtrl'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
    productFactory.getProduct($scope.currentCard._id).then(function(product) {
      $scope.productDetails = product;
      console.log(product);
    })
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(show_map);
    function show_map(position) {
      $scope.long = position.coords.longitude;
      $scope.lat = position.coords.latitude;
      $rootScope.coordinates = [position.coords.longitude, position.coords.latitude];
      console.log("coordinates", $rootScope.coordinates)
    }
  }
})
