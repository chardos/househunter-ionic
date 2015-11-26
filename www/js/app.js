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
    alert('yo')
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

  return {
    getProperty: function () {
      return property;
    },
    setProperty: function(value) {
      property = value;
    }
  };
});


