// jshint asi:true
houseHunter.controller('EventsCtrl', function($scope, $state, eventsService, $cordovaLocalNotification) {

  var dummyData = [{"calendar_id":"9","title":"Buddy's flea drop","dtstart":1456866000000,"dtend":1456869600000,"eventLocation":"","allDay":0},{"calendar_id":"9","title":"Web Development Immersive Interview","dtstart":1456959600000,"dtend":1456961400000,"eventLocation":"General Assembly Campus, Level 12A, 45 William Street, Melbourne 3000","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457139600000,"dtend":1457141400000,"eventLocation":"107 Gladstone Avenue, Northcote","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457143200000,"dtend":1457145000000,"eventLocation":"11/52 Gadd Street, Northcote","allDay":0},{"calendar_id":"9","title":"Buddy's birthday ","dtstart":1457211600000,"dtend":1457215200000,"eventLocation":"","allDay":0},{"calendar_id":"11","title":"Labour Day (Western Australia)","dtstart":1457308800000,"dtend":1457395200000,"eventLocation":"","allDay":1},{"calendar_id":"9","title":"Flight to Singapore","dtstart":1457314200000,"dtend":1457342700000,"eventLocation":"Melbourne MEL","allDay":0},{"calendar_id":"9","title":"Inspection","dtstart":1457591400000,"dtend":1457593200000,"eventLocation":"107 Gladstone Avenue, Northcote","allDay":0},{"calendar_id":"11","title":"Canberra Day (Australian Capital Territory)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Adelaide Cup (South Australia)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Labour Day (Victoria)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1},{"calendar_id":"11","title":"Eight Hours Day (Tasmania)","dtstart":1457913600000,"dtend":1458000000000,"eventLocation":"","allDay":1}]
  var useDummyData = false;
  var startDate = moment().startOf('day').toDate(); // beware: month 0 = january, 11 = december
  console.log(startDate);
  var endDate = moment().add(4, 'weeks').endOf('day').toDate();
  var title = "My nice event";
  var eventLocation = "Home";
  var notes = "Some notes about this event.";

  var error = function(message) { alert("Error: " + message); };
  var success = function(events) {
    var filteredEvents = eventsService.filterEvents(events, "Inspection");
    filteredEvents = eventsService.addDatesToObj(filteredEvents);
    $scope.events = filteredEvents;
  };

  $scope.events = [];

  if(!useDummyData){
    window.plugins.calendar.listEventsInRange(startDate,endDate,success,error);
  }
  else{
    var events = dummyData;
    var filteredEvents = eventsService.filterEvents(events, "Inspection");
    filteredEvents = eventsService.addDatesToObj(filteredEvents);
    $scope.events = filteredEvents;
  }

  //testing local notifications
  var alarmTime = new Date();
  alarmTime.setSeconds(alarmTime.getSeconds() + 6);
  $cordovaLocalNotification.add({
      id: "1234",
      date: alarmTime,
      message: "This is a message",
      title: "This is a title",
      autoCancel: true,
      sound: null
  }).then(function () {
      console.log("The notification has been set");
  });




})
