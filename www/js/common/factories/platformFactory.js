'use strict';

app.factory('platformFactory', function($scope){
  return {
    platform: function(){
       ionic.Platform.ready(function(){
        var url = "https://freeswap.herokuapp.com/#/"
        var deviceInformation = ionic.Platform.device();
        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
        var currentPlatform = ionic.Platform.platform();

        if (currentPlatform == isWebView) {
          return null;
        } else {
          return url;
        }
      });
    }
  }
})
