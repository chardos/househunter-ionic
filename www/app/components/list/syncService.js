houseHunter.service('syncService', function () {

  var o = {};
  o.filterEvents = function(events, word){
    var filteredEvents = events.filter(function(e){return e.title==word})
    return filteredEvents;
  }

  return o;

});
