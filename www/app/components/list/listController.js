// jshint asi:true
houseHunter.controller('ListCtrl', function($scope, $state, syncService, listService) {

  //PULL FROM DATABASE
  $scope.pullFromDB = function(){
    var properties = listService.pullFromDB($scope);
  }

  $scope.propertyId=$state.params.id;

  $scope.doRefresh = function(){
    $scope.pullFromDB();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    listService.deleteProperty(item);
  }

  $scope.listCanSwipe = true;

  $scope.pullFromDB();

  $scope.logout = function(){
    localStorage.token = '';
    $state.go('login');
  }


})
