houseHunter.controller('AddCtrl', function($scope, $state, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageData) {
      document.getElementById('photo').src = "data:image/jpeg;base64," + imageData;
      document.querySelector('.js-add-photo-btn').style.display = 'none';

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
      indoor_area: document.getElementById('indoor-area-input').value,
      outdoor_area: document.getElementById('outdoor-area-input').value,
      orientation: document.getElementById('outdoor-area-input').value,
      rating: document.getElementById('rating-input').value,
      notes: document.getElementById('notes-input').value
    }
    window.localStorage[property.address] = JSON.stringify(property);
    myDataRef.child(property.address).set( property ); 
    $state.go('list');

    //clear the inputs
    var wrap = document.querySelector('.PropertyInputs');
    var inputs = wrap.querySelectorAll('input');
    [].forEach.call(inputs, function(input) {
      input.value = '';
    });
  };

  


})