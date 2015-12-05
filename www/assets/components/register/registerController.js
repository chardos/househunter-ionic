houseHunter.controller('RegisterCtrl', function($scope, $state) {

  $(document).on('click', '.js-register', function(){
    var email = $('#registrationEmail').val();
    var pass = $('#registrationPassword').val();

    //on submit click, populate these with the vals of inputs
    window.myDataRef.createUser({
      email    : email,
      password : pass
    }, function(error, userData) {
      if (error) {
        alert("Login Failed!" + error);
      } else {
        $state.go('list');
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  })

})