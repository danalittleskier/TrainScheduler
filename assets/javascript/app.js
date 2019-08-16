
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

   //Add train to the firebase
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
   
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
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
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firsttrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });