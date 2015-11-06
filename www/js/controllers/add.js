houseHunter.controller('AddCtrl', function($scope, $state, Camera, sharedProperties) {
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



  function createHash(){
    var property = {
      imageURL: document.getElementById('photo').src,
      address: $('#address-input').val(),
      price: $('#price-input').val(),
      body_corp: $('#body-corp-input').val(),
      council_rates: $('#council-rates-input').val(),
      indoor_area: $('#indoor-area-input').val(),
      outdoor_area: $('#outdoor-area-input').val(),
      orientation: $('#orientation-input').val(),
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
    alert('yea')
    clearInputs()
    
  };

  $scope.updateProperty = function() {
    var property = createHash();
    window.localStorage[property.address] = JSON.stringify(property);
    myDataRef.child(property.address).set( property ); 
    $state.go('list');
    clearInputs()
  }

  // ==============================
  // EDIT PAGE SPECIFIC
  // ==============================

  //edit page population
  if ($state.params.address) {
    $scope.currProperty = JSON.parse( window.localStorage[$state.params.address] );
    console.log($scope.currProperty);
  };


  // ==============================
  // COMPASS
  // ==============================
 
  // COMPASS : ADD ORIENTATION

  $scope.$on('$ionicView.enter', function() {
    var orientation = sharedProperties.getProperty();
    document.getElementById('orientation-input').value = orientation
    sharedProperties.setProperty('')
  });


})