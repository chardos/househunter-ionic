houseHunter.controller('ListCtrl', function($scope, $state) {

  console.log('Listing controller reloaded');

  $scope.syncLocalToDb = function(){
    console.log('SYNCING FROM DB');
    myDataRef.on("value", function(snapshot) { //retrieve from db
      localStorage.clear();
      $scope.properties = [];
      var properties = snapshot.val()
      for (var key in properties) {
        var property = properties[key];
        window.localStorage[property.address] = JSON.stringify(property);
        console.log('SHOWING DB');
        console.log(property);
        $scope.properties.push( property );
        $state.go('list');
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    //replace local storage

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

  $scope.showLocalProperties();
  $scope.whichProperty=$state.params.address;


  $scope.doRefresh = function(){
    $scope.syncLocalToDb();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    console.log('deleting');
    console.log(item.address);
    delete localStorage[item.address];
    $scope.showLocalProperties();
    myDataRef.child(item.address).remove()
  }
  console.log('$scope.properties');
  console.log($scope.properties);
  console.log(localStorage);
  $scope.listCanSwipe = true;
  
})