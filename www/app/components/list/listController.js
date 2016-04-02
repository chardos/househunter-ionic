// jshint asi:true
houseHunter.controller('ListCtrl', function($scope, $state) {
  console.log('Listing controller reloaded');


  //PULL FROM DATABASE
  $scope.pullFromDB = function(){
    console.log('YEP SYNCING');
    //Throw user back to login in if not authorized

    $.ajax({
      url: "http://localhost:3000/api/properties",
      method: 'GET',
      headers: {
        Authorization: localStorage.token
      }
    })
    .done(function( data ) {
      var properties = data;
      console.log(properties);
      console.log(typeof properties);
      $scope.properties = properties;
    });

  }


  $scope.whichProperty=$state.params.address;


  $scope.doRefresh = function(){
    $scope.pullFromDB();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    $.ajax({
      url: "http://localhost:3000/api/properties/"+item.id+".json",
      method: 'DELETE',
      headers: {
        Authorization: localStorage.token
      }
    })
    $('[data-property-id='+item.id+']').parent().remove();
  }

  $scope.listCanSwipe = true;

  $scope.pullFromDB();

  $scope.logout = function(){
    localStorage.token = '';
    $state.go('login');
  }


})
