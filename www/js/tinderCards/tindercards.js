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


app.controller('CardsCtrl', function($scope, $window, $ionicPopover, TDCardDelegate, AuthService, swipe, user, productFactory, userInfo, cards, chat, $firebaseObject, $ionicPopup) {
  $scope.createRoom = chat.createRoom;
  $scope.userInfo = userInfo;
  $scope.cards = cards;
  $scope.currentCard = cards[0];

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

    // swipe.addToUserDislike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
    //   console.log('Item successfully added to user dislikes');
    // })
    addCard();
  };

  $scope.cardSwipedRight = function() {
    console.log('RIGHT SWIPE');

    swipe.addToUserLike($scope.currentCard._id, $scope.userInfo._id).then(function(response) {
      console.log('Item successfully added to user likes');
    })

    swipe.createMatch($scope.currentCard, $scope.userInfo).then(function(matchResponse) {
      if ($scope.currentCard.seller) {
        (function() {
          $scope.data = {}
          $scope.data.message = 'Hi! I\'m interested in your product! Can we meet?'

          var myPopup = $ionicPopup.show({
            template: '<textarea ng-model="data.message">',
            title: 'Send Message',
            subTitle: 'You can also message them later!',
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
                // if (!$scope.message) {
                //   //don't allow the user to close unless they write something
                //   e.preventDefault();
                // } else {
                  $scope.data.from = $scope.userInfo.username;
                  return $scope.data;
                // }
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
              console.log(err)
            });
          });
        })();
      } else {
        (function() {
          var myPopup = $ionicPopup.show({
            title: 'Craigslist Url',
            subTitle: $scope.currentCard.productUrl,
            scope: $scope,
            buttons: [{
              text: 'Try Later'
            }, {
              text: '<b>Go!</b>',
              type: 'button-positive',
              onTap: function(e) {
                return $scope.currentCard.productUrl;
              }
            }]
          });
          myPopup.then(function(data) {
            if (data) $window.location.href = data
          })
        })();
      };
    });

    addCard();
  };


  // $scope.view = function() {
  //   $window.location.href = ('#/app/view');
  // };

  // $ionicPopover.fromTemplateUrl('js/view/view.html', {
  //     scope: $scope
  //   }).then(function(popover) {
  //     $scope.popover = popover;
  //   });


  //   $scope.openPopover = function($event) {
  //     $scope.popover.show($event);
  //   };
  //   $scope.closePopover = function() {
  //     $scope.popover.hide();
  //   };
  //   //Cleanup the popover when we're done with it!
  //   $scope.$on('$destroy', function() {
  //     $scope.popover.remove();
  //   });
  //   // Execute action on hide popover
  //   $scope.$on('popover.hidden', function() {
  //     // Execute action
  //   });
  //   // Execute action on remove popover
  //   $scope.$on('popover.removed', function() {
  //     // Execute action
  //   });
})
