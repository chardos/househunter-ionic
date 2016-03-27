houseHunter.controller('RegisterCtrl', function($scope, $state) {

  $scope.register = function() {
    var email = $('#registrationEmail').val();
    var pass = $('#registrationPassword').val();

    $.ajax({
      url: "http://localhost:3000/api/users",
      method: 'POST',
      contentType: 'application/json',
      accepts: 'application/json',
      data: JSON.stringify({
        "user":{
          "email": email,
          "password": pass,
          "password_confirmation": pass
        }
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

    //on submit click, populate these with the vals of inputs
    // window.myDataRef.createUser({
    //   email    : email,
    //   password : pass
    // }, function(error, userData) {
    //   if (error) {
    //     alert("Login Failed!" + error);
    //   } else {
    //     localStorage.clear();
    //     $state.go('list');
    //     console.log("Successfully created user account with uid:", userData.uid);
    //   }
    // });
  }

})
