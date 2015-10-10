app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'index.html',
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