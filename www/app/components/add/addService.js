houseHunter.service('addService', function ($state, $rootScope, propertyService) {

  this.saveToDB = function(property){
    $.ajax({
      url: "http://localhost:3000/api/properties",
      method: 'POST',
      headers: {
        Authorization: localStorage.token
      },
      data: {property: {
        address: property.address,
        price: property.price
      }}
    })
    .done(function( data ) {
      $rootScope.properties.push(data.property)
    });
  }

  this.updateDB = function(updatedProperty){
    var id = $state.params.id;
    $.ajax({
      url: 'http://localhost:3000/api/properties/' +id +'.json',
      type: 'PUT',
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        Authorization: localStorage.token
      },
      data: {property: {
        address: updatedProperty.address,
        price: updatedProperty.price
      }}
    })
    .done(function( data ) {
      console.log('updated?');
    });
  }

  this.createHash = function(){
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

});
