houseHunter.service('listService', function () {


  this.pullFromDB = function($scope){
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


  this.showProperties = function($scope){
    $scope.properties = JSON.parse(localStorage.properties);
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
