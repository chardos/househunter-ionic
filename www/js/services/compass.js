houseHunter.service('compassService', function () {
  var property = '';
  var runCompass = false;

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
    cmp.degrees = heading.magneticHeading;
    cmp.word = degreesToWord(cmp.degrees)
    $('.js-degrees').html(Math.round(cmp.degrees));
    $('.js-direction').html(cmp.word)
    $('.Compass-arrow').css(
      'transform', 
      'rotate('+(heading.magneticHeading * -1)+'deg)'
    )
  }

  function onError(error) {
    $('.js-degrees').html('CompassError: ' + error.code)
  }


  var cmp = {
    word: null,
    degrees: null,
    setRunCompass: function(value) {
      runCompass = value;
    },
    updateCompass: function(){
      setTimeout(function(){
        if(navigator.compass){
          navigator.compass.getCurrentHeading(onSuccess, onError);
          if(runCompass === true){
            cmp.updateCompass();
          }
        }
      },50)
    }

  };

  return cmp;

});

