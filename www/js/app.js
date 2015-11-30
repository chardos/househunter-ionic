// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// jshint asi:true

var houseHunter = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    ionic.Platform.fullScreen()
    if(window.StatusBar) {
      StatusBar.hide();
    }

    window.myDataRef = new Firebase('https://amber-fire-5681.firebaseio.com/');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'list.html',
    cache: false
  })

  $stateProvider.state('detail', {
    url: '/list/:address',
    templateUrl: 'show.html',
    cache: false
  })

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'add.html',
    cache: false
  })

  $stateProvider.state('edit', {
    url: '/edit/:address',
    templateUrl: 'edit.html',
    cache: false
  })

  $stateProvider.state('compass', {
    url: '/compass',
    templateUrl: 'compass.html'
  })

  //$urlRouterProvider.otherwise('/list')
  $urlRouterProvider.otherwise('/list')

})

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function() {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, {
        targetWidth: 640,
        targetHeight: 480,
        saveToPhotoAlbum: true,
        destinationType : Camera.DestinationType.DATA_URL
      });

      return q.promise;
    }
  }
}])

.service('sharedProperties', function () {
  var property = '';
  var runCompass = false;

  function degreesToWord(deg){ 
    if(deg > 360 - 22.5 || deg < 0 + 22.5){
      return 'North'
    }
    else if(deg > 45 - 22.5 && deg < 45 + 22.5){
      return 'Northeast'
    }
    else if(deg > 90 - 22.5 && deg < 90 + 22.5){
      return 'East'
    }
    else if(deg > 135 - 22.5 && deg < 135 + 22.5){
      return 'Southeast'
    }
    else if(deg > 180 - 22.5 && deg < 180 + 22.5){
      return 'South'
    }
    else if(deg > 225 - 22.5 && deg < 225 + 22.5){
      return 'Southwest'
    }
    else if(deg > 270 - 22.5 && deg < 270 + 22.5){
      return 'West'
    }
    else if(deg > 315 - 22.5 && deg < 315 + 22.5){
      return 'Northwest'
    }
  }

  function onSuccess(heading) {
    cmp.degrees = heading.magneticHeading;
    cmp.word = degreesToWord(cmp.degrees)
    $('.js-degrees').html(Math.round(cmp.degrees));
    $('.js-direction').html(cmp.word)
    $('.Compass-arrow').css(
      'transform', 
      'rotate('+(heading.magneticHeading * -1)+'deg)'
    )
  }

  function onError(error) {
    $('.js-degrees').html('CompassError: ' + error.code)
  }


  var cmp = {
    word: null,
    degrees: null,
    getProperty: function () {
      return property;
    },
    setProperty: function(value) {
      property = value;
    },
    setRunCompass: function(value) {
      runCompass = value;
    },

    updateCompass: function(){
      setTimeout(function(){
        if(navigator.compass){
          navigator.compass.getCurrentHeading(onSuccess, onError);
          if(runCompass === true){
            cmp.updateCompass();
          }
        }
      },50)
    }

  };

  return cmp;

});


