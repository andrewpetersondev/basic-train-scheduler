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

// button to add employees
$("#add-train-btn").on("click", function () {

    // prevent default because it is a form
    event.preventDefault();

    // grab user input 
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var startInput = $("#start-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    // create local temporary object for holding data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        start: startInput,
        frequency: frequencyInput
    };

    // upload train data to firebase
    database.ref().push(newTrain);

    // log everything
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // clear the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");


});

