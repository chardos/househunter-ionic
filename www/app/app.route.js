houseHunter.config(function($stateProvider, $urlRouterProvider) {

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
    url: '/list/:id',
    templateUrl: 'app/components/show/showView.html',
    cache: false
  })

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'app/components/add/addView.html',
    cache: false
  })

  $stateProvider.state('edit', {
    url: '/edit/:id',
    templateUrl: 'edit.html',
    cache: false
  })

  $stateProvider.state('compass', {
    url: '/compass',
    templateUrl: 'app/components/compass/compassView.html'
  })

  $stateProvider.state('events', {
    url: '/events',
    templateUrl: 'app/components/events/listView.html'
  })

  $urlRouterProvider.otherwise('/login')
  //$urlRouterProvider.otherwise('/test')
  //$urlRouterProvider.otherwise('/test')

})
