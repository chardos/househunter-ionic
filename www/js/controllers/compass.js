houseHunter.controller('CompassCtrl', function($scope, $state, sharedProperties) {
  runCompass = true;
  var degrees;
  var word;

  function degreesToWord(deg){
    if(deg > 360 - 22.5 || deg < 0 + 22.5){
      return 'North'
    }
    else if(deg > 45 - 22.5 && deg < 45 + 22.5){
      return 'Northeast'
    }
    else if(deg > 90 - 22.5 && deg < 90 + 22.5){
      return 'East'
    }
    else if(deg > 135 - 22.5 && deg < 135 + 22.5){
      return 'Southeast'
    }
    else if(deg > 180 - 22.5 && deg < 180 + 22.5){
      return 'South'
    }
    else if(deg > 225 - 22.5 && deg < 225 + 22.5){
      return 'Southwest'
    }
    else if(deg > 270 - 22.5 && deg < 270 + 22.5){
      return 'West'
    }
    else if(deg > 315 - 22.5 && deg < 315 + 22.5){
      return 'Northwest'
    }
  }

  function onSuccess(heading) {
    degrees = heading.magneticHeading;
    word = degreesToWord(degrees)
    $('.js-degrees').html(Math.round(degrees));
    $('.js-direction').html(word)
    $('.Compass-arrow').css(
      'transform', 
      'rotate('+(heading.magneticHeading * -1)+'deg)'
    )
  };

  function onError(error) {
    $('.js-degrees').html('CompassError: ' + error.code)
  };


  function updateCompass(){

    setTimeout(function(){
      console.log('updating compass');
      if(navigator.compass){
        navigator.compass.getCurrentHeading(onSuccess, onError);
        if(runCompass == true){
          updateCompass();
        }
      }
    },50)
  }
  updateCompass();

  $scope.back = function(){
    $scope.closeModal();
    runCompass = false;
  }

  $scope.saveOrientation = function(){
    $scope.closeModal();
    var orientation = word + '('+parseInt(degrees)+'°)'
    $('#orientation-input').val(orientation);
    runCompass = false;
  }

  
})


