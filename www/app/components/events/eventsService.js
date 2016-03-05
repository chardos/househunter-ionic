houseHunter.service('eventsService', function () {

  var o = {};
  o.filterEvents = function(events, word){
    var filteredEvents = events.filter(function(e){return e.title==word})
    return filteredEvents;
  }
  o.addDatesToObj = function(events){
    var newEvents = events.map(function(e){
      e.date = moment(e.dtstart).format("MMM Do YYYY")
      e.startTime = moment(e.dtstart).format("h:mma")
      e.endTime = moment(e.dtend).format("h:mma")
      return e
    })
    return newEvents;
  }
  return o;

});
