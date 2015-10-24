houseHunter.controller('ListCtrl', function($scope, $state) {

  $scope.syncLocalToDb = function(){
    localStorage.clear();
      console.log('SYNCING FROM DB');
    //replace local storage
    for (var key in $scope.properties) {
      var property = $scope.properties[key];
      window.localStorage[property.address] = JSON.stringify(property);
    }
  }
  $scope.showLocalProperties = function(){
    $scope.properties = [];
    for (var i = 0; i < localStorage.length; i++){
      var parsed = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      if( typeof parsed == 'object' ){
        $scope.properties.push( parsed );
      }
      console.log(parsed);
      console.log('SHOWING LOCAL');
    }
  }
  $scope.showDatabaseProperties = function(){
    $scope.properties = [];
    myDataRef.on("value", function(snapshot) { //retrieve from db
      var properties = snapshot.val()
      for (var key in properties) {
        var property = properties[key];
        console.log('SHOWING DB');
        console.log(property);
        $scope.properties.push( property );
      }
      $scope.syncLocalToDb();

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
    myDataRef.child(item.address).remove()
  }
  $scope.listCanSwipe = true;
  
})