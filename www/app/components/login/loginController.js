
houseHunter.controller('LoginCtrl', function($scope, $state) {
  if ( window.myDataRef && myDataRef.getAuth() ) {
    $state.go('list');
  }

  $scope.login = function() {
    var email = $('#loginEmail').val();
    var pass = $('#loginPassword').val();
    window.justLoggedIn = true;

    window.myDataRef.authWithPassword({
      email    : email,
      password : pass
    }, function(error, authData) {
      if (error) {
        alert("Login Failed!" + error);
      } else {
        $state.go('list');
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    
  };


})