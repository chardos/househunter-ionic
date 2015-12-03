/*houseHunter.service('loginService', function () {
  var property = '';
  var runCompass = false;

 
 


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

*/