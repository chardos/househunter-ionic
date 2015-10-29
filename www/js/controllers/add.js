houseHunter.controller('AddCtrl', function($scope, $state, Camera) {

  // THIS CONTROLLER IS SHARED BY ADD AND EDIT

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageData) {
      document.getElementById('photo').src = "data:image/jpeg;base64," + imageData;
      document.querySelector('.js-add-photo-btn').style.display = 'none';

    }, function(err) {
      console.err(err);
    });
  };

  $scope.openCompass = function() {
    $state.go('compass');
  }

  if ($state.params.address) {
    $scope.currProp = JSON.parse( window.localStorage[$state.params.address] );
    console.log($scope.currProp);
  };

  function createHash(){
    var property = {
      imageURL: document.getElementById('photo').src,
      address: $('#address-input').val(),
      price: $('#price-input').val(),
      body_corp: $('#body-corp-input').val(),
      indoor_area: $('#indoor-area-input').val(),
      outdoor_area: $('#outdoor-area-input').val(),
      orientation: $('#orientation-area-input').val(),
      rating: $('#rating-input').val(),
      notes: $('#notes-input').val()
    }
    console.log(property);
    return property;
  }

  function clearInputs(){
    var wrap = document.querySelector('.PropertyInputs');
    var inputs = wrap.querySelectorAll('input');
    [].forEach.call(inputs, function(input) {
      input.value = '';
    });
  }

  // Close the new task modal
  $scope.saveProperty = function() {
    var property = createHash();
    window.localStorage[property.address] = JSON.stringify(property);
    myDataRef.child(property.address).set( property ); 
    $state.go('list');

    clearInputs()
    
  };

  $scope.updateProperty = function() {
    var property = createHash();
    window.localStorage[property.address] = JSON.stringify(property);
    myDataRef.child(property.address).set( property ); 
    $state.go('list');
    clearInputs()
  }


})