// jshint asi:true
houseHunter.controller('CompassCtrl', function($scope, $state, sharedProperties) {

  $scope.back = function(){
    $scope.closeModal();
  }

  $scope.saveOrientation = function(){
    $scope.closeModal();
    var orientation = sharedProperties.word + '('+parseInt(sharedProperties.degrees)+'°)'
    $('#orientation-input').val(orientation);
  }

  
})


