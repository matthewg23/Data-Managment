

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app -->



  // Your web app"s Firebase configuration
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
    var labelText = {
      "name" : "Employee Name",
      "role" : "Role",
      "start" : "Start Date",
      "worked" : "Months Worked",
      "rate" : "Monthy Rate ($)",
      "billed" : "Total Billed ($)"
    }
    database.ref().on("value", function(snapshot) {
      // Then we console.log the value of snapshot
      console.log(snapshot.val());
      // Update the clickCounter variable with data from the database.
      var employees = snapshot.val().employees;
      // Then we change the html associated with the number.
      $("#employees").empty();
      for (var i = 0; i < employees.length; ++i) {
        var labels = $("<tr>");
        var data = $("<tr>");
        for (item in employees[i]) {
          labels.append("<td>").text(item);
          data.append("<td>").text(employees[i][item]);
        }
        $("#employees").append(labels + data);
      }
      // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
      // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {
      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    });