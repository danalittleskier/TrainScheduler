
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCurDyqz05LvewwxIugAMH0tFj7eTMyMFQ",
    authDomain: "trainscheduler-3d85e.firebaseapp.com",
    databaseURL: "https://trainscheduler-3d85e.firebaseio.com",
    projectId: "trainscheduler-3d85e",
    storageBucket: "",
    messagingSenderId: "395539792299",
    appId: "1:395539792299:web:b032c28b690538f7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//Add train to the firebase
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firsttrain: firstTrain,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});


//   database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());

//     // Store everything into a variable.
//     var trainName = childSnapshot.val().name;
//     var trainDestination = childSnapshot.val().destination;
//     var firstTrain = childSnapshot.val().firsttrain;
//     var trainFrequency = childSnapshot.val().frequency;

//     var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
//     console.log("time converted "+firstTimeConverted);

//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % trainFrequency;

//     // Minute Until Train
//     var tMinutesTillTrain = trainFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     var arrivalTime = moment(nextTrain).format("HH:mm");

//     // var intervalDisplay = setInterval(createRow(trainName, trainDestination, trainFrequency, arrivalTime, tMinutesTillTrain), 5 * 1000);

//     var newRow = $("<tr>").append(
//       $("<td class='train-name'>").text(trainName),
//       $("<td class='train-dest'>").text(trainDestination),
//       $("<td class='train-freq'>").text(trainFrequency),
//       $("<td class='train-arrival'>").text(arrivalTime),
//       $("<td class='train-minutes'>").text(tMinutesTillTrain),
//     );

//     // Append the new row to the table
//     $("#train-table > tbody").append(newRow);
//   });
createRows();

var displayInterval = setInterval(createRows, 60 * 1000);

function createRows() {
    $("#train-table > tbody").empty();

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firsttrain;
        var trainFrequency = childSnapshot.val().frequency;

        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log("time converted " + firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFrequency;

        // Minute Until Train
        var tMinutesTillTrain = trainFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var arrivalTime = moment(nextTrain).format("HH:mm");


        var newRow = $("<tr>").append(
            $("<td class='train-name'>").text(trainName),
            $("<td class='train-dest'>").text(trainDestination),
            $("<td class='train-freq'>").text(trainFrequency),
            $("<td class='train-arrival'>").text(arrivalTime),
            $("<td class='train-minutes'>").text(tMinutesTillTrain),
        );


        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });

}