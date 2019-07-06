

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

$("#add").on("click", function () {
  event.preventDefault();

  // Get the input values
  var empName = $('#name').val().trim();
  var empRole = $('#role').val().trim();
  var empStart = $('#start').val().trim();
  var empRate = $('#rate').val().trim();


  database.ref().push({
    employee: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  });
});
// MAIN PROCESS + INITIAL CODE
// --------------------------------------------------------------------------------
// Using .on("value", function(snapshot)) syntax will retrieve the data
// from the database (both initially and every time something changes)
// This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
var labelText = {
  "name": "Employee Name",
  "role": "Role",
  "start": "Start Date",
  "worked": "Months Worked",
  "rate": "Monthy Rate ($)",
  "billed": "Total Billed ($)"
}

function monthDiff(dateFrom, dateTo) {
  return dateTo.getMonth() - dateFrom.getMonth() +
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;
}

function renderEmployee(table, employee) {
  today = new Date();
  employee.start = new Date(employee.start);
  employee.worked = monthDiff(employee.start, today);
  employee.billed = employee.worked * employee.rate;
  employee.start = pad(employee.start.getDate(), 2) + "/" +
    pad(employee.start.getMonth() + 1, 2) + "/" +
    String(employee.start.getFullYear());
  var labels = $("<tr>");
  var data = $("<tr>");
  for (item in labelText) {
    labels.append($("<td>").text(labelText[item]));
    data.append($("<td>").text(employee[item]));
  }
  table.append(labels);
  table.append(data);
}

var employeeData;
database.ref().once("value", function (snapshot) {
  // Then we console.log the value of snapshot
  console.log(snapshot.val());
  // Update the clickCounter variable with data from the database.
  // Then we change the html associated with the number.
  var employeeTable = $("#employees");
  employeeTable.empty();
  employeeData = snapshot.val();
  for (item in employeeData) {
    employeeData[item]["name"] = item;
    renderEmployee(employeeTable, employeeData[item]);
  }
  // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
  // Again we could have named errorObject anything we wanted.
}, function (errorObject) {
  // In case of error this will print the error
  console.log("The read failed: " + errorObject.code);
});

database.ref().on("value", function(snapshot) {
  var employee = snapshot.val();
  renderEmployee($("#employees"), employee);
});