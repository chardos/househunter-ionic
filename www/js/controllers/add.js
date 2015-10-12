houseHunter.controller('AddCtrl', function($scope, $state, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      document.getElementById('photo').src = imageURI
    }, function(err) {
      console.err(err);
    });
  };

  // Close the new task modal
  $scope.saveProperty = function() {
    var property = {
      imageURL: document.getElementById('photo').src,
      address: document.getElementById('address-input').value,
      price: document.getElementById('price-input').value,
      body_corp: document.getElementById('body-corp-input').value,
      rating: document.getElementById('rating-input').value,
      notes: document.getElementById('notes-input').value
    }
    window.localStorage[property.address] = JSON.stringify(property);
    $state.go('list');

    //clear the inputs
    var wrap = document.querySelector('.PropertyInputs');
    var inputs = wrap.querySelectorAll('input');
    [].forEach.call(inputs, function(input) {
      input.value = '';
    });
  };

  


})