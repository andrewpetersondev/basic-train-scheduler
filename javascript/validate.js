// $(document).ready(function () {


//     // https://www.youtube.com/watch?v=W4-5WM60gWg
//     $("#name-error-message").hide();
//     $("#destination-error-message").hide();
//     $("#time-error-message").hide();
//     $("#frequency-error-message").hide();

//     var nameErrorMessage = false;
//     var destinationErrorMessage = false;
//     var timeErrorMessage = false;
//     var frequencyErrorMessage = false;

//     $("#name-error-message").focusout(function () {

//     });

//     function validateName() {
//         var pattern = /^[a-zA-Z]*$/;
//         var tName = $("#train-name-input").val().trim();
//         if (pattern.test(tName) && tName !== '') {
//             $("#name-error-message").hide();
//             $("#train-name-input").css("border-bottom", "2px solid #34F458");
//         } else {
//             $("#name-error-message").html("should contain only characters");
//             $("#name-error-message").show();
//             $("#train-name-input").css("border-bottom", "2px solid #F90A0A");
//             nameErrorMessage = true;
//         }
//     }

//     function validateDestination() {
//         var pattern = /^[a-zA-Z]*$/;
//         var tDestination = $("#destination-input").val().trim();
//         if (pattern.test(tDestination) && tDestination !== '') {
//             $("#destination-error-message").hide();
//             $("#destination-input").css("border-bottom", "2px solid #34F458");
//         } else {
//             $("#destination-error-message").html("should contain only characters");
//             $("#destination-error-message").show();
//             $("#destination-input").css("border-bottom", "2px solid #F90A0A");
//             destinationErrorMessage = true;
//         }
//     }

//     function validateStartTime() {
//         // https://stackoverflow.com/questions/1494671/regular-expression-for-matching-time-in-military-24-hour-format
//         var pattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;
//         var tStartTime = $("#start-input").val().trim();
//         if (pattern.test(tStartTime) && tStartTime !== '') {
//             $("#time-error-message").hide();
//             $("#start-input").css("border-bottom", "2px solid #34F458");
//         } else {
//             $("#time-error-message").html("should contain only 4 numbers");
//             $("#time-error-message").show();
//             $("#start-input").css("border-bottom", "2px solid #F90A0A");
//             timeErrorMessage = true;
//         }
//     }

//     // function validateFrequency() {

//     //     if 

//     // }


//     // https://jqueryvalidation.org/validate/
//     $("#train-details-form").validate({

//         rules: {
//             name: "required",
//             destination: "required",
//             time: {
//                 required: true,
//                 exactlength: 4
//             },
//             frequency: {
//                 required: true,

//             }
//         },
//         messages: {
//             name: "input a name",
//             destination: "input a destination",
//             time: "input a time in the correct format",
//             frequency: "input a valid frequency"
//         }



//     });

// });