let apiUrl = "http://localhost:3000/api"; //fetching from server
let targetBody = "Mercury"; // Change to the desired planet
let startTime = "2023-01-01";
let endTime = "2023-12-31";
let stepSize = "1d";

let query = `format=text&COMMAND='${targetBody}'&EPHEM_TYPE=OBSERVER&OBJ_DATA=NO&START_TIME='${startTime}'&STOP_TIME='${endTime}'&STEP_SIZE='${stepSize}'`;

let planetsData;

function setup() {
    createCanvas(400, 400);
    fetchData();
  }
  
  function draw() {
    background(220);
  }

// Fetch data from JPL Horizons
function fetchData() {
    //fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='499'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2006-01-01'&STOP_TIME='2006-01-20'&STEP_SIZE='1%20d'&QUANTITIES='1,9,20,23,24,29'`)
   fetch(`${apiUrl}?${query}`)
    .then((response) => response.text())
    .then((data) => processData(data));
  }


