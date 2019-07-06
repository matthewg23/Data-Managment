// <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app -->



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBLkDwGWp8iQtg4lgVAvHAYgUKmGom0wJM",
    authDomain: "saturday-class-a7a0c.firebaseapp.com",
    databaseURL: "https://saturday-class-a7a0c.firebaseio.com",
    projectId: "saturday-class-a7a0c",
    storageBucket: "",
    messagingSenderId: "780010253407",
    appId: "1:780010253407:web:d302f15aeed594e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




// Sample starter code from prev. exercises! 


    // VARIABLES
    // --------------------------------------------------------------------------------
    // Get a reference to the database service
    var database = firebase.database();
    // Setting initial value of our click counter variable to 0
    var employees = [];
    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------
    // On Click of Button
    $("#add").on("click", function() {
      event.preventDefault();

    });
    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------
    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {
      // Then we console.log the value of snapshot
      console.log(snapshot.val());
      // Update the clickCounter variable with data from the database.
      clickCounter = snapshot.val().clickCount;
      // Then we change the html associated with the number.
      $("#click-value").text(snapshot.val().clickCount);
      // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
      // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {
      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    });