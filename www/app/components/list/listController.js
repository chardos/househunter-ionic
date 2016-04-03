// jshint asi:true
houseHunter.controller('ListCtrl', function($rootScope, $scope, $state, syncService, listService) {
  $scope.propertyId=$state.params.id;
  $scope.doRefresh = function(){
    $scope.pullFromDB();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    listService.deleteProperty(item);
  }

  //allow swipe for deletion
  $scope.listCanSwipe = true;

  //DISPLAY PROPERTIES
  if($rootScope.synced){
    listService.showProperties($scope);
  }
  else{
    listService.pullFromDB($scope);
    $rootScope.synced = true;
  }

  $scope.logout = function(){
    localStorage.token = '';
    $state.go('login');
  }


})
