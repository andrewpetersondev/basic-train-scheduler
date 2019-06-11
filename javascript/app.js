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
// var name;
// var destination;
// var start;
// var frequency;

function clearForm() {
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
};

// button to add train
$("#add-train-btn").on("click", function (event) {

    // prevent default because it is a form
    event.preventDefault();

    // grab user input 
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // create local temporary object for holding data
    var newTrain = {
        name: name,
        destination: destination,
        start: start,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // log everything
    console.log(newTrain);

    // upload train data to firebase
    database.ref().push(newTrain);

    // log everything
    // console.log(newTrain);

    clearForm();

});

// firebase event for adding trains and a dynamic row in the html when user enters a new train
// firebase docs refer to data returned as childSnapshot
// in this case the name doesn't matter but use childSnapshot anyways
// all data returned from firebase is in the form of a string
database.ref().on("child_added", function (childSnapshot) {

    // data returned from firebase
    // console.log(childSnapshot);

    // firebase documentation says all data stored is accessed in val() method
    console.log(childSnapshot.val());

    // store everything in variables

    var tName = childSnapshot.val().name;
    // console.log("NAME = " + tName);

    var tDestination = childSnapshot.val().destination;
    // console.log("DESTINATION = " + tDestination);

    var tStart = childSnapshot.val().start;
    // console.log("START = " + tStart);

    var tFrequency = childSnapshot.val().frequency;
    // console.log("FREQUENCY = " + tFrequency);

    // first train time is pushed back 1 year to make sure it comes before the current time
    var firstTrainTimeConverted = moment(tStart, "HH:mm").subtract(1, "years");

    // current time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

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

    var nextArrival = moment(nextTrain).format("HH:mm A");

    // display to html with dynamic rows
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

