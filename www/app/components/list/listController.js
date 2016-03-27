// jshint asi:true
houseHunter.controller('ListCtrl', function($scope, $state) {
  console.log('Listing controller reloaded');


  //PULL FROM DATABASE
  $scope.syncLocalToDb = function(){
    // console.log('YEP SYNCING');
    // //Throw user back to login in if not authorized
    // if ( myDataRef.getAuth() ) {
    //   var uid = myDataRef.getAuth().uid;
    // }
    // else{
    //   $state.go('login');
    // }
    //
    // var userRef = new Firebase('https://amber-fire-5681.firebaseio.com/users/' + uid);
    // userRef.on('value', function(snapshot){ //retrieve from db
    //   localStorage.clear();
    //   $scope.properties = [];
    //   var properties = snapshot.val()
    //
    //   for (var key in properties) {
    //     var property = properties[key];
    //     window.localStorage[property.address] = JSON.stringify(property);
    //     console.log('SHOWING DB');
    //     console.log(property);
    //     $scope.properties.push( property );
    //     $state.go('list');
    //   }
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

    //replace local storage

  }



  $scope.showLocalProperties = function(){
    console.log('localprops');
    // $scope.properties = [];
    // for (var i = 0; i < localStorage.length; i++){
    //   var parsed = JSON.parse( localStorage.getItem(localStorage.key(i)) );
    //   if( typeof parsed == 'object' ){
    //     $scope.properties.push( parsed );
    //   }
    // }
  }

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

  $scope.listCanSwipe = true;

  //SYNC LOCAL TO DB IF THIS IS FIRST OPEN ? DO A COUNT HERE?
  if(window.justLoggedIn){
    console.log('sync to db');
    $scope.syncLocalToDb();
    window.justLoggedIn = false;
  }
  else{
    $scope.showLocalProperties();
  }

  $scope.logout = function(){
    window.myDataRef.unauth();
    $state.go('login');
  }


})
