houseHunter.service('listService', function () {

  var o = {};

  o.pullFromDB = function($scope){
    $.ajax({
      url: "http://localhost:3000/api/properties",
      method: 'GET',
      headers: {
        Authorization: localStorage.token
      }
    })
    .done(function( data ) {
      var properties = data;
      $scope.properties = properties;
      localStorage.properties = JSON.stringify(properties);
    });
  }


  o.showProperties = function($scope){
    $scope.properties = JSON.parse(localStorage.properties);
  }

  o.deleteProperty = function(item){
    $.ajax({
      url: "http://localhost:3000/api/properties/"+item.id+".json",
      method: 'DELETE',
      headers: {
        Authorization: localStorage.token
      }
    })
    $('[data-property-id='+item.id+']').parent().remove();
  }

  return o;

});
