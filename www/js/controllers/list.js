houseHunter.controller('ListCtrl', function($scope, $state) {

  $scope.showLocalProperties = function(){
    $scope.properties = [];
    for (var i = 0; i < localStorage.length; i++){
      var parsed = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      $scope.properties.push( parsed );
    }
  }
  $scope.showDatabaseProperties = function(){
    $scope.properties = [];
    myDataRef.on("value", function(snapshot) {
      var properties = snapshot.val()
      for (var key in properties) {
        var property = properties[key];
        $scope.properties.push( property );
      }
      //delete local storage

      //replace local storage

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  $scope.showLocalProperties();

  $scope.whichProperty=$state.params.address;


  $scope.doRefresh = function(){
    $scope.showDatabaseProperties();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    delete localStorage[item.address];
    $scope.showLocalProperties();
  }
  $scope.listCanSwipe = true;
  
})