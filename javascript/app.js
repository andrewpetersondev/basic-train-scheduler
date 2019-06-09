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

// Initial Values
// var trainName = "";
// var destinationInput = "";
// var startInput = "";
// var frequencyInput = "";

// function to add train to empty database
function setInitialTrainInFirebase() {

    // // grab user input 
    // var trainName = $("#train-name-input").val().trim();
    // var destinationInput = $("#destination-input").val().trim();
    // var startInput = $("#start-input").val().trim();
    // var frequencyInput = $("#frequency-input").val().trim();

    // // create local temporary object for holding data
    // var newTrain = {
    //     name: trainName,
    //     destination: destinationInput,
    //     start: startInput,
    //     frequency: frequencyInput
    // };

    // confirm new train in console
    // console.log(newTrain);

    // set initial train in firebase
    // database.ref().set({newTrain});

    // // log everything
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.frequency);

    // set initial train in firebase
    // database.ref().set({
    //     name: trainName,
    //     destination: destinationInput,
    //     start: startInput,
    //     frequency: frequencyInput
    // });

    // // log everything
    // console.log(name);
    // console.log(destination);
    // console.log(start);
    // console.log(frequency);

    // clearForm();

    // // display to html with dynamic rows
    // var newRow = $("<tr>").append(
    //     $("<td>").text(newTrain.name),
    //     $("<td>").text(destinationInput),
    //     $("<td>").text(startInput),
    //     $("<td>").text(frequencyInput)
    // );

    // $("#train-table > tbody").append(newRow);

    // // Firebase watcher + initial loader HINT: .on("value")
    // database.ref().on("value", function (snapshot) {

    //     // Log everything that's coming out of snapshot
    //     console.log(snapshot.val());
    //     console.log(snapshot.val().name);
    //     console.log(snapshot.val().destination);
    //     console.log(snapshot.val().start);
    //     console.log(snapshot.val().frequency);

    //     // Change the HTML to reflect
    //     // $("#name-display").text(snapshot.val().name);
    //     // $("#email-display").text(snapshot.val().destination);
    //     // $("#age-display").text(snapshot.val().start);
    //     // $("#comment-display").text(snapshot.val().frequency);

    //     // Handle the errors
    // }, function (errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // });



};

function clearForm() {
    // clear the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
};

// button click to add train
$("#add-train-btn").on("click", function (event) {

    // prevent default because it is a form
    event.preventDefault();

    // grab user input 
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var startInput = $("#start-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    // set initial train in firebase
    database.ref().set({
        name: trainName,
        destination: destinationInput,
        start: startInput,
        frequency: frequencyInput
    });

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");


});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().start);
    console.log(snapshot.val().frequency);

    // Change the HTML to reflect
    var firstRow = $("<tr>").append(
        $("<td>").text(snapshot.val().name),
        $("<td>").text(snapshot.val().destination),
        $("<td>").text(snapshot.val().start),
        $("<td>").text(snapshot.val().frequency)
    );

    $("#train-table > tbody").append(firstRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// // button to add child train
// $(document).on("click", "#add-train-btn", function () {

//     // prevent default because it is a form
//     event.preventDefault();

//     // grab user input 
//     var trainName = $("#train-name-input").val().trim();
//     var destinationInput = $("#destination-input").val().trim();
//     var startInput = $("#start-input").val().trim();
//     var frequencyInput = $("#frequency-input").val().trim();

//     // create local temporary object for holding data
//     var newTrain = {
//         name: trainName,
//         destination: destinationInput,
//         start: startInput,
//         frequency: frequencyInput
//     };

//     // upload train data to firebase
//     database.ref().push(newTrain);

//     // log everything
//     console.log(newTrain.name);
//     console.log(newTrain.destination);
//     console.log(newTrain.start);
//     console.log(newTrain.frequency);

//     clearForm();

// });





// // add child data to firebase then display on page
// database.ref().on("child_added", function (childSnapshot) {

//     // log the childSnapshot
//     console.log(childSnapshot);

//     // store everything in variables
//     var trainName = childSnapshot.val().name;
//     var destinationInput = childSnapshot.val().destination;
//     var startInput = childSnapshot.val().start;
//     var frequencyInput = childSnapshot.val().frequency;

//     // log info
//     console.log("train name = " + trainName);
//     console.log("destination = " + destinationInput);
//     console.log("start = " + startInput);
//     console.log("frequency = " + frequencyInput);

//     // display to html with dynamic rows
//     var newRow = $("<tr>").append(
//         $("<td>").text(trainName),
//         $("<td>").text(destinationInput),
//         $("<td>").text(startInput),
//         $("<td>").text(frequencyInput)
//     );

//     $("#train-table > tbody").append(newRow);

// });