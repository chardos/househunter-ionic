houseHunter.service('listService', function ($rootScope, propertyService) {


  this.pullFromDB = function($scope){
    $.ajax({
      url: "http://localhost:3000/api/properties",
      method: 'GET',
      headers: {
        Authorization: localStorage.token
      }
    })
    .done(function( properties ) {
      $rootScope.properties = properties;
      localStorage.properties = JSON.stringify(properties);
    });
  }


  this.showProperties = function(){
    $rootScope.properties = JSON.parse(localStorage.properties);
  }

  this.deleteProperty = function(item){
    $.ajax({
      url: "http://localhost:3000/api/properties/"+item.id+".json",
      method: 'DELETE',
      headers: {
        Authorization: localStorage.token
      }
    })
    //ATTN: HERE delete local storage
    var properties = propertyService.getLocalProperties();
    var index = propertyService.localPropertyIndex(properties, item.id);
    properties.splice(index, 1)
    propertyService.setLocalProperties(properties)
    console.log(properties);
  }


});
