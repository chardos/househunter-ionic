houseHunter.service('propertyService', function () {
  this.getLocalProperties = function(){
    return JSON.parse(localStorage.properties);
  }
  this.setLocalProperties = function(arr){
    console.log(arr);
    localStorage.properties = JSON.stringify(arr)
  }

  this.localPropertyIndex = function(properties, id){
    for(var i=0; i<=properties.length; i++){
      if(properties[i].id == id){
        return i;
      }
    }

  }


});
