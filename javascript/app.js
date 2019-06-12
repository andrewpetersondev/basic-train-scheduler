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

$("#start-input").mask("##:##");
$("#frequency-input").mask("###0");
$("#train-name-input").mask("Z", {
    translation: {
        'Z': {
            pattern: /[a-z A-Z]/, recursive: true
        }
    }
}
);
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
    // console.log("tName = " + tName);

    var tDestination = childSnapshot.val().destination;
    // console.log("tDestination = " + tDestination);

    var tFrequency = childSnapshot.val().frequency;
    // console.log("tFrequency = " + tFrequency);

    var tStart = childSnapshot.val().start;
    console.log("tStart = " + tStart);

    var timeArray = tStart.split(":");

    // trainTime is converted to hours and minutes
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    console.log("trainTime = " + trainTime);

    // Returns the maximum (most distant future) of the given moment instances.
    var maxMoment = moment.max(moment(), trainTime);
    console.log("maxMoment = " + maxMoment);

    var tMinutes;
    var tArrival;

    // consider the first train time has not happened yet 
    // format tArrival to
    // calculate tMinutes // tMinutes is the difference between current time and trainTime
    if (maxMoment === trainTime) {
        tArrival = trainTime.format("HH:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {
        var diffTime = moment().diff(trainTime, "minutes");
        var tRemainder = diffTime % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }


    // ======================================================================================================================================================

    // // first train time is pushed back 1 year to make sure it comes before the current time
    // var firstTrainTimeConverted = moment(tStart, "HH:mm").subtract(1, "years");
    // console.log(firstTrainTimeConverted);

    // // var currentTime = moment();
    // // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // var nextArrival = moment(nextTrain).format("HH:mm A");

    // ======================================================================================================================================================

    // display to html with dynamic rows
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
    );

    $("#train-table > tbody").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

