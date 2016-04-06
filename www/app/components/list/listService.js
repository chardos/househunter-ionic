houseHunter.service('listService', function ($rootScope, propertyService) {


  this.getIndex = function(){
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

  this.deleteProperty = function(item){
    $.ajax({
      url: "http://localhost:3000/api/properties/"+item.id+".json",
      method: 'DELETE',
      headers: {
        Authorization: localStorage.token
      }
    })
    //ATTN: HERE delete local storage
    $('[data-property-id='+item.id+']').parent().remove();
  }


});
