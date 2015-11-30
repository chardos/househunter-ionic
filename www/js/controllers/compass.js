// jshint asi:true
houseHunter.controller('CompassCtrl', function($scope, $state, compassService) {

  $scope.back = function(){
    $scope.closeModal();
  }

  $scope.saveOrientation = function(){
    $scope.closeModal();
    var orientation = compassService.word + '('+parseInt(compassService.degrees)+'°)'
    $('#orientation-input').val(orientation);
  }

  
})


