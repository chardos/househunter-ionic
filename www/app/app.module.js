// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// jshint asi:true

var houseHunter = angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $state) {
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

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/components/login/loginView.html',
    cache: false
  })
  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'app/components/register/registerView.html',
    cache: false
  })
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'app/components/list/listView.html',
    cache: false
  })

  $stateProvider.state('detail', {
    url: '/list/:address',
    templateUrl: 'show.html',
    cache: false
  })

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'app/components/add/addView.html',
    cache: false
  })

  $stateProvider.state('edit', {
    url: '/edit/:address',
    templateUrl: 'edit.html',
    cache: false
  })

  $stateProvider.state('compass', {
    url: '/compass',
    templateUrl: 'app/components/compass/compassView.html'
  })

  //$urlRouterProvider.otherwise('/list')
  $urlRouterProvider.otherwise('/login')

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



