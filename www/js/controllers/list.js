houseHunter.controller('ListCtrl', function($scope, $state) {

  $scope.showProperties = function(){
    $scope.properties = [];
    for (var i = 0; i < localStorage.length; i++){
      var parsed = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      $scope.properties.push( parsed );
    }
  }
  $scope.showProperties();

  $scope.whichProperty=$state.params.address;


  $scope.doRefresh = function(){
    $scope.showProperties();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.deleteProperty = function(item){
    delete localStorage[item.address];
    $scope.showProperties();
  }
  $scope.listCanSwipe = true;
  myDataRef.on("value", function(snapshot) {
    var properties = snapshot.val()
    for (var key in properties) {
      var property = properties[key];
      console.log(property.address);
      console.log(property.price);
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
})