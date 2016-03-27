
houseHunter.controller('LoginCtrl', function($scope, $state) {
  if ( window.myDataRef && myDataRef.getAuth() ) {
    $state.go('list');
  }

  $scope.login = function() {
    var email = $('#loginEmail').val();
    var pass = $('#loginPassword').val();
    window.justLoggedIn = true;

    $.ajax({
      url: "http://localhost:3000/api/sessions",
      method: 'POST',
      contentType: 'application/json',
      accepts: 'application/json',
      data: JSON.stringify({
          "email": email,
          "password": pass
      })
    })
    .done(function( data ) {
      localStorage.token = data.auth_token;
      $state.go('list');
      console.log(data)
    })
    .error(function(err){
      console.log(err.responseText);
    });


    // window.myDataRef.authWithPassword({
    //   email    : email,
    //   password : pass
    // }, function(error, authData) {
    //   if (error) {
    //     alert("Login Failed!" + error);
    //   } else {
    //     $state.go('list');
    //     console.log("Authenticated successfully with payload:", authData);
    //   }
    // });

  };


})
