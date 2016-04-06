// jshint asi:true
houseHunter.controller('AddCtrl', function($scope, $state, Camera, compassService, $ionicModal, propertyService, addService) {
  // THIS CONTROLLER IS SHARED BY ADD AND EDIT

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageData) {
      document.getElementById('photo').src = "data:image/jpeg;base64," + imageData;
      document.querySelector('.js-add-photo-btn').style.display = 'none';

    }, function(err) {
      console.err(err);
    });
  };



  function clearInputs(){
    var wrap = document.querySelector('.PropertyInputs');
    var inputs = wrap.querySelectorAll('input');
    [].forEach.call(inputs, function(input) {
      input.value = '';
    });
  }

  // Close the new task modal
  $scope.saveProperty = function() {
    var property = addService.createHash();
    addService.saveToDB(property);
    $state.go('list');
    clearInputs()
  };


  // ==============================
  // EDIT PAGE SPECIFIC
  // ==============================
  $scope.updateProperty = function() {
    var updatedProperty = addService.createHash();
    addService.updateLocal(updatedProperty);
    addService.updateDB(updatedProperty);

    $state.go('list');
    clearInputs()
  }

  //edit page population
  if ($state.params.id) {
    var properties = JSON.parse(localStorage.properties);
    var property = properties.filter(function(x){
      return x.id == $state.params.id;
    });
    $scope.currProperty = property[0];
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
