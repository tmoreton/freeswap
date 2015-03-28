'use strict';

app.factory('platformFactory', function(){
  return {
    platform: function(){
       // ionic.Platform.ready(function(){
        var url = "https://freeswap.herokuapp.com/#/api/users"
        var deviceInformation = ionic.Platform.device();
        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
        var currentPlatform = ionic.Platform.platform();
        console.log("current platform", currentPlatform)
        console.log("web view", isWebView)
        console.log("androidview ", isAndroid)
        if (currentPlatform == isWebView) {
          return "";
        } else {
          return url;
        }
      // });
    }
  }
})
