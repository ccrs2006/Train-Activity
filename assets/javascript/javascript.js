  $(document).ready(function() {

  // --------------Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyS8_RgF9olUnXG4NgCfk42Qf45MJ76d0",
    authDomain: "train-activity-ea976.firebaseapp.com",
    databaseURL: "https://train-activity-ea976.firebaseio.com",
    projectId: "train-activity-ea976",
    storageBucket: "train-activity-ea976.appspot.com",
    messagingSenderId: "137896900180"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var currentTime = moment();

  //this puts user's current date and time on the main page
  $(".current-time").append(moment(currentTime).format("MM/DD/YY hh:mm:ss"));

  // Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-time-input").val().trim(); 
  var frequency = $("#frequency-input").val().trim();
  var startTime = moment(firstTrain, "hh:mm").subtract(1, "years");
  var minutesAway = moment().diff(moment(startTime), "minutes") % frequency;
  var nextArrival = moment(moment().add(minutesAway, "minutes")).format("hh:mm");
  var minutesTillTrain = moment().diff(moment(startTime), "minutes") % frequency;

  // "temporary" object for holding Train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesTillTrain: minutesTillTrain
  };
  // Uploads Train data to the database`
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(nextArrival);
  console.log(minutesTillTrain);
  //add sound every time a train is added
   var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', 'assets/sounds/trainSound.mp3');
                    $audioCharacter.play();
  // Alert
  // alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  return false;

});

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" 
    + childSnapshot.val().trainName 
    + "</td><td>" 
    + childSnapshot.val().destination 
    + "</td><td>" 
    + childSnapshot.val().frequency 
    + "</td><td>"
    + childSnapshot.val().nextArrival 
    + "</td><td>" 
    + childSnapshot.val().minutesTillTrain 
    + "</td><td>"
    + "<button class='remove-train btn btn-danger' id='add-train-btn' type='submit'>Remove Train</button>"
    + "</td></tr>"
    );
  //Handles any errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  $("body").on("click", ".remove-train", function(){
      $(this).closest("tr").remove();
      var getKey = $(this).parent().attr("id");
      database.child(getKey).remove();
  });

});//Closes jQuery wrapper
  