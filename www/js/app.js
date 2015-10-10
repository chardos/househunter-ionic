// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/list')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'index.html',
    cache: false
  })

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'list.html',
    cache: false
  })

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'add.html'
  })

  $stateProvider.state('show', {
    url: '/show/:address',
    templateUrl: 'show.html'
  })
})

.controller('ListCtrl', function($scope, $state) {

  $scope.showProperties = function(){
    $scope.properties = [];
    for (var i = 0; i < localStorage.length; i++){
      var parsed = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      $scope.properties.push( parsed );
    }
  }
  $scope.showProperties();

  $scope.doRefresh = function(){
    $scope.showProperties();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.goToDetail = function(){
    $state.go('show/:address', {address: '123'});
  }

  $scope.deleteProperty = function(item){
    delete localStorage[item.address];
    $scope.showProperties();
  }
  $scope.listCanSwipe = true;
})

.controller('AddCtrl', function($scope, $state) {
  // Close the new task modal
  $scope.saveProperty = function() {
    var property = {
      address: document.getElementById('address-input').value,
      price: document.getElementById('price-input').value,
      body_corp: document.getElementById('body-corp-input').value,
      rating: document.getElementById('rating-input').value,
      notes: document.getElementById('notes-input').value
    }
    window.localStorage[property.address] = JSON.stringify(property);
    $state.go('home');

    //clear the inputs
    var wrap = document.querySelector('.PropertyInputs');
    var inputs = wrap.querySelectorAll('input');
    [].forEach.call(inputs, function(input) {
      input.value = '';
    });
  };
})

.controller('ShowCtrl', function($scope) {
  //hi
  console.log($stateParams);
})

