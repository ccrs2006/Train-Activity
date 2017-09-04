  // --------------Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyS8_RgF9olUnXG4NgCfk42Qf45MJ76d0",
    authDomain: "train-activity-ea976.firebaseapp.com",
    databaseURL: "https://train-activity-ea976.firebaseio.com",
    projectId: "train-activity-ea976",
    storageBucket: "",
    messagingSenderId: "137896900180"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var currentTime = moment().toDate().getTime();
      //this puts user's current time on main page
      $(".current-time").append(moment(currentTime).format("MM/DD/YY hh:mm:ss"));

  // 2. Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-time-input").val().trim(); 
  var frequency = $("#frequency-input").val().trim();
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var NextArrival = moment().add(minutesTillTrain, "minutes");
  var minutesAway = moment(NextArrival).format("hh:mm");
  // Creates local "temporary" object for holding Train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    minutesAway: minutesAway,
    minutesTillTrain: minutesTillTrain
  };
  // Uploads Train data to the database`
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
  console.log(minutesAway);
  console.log(minutesTillTrain);
  // Alert
  alert("train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(minutesAway);
  console.log(minutesTillTrain);

  // calculates next arrival
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var NextArrival = moment().add(minutesTillTrain, "minutes");
  var minutesAway = moment(NextArrival).format("hh:mm");
  //Calculates next train arrival time
  console.log(minutesAway);

  // Calculates minutes away
  console.log(minutesTillTrain);

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" 
    + trainName + "</td><td>" 
    + destination + "</td><td>" 
    + frequency + "</td><td>"
    + nextArrival + "</td><td>" 
    + minutesAway + "</td></td>"
    + '<input type ="submit" value ="remove train" class = "remove-train btn btn-primary btn-sm">'
    + "</td>" + "</tr>"
    );
  });
  