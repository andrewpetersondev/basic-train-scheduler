// configure firebase
var firebaseConfig = {
    apiKey: "AIzaSyCEwL4pz_xTOsOzHa8WDuFzw0KpWCW-2w8",
    authDomain: "train-tracker-b625f.firebaseapp.com",
    databaseURL: "https://train-tracker-b625f.firebaseio.com",
    projectId: "train-tracker-b625f",
    storageBucket: "train-tracker-b625f.appspot.com",
    messagingSenderId: "176834673091",
    appId: "1:176834673091:web:9cdb48a74d3151d3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a variable to manipulate firebase
var database = firebase.database();

// // Initial Values
// var trainName;
// var destinationInput;
// var firstTrainTimeInput;
// var frequencyInput;

function clearForm() {
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
};

// button to add child train
$("#add-train-btn").on("click", function (event) {

    // prevent default because it is a form
    event.preventDefault();

    // grab user input 
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainTimeInput = $("#start-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    // create local temporary object for holding data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        start: firstTrainTimeInput,
        frequency: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // upload train data to firebase
    database.ref().push(newTrain);

    // log everything
    // console.log(newTrain);
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.frequency);

    clearForm();

});

// watches firebase for .on child added
database.ref().on("child_added", function (snapshot) {

    // store snapshot value in variable for convenience
    var sv = snapshot.val();

    // store everything in variables
    var train = sv.name;
    var destination = sv.destination;
    var firstTrainTime = sv.start;
    var frequency = sv.frequency;

    // log the snapshot
    console.log(snapshot);
    console.log(sv);
    console.log("NAME = " + train);
    console.log("DESTINATION = " + destination);
    console.log("START = " + firstTrainTime);
    console.log("FREQUENCY = " + frequency);

    // moment js time calculations
    // we are using date math for this project so it is important to remember that the moment object in Moment.js is mutable. This means that operations like add, subtract, or set change the original moment object.
    // if we perform mutable calculations for date math objects we should clone them first

    // logic from train example
    var tFrequency = frequency;

    // first train time is pushed back 1 year to make sure it comes before the current time
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    // current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // display to html with dynamic rows
    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});