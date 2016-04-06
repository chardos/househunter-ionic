// jshint asi:true
houseHunter.controller('ListCtrl', function($rootScope, $scope, $state, syncService, listService) {
  $scope.propertyId=$state.params.id;

  $scope.goAdd = function(){
    $state.go('add');
  }
  $scope.goEvents = function(){
    $state.go('events');
  }
  $scope.toggleMenu = function(){
    $('.Menu').toggleClass('m-shown ')
  }

  $scope.doRefresh = function(){
    listService.pullFromDB($scope);
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.deleteProperty = function(item){
    listService.deleteProperty(item);
  }

  //allow swipe for deletion
  $scope.listCanSwipe = true;

  //DISPLAY PROPERTIES
  listService.getIndex();

  $scope.logout = function(){
    localStorage.token = '';
    $state.go('login');
  }


})
