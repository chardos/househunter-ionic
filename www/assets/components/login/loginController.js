

houseHunter.controller('LoginCtrl', function($scope, $state) {

  $(document).on('click', '.js-login', function(){
    var email = $('#loginEmail').val();
    var pass = $('#loginPassword').val();

    window.myDataRef.authWithPassword({
      email    : email,
      password : pass
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  })

})