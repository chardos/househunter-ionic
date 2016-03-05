// jshint asi:true
houseHunter.controller('EventsCtrl', function($scope, $state) {

  var dummyData = [{"calendar_id":"9","title":"Buddy's flea drop","dtstart":1456866000000,"dtend":1456869600000,"eventLocation":"","allDay":0},{"calendar_id":"9","title":"Web Development Immersive Interview","dtstart":1456959600000,"dtend":1456961400000,"eventLocation":"General Assembly Campus, Level 12A, 45 William Street, Melbourne 3000","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457139600000,"dtend":1457141400000,"eventLocation":"107 Gladstone Avenue, Northcote","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457143200000,"dtend":1457145000000,"eventLocation":"11/52 Gadd Street, Northcote","allDay":0},{"calendar_id":"9","title":"Buddy's birthday ","dtstart":1457211600000,"dtend":1457215200000,"eventLocation":"","allDay":0},{"calendar_id":"11","title":"Labour Day (Western Australia)","dtstart":1457308800000,"dtend":1457395200000,"eventLocation":"","allDay":1},{"calendar_id":"9","title":"Flight to Singapore","dtstart":1457314200000,"dtend":1457342700000,"eventLocation":"Melbourne MEL","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457591400000,"dtend":1457593200000,"eventLocation":"107 Gladstone Avenue, Northcote","allDay":0},{"calendar_id":"11","title":"Canberra Day (Australian Capital Territory)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Adelaide Cup (South Australia)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Labour Day (Victoria)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Eight Hours Day (Tasmania)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1}]

  var startDate = new Date(2016,2,1,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2016,2,15,19,30,0,0,0);
  var title = "My nice event";
  var eventLocation = "Home";
  var notes = "Some notes about this event.";
  var events;

  function filterEvents(events, word){
    var filteredEvents = events.filter(function(e){return e.title==word})
    return filteredEvents;
  }
  function addDatesToObj(events){
    var newEvents = events.map(function(e){
      e.date = moment(e.dtstart).format("MMM Do YYYY")
      e.startTime = moment(e.dtstart).format("h:mma")
      e.endTime = moment(e.dtend).format("h:mma")
      return e
    })
    return newEvents;
  }

  var success = function(events) {
    var filteredEvents = filterEvents(events, "Inspection");
    $scope.events = filteredEvents;
  };
  // $scope.events = [];

  var filteredEvents = filterEvents(dummyData, "Inspection");
  filteredEvents = addDatesToObj(filteredEvents);
  $scope.events = filteredEvents;

  var error = function(message) { alert("Error: " + message); };

  //window.plugins.calendar.listEventsInRange(startDate,endDate,success,error);

})
