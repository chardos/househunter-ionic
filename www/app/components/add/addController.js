// jshint asi:true
houseHunter.controller('AddCtrl', function($scope, $state, Camera, compassService, $ionicModal) {
  // THIS CONTROLLER IS SHARED BY ADD AND EDIT
  var uid = myDataRef.getAuth().uid;

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageData) {
      document.getElementById('photo').src = "data:image/jpeg;base64," + imageData;
      document.querySelector('.js-add-photo-btn').style.display = 'none';

    }, function(err) {
      console.err(err);
    });
  };

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
    myDataRef.child("users").child(uid).child(property.address).set( property ); 
    $state.go('list');
    clearInputs()
    
  };

  $scope.updateProperty = function() {
    var property = createHash();
    window.localStorage[property.address] = JSON.stringify(property);
    myDataRef.child("users").child(uid).child(property.address).set( property ); 
    $state.go('list');
    clearInputs()
  }

  // ==============================
  // EDIT PAGE SPECIFIC
  // ==============================

  //edit page population
  if ($state.params.address) {
    $scope.currProperty = JSON.parse( window.localStorage[$state.params.address] );
  }


  // ==============================
  // COMPASS
  // ==============================
 
  //COMPASS MODAL

  $ionicModal.fromTemplateUrl('app/components/compass/compassView.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
    compassService.setRunCompass(true);
    compassService.updateCompass();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    compassService.setRunCompass(false);
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


})