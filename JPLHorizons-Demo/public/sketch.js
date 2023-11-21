

//***************************************//
//*************Orbite sketch*************//
//**************************************//


// Global variables
let dataObjects = [];
let canvasWidth, canvasHeight;
let dataString;
let headerInfo;
let ephemerisData;
let commandSelect, observerLocationInput, startDateInput, endDateInput, stepSizeInput, quantitiesInput, dataFormatInput;
let apiUrl;
let ephemerisBlock;
let ephemData;
let stepSlider; // New variable for the slider
let selectedDate;
let totalSteps;

// Planet options
const planetOptions = [
  { value: '199', label: 'Mercury' },
  { value: '299', label: 'Venus' },
  { value: '499', label: 'Mars' },
  { value: '599', label: 'Jupiter' },
  { value: '699', label: 'Saturn' },
  { value: '799', label: 'Uranus' },
  { value: '899', label: 'Neptune' },
  { value: '999', label: 'Pluto' }
  // Add more planets as needed
];

// Setup function
function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight; 
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);

  // Create and position input elements
  commandSelect = createSelectInput('Command:', 10, 10, planetOptions);
  observerLocationInput = createInputWithLabel('Observer Location:', 10, 35, '500@10');
  startDateInput = createInputWithLabel('Start Date:', 10, 60, '2006-01-01');
  endDateInput = createInputWithLabel('End Date:', 10, 85, '2006-01-20');
  stepSizeInput = createInputWithLabel('Step Size:', 10, 110, '1%20d');
  // quantitiesInput = createInputWithLabel('Quantities:', 10, 135, '1,3,4,9,20,23,24,29');
  // dataFormatInput = createInputWithLabel('Data Format:', 10, 160, 'json');

  // Create and position fetch data button
  let fetchDataButton = createButton('Fetch Data');
  fetchDataButton.mousePressed(fetchData);
  fetchDataButton.position(10, stepSizeInput.y + 25);

  // Fetch data from JPL Horizons API
  fetchData();

  //display a link to the unformated data 
  let a = createA(`https://ssd.jpl.nasa.gov/api/horizons.${apiUrl}`, 'the data', '_blank');
  a.position(width/2, 0);

  stepSlider = createSlider(0, 100, 0); // Set initial range, you can adjust this
  stepSlider.position(10, fetchDataButton.y + 25);
  stepSlider.input(updateSelectedDate); // Call updateSelectedDate when the slider is moved

  selectedDate = createP('Selected Date: ');
  selectedDate.position(10, stepSizeInput.y + 3 * 25);
}


// Draw function
function draw() {
  fill(250);
  noStroke();
  rect(0, stepSizeInput.y + 3 * 25, width, height);
 // push();
  textSize(16);
  fill(0);
  textSize(12);


  //slider
  let sliderValue = stepSlider.value();
  let sliderMin = stepSlider.attribute('min');
  let sliderMax = stepSlider.attribute('max');
  let selectedStep = new Date(stepSlider.value()); 
  let mappedStep = int(map(sliderValue, sliderMin, sliderMax, 0, totalSteps));
 

  //display the planet's data
  for (let j = 0; j < dataObjects.length; j++) {
    // text(`True Anomaly ${dataObjects[j].ta[mappedStep]} `, 10, stepSizeInput.y + 5 * 25);
    // text(`semiMajorAxis ${dataObjects[j].a[mappedStep]} `, 10, stepSizeInput.y + 6 * 25);
    // text(`eccentricity ${dataObjects[j].ec[mappedStep]} `, 10, stepSizeInput.y + 7 * 25);
    // text(`inclination ${dataObjects[j].in[mappedStep]} `, 10, stepSizeInput.y + 8 * 25);
    // text(`LongAscNode ${dataObjects[j].om[mappedStep]} `, 10, stepSizeInput.y + 9 * 25);
    // text(`perifocus ${dataObjects[j].w[mappedStep]} `, 10, stepSizeInput.y + 10 * 25);
    // text(`Mean Anomaly ${dataObjects[j].ma[mappedStep]} `, 10, stepSizeInput.y + 11 * 25); 
  }


  translate(width / 2, height / 2);
  for (let j = 0; j < dataObjects.length; j++) {
  
   // pop();
        // Extract relevant arrays for the current planet
        let eccentricity = float(dataObjects[j].ec[mappedStep]);
        let inclination = float(dataObjects[j].in[mappedStep]);
        let longAscNode = float(dataObjects[j].om[mappedStep]);
        let meanAnomaly = float(dataObjects[j].ma[mappedStep]); //the angle representing the object's position in its orbit
        let trueAnomaly = float(dataObjects[j].ta[0]);
        let semiMajorAxis = float(dataObjects[j].a[0]);
        let perifocus = float(dataObjects[j].w[0]);

        let timeInDays = stepSlider.value() / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        let time = timeInDays;//mappedStep

        let eccentricAnom = EccAnom(eccentricity, meanAnomaly);
  
       

         // Calculate true anomaly
    let trueAnomalyArg = Math.atan2(Math.sqrt(1 - eccentricity) * Math.sin(radians(eccentricAnom) / 2), Math.sqrt(1 + eccentricity) * Math.cos(radians(eccentricAnom) / 2));
    let K = Math.PI / 180.0; // Radian converter variable
    // Use degrees function to convert trueAnomalyArg to degrees
let trueAnom = 2 * (atan(trueAnomalyArg) / K);  // Use atan function here
// Ensure trueAnom is within the range [0, 360)
trueAnom = (trueAnom + 360) % 360;


let scalingFactor = 0.0000001;  // Adjust the scaling factor as needed
let semiMajorAxisScaled = semiMajorAxis * scalingFactor;
//let calculatedRadiusScaled = calculatedRadius * scalingFactor;

        //let radius = map(eccentricity, 0, 1, 30, 200);
                                 //a    
        let radius = scalingFactor * (semiMajorAxis * (1 - eccentricity * eccentricity) / ( 1 + eccentricity * Math.cos(toRadians(trueAnom)))); //* (1 - eccentricity * cos(radians(eccentricAnom)));
        //radius = distance from the planet to the focus of the ellipse  	//https://en.wikipedia.org/wiki/True_anomaly#Radius_from_true_anomaly

        let x = radius * cos(trueAnomaly);
        let y = radius * sin(trueAnomaly);
    
        // Rotate the position based on inclination and longitude of the ascending node
        let inclinationRad = radians(inclination);
        let longAscNodeRad = radians(longAscNode);
        let xRotated = radius * (Math.cos(toRadians(longAscNode)) * Math.cos(toRadians(trueAnom + perifocus - longAscNode)) - Math.sin(toRadians(longAscNode)) * Math.sin(toRadians(trueAnom + perifocus - longAscNode)) * Math.cos(toRadians(inclination)))//x * cos(longAscNodeRad) - y * sin(longAscNodeRad);
        let yRotated = radius * (Math.sin(toRadians(longAscNode)) * Math.cos(toRadians(trueAnom + perifocus - longAscNode)) + Math.cos(toRadians(longAscNode)) * Math.sin(toRadians(trueAnom + perifocus - longAscNode)))//x * sin(longAscNodeRad) + y * cos(longAscNodeRad);

        pos = createVector( xRotated, yRotated);

        // Draw the planet
        fill(0);
        ellipse(pos.x , pos.y, 8); //draw planet

        // // Draw the orbit (ellipse)
        // noFill();
        // stroke(100);
        // // ellipse(0, 0, radius * 2, radius * 2);
  }

      //the sun
      push();
      fill('yellow');
      strokeWeight(1);
      stroke(0);
      ellipse(0, 0, 8, 8);
      pop();

}

function toRadians(deg){
	return deg * (Math.PI / 180);
}

// Kepler's Equation approximation for Eccentric Anomaly ////https://en.wikipedia.org/wiki/Kepler%27s_equation#Numerical_approximation_of_inverse_pro
function EccAnom(ec, m) {
	let i = 0;
	let delta = Math.pow(10,- 6);
	let E;

	m = m / 360.0;
	m = 2.0 * Math.PI * (m - Math.floor(m));
	E = m;

	while ((Math.abs((E - ec * Math.sin(E) - m)) > delta) && (i < 30)) {
		E = E - ((E - ec * Math.sin(E) - m) / (1.0 - ec * Math.cos(E)));
		i ++;   //f(E) = E - ec * sin(E) - m  // f'(E) = 1 - ec * cos(E) 
	}

	E = E / ( Math.PI / 180.0);

	return Math.round(E * Math.pow(10, 6)) / Math.pow(10, 6);
}

// Function to update slider range
function updateSliderRange(startDate, endDate) {
  // Set the minimum and maximum values of the slider based on the start and end dates
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();
  const stepMilliseconds = parseStepSize(stepSizeInput.value());
  const totalSteps = Math.floor((endTimestamp - startTimestamp) / stepMilliseconds);

  // Update the slider range
  stepSlider.attribute('min',startTimestamp);
   stepSlider.attribute('max',endTimestamp);
   stepSlider.attribute('step', stepMilliseconds);

}

function updateSelectedDate() {
  let currentDate = new Date(startDateInput.value());
  let selectedStep = stepSlider.value();
  let selectedTimestamp = currentDate.getTime() + selectedStep * parseFloat(stepSizeInput.value()) * 24 * 60 * 60 * 1000;
  let selectedDateObj = new Date(selectedStep);
  selectedDate.html('Selected Date: ' + selectedDateObj.toDateString());
}


// Create select input with label
function createSelectInput(label, x, y, options) {
  createInputLabel(label, x, y);
  let selectVar = createSelect();
  selectVar.position(150, y);
  for (let option of options) {
    selectVar.option(option.label, option.value);
  }
  return selectVar;
}

// Create input with label
function createInputWithLabel(label, x, y, defaultValue) {
  createInputLabel(label, x, y);
  let inputVar = createInput(defaultValue);
  inputVar.position(150, y);
  return inputVar;
}

// Fetch data function
function fetchData() {
  //dataObjects = []; // clear the array

  // Get values from input elements
  let command = commandSelect.value();
  let observerLocation = observerLocationInput.value();
  let startDate = startDateInput.value();
  let endDate = endDateInput.value();
  let stepSize = stepSizeInput.value();
  let dataFormat = "json"//dataFormatInput.value();
  let output = "ELEMENTS";

  // Set the dynamic parameters in the apiUrl
  apiUrl = `api?format=${dataFormat}&COMMAND='${command}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='${output}'&CENTER='${observerLocation}'&START_TIME='${startDate}'&STOP_TIME='${endDate}'&STEP_SIZE='${stepSize}'`;
  // Calculate total steps and update selected date

  // Use the fetch API to make the request
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      dataString = data;
      ephemerisBlock = extractEphemerisBlock(data);

      if (dataFormat === "json") {
        ephemData = parseEphemerisData(ephemerisBlock);
      } else {
        console.log("data format = " + dataFormat);
      }

      draw(); // Redraw canvas after fetching data
        // Update slider range based on start and end dates
    updateSliderRange(startDateInput.value(), endDateInput.value());

  // Calculate total steps and update selected date
  totalSteps = calculateTotalSteps(startDateInput.value(), endDateInput.value(), stepSizeInput.value());
  updateSelectedDate();
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to calculate the total number of steps between two dates
function calculateTotalSteps(startDate, endDate, stepSize) {

  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();
  const stepMilliseconds = parseStepSize(stepSize);

  return Math.floor((endTimestamp - startTimestamp) / stepMilliseconds);
}

// Function to parse step size
function parseStepSize(stepSize) {
  // Return the step size in milliseconds
  const daysInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
  return parseInt(stepSize) * daysInMilliseconds; 
}

// Extract ephemeris block function
function extractEphemerisBlock(text) {
  let start = text.indexOf("$$SOE");
  let end = text.indexOf("$$EOE");

  if (start !== -1 && end !== -1) {
    return text.substring(start + 5, end).trim();
  } else {
    return null;
  }
}

// Function to create input label
function createInputLabel(label, x, y) {
  textAlign(LEFT);
  textSize(14);
  text(label, x, y + 12);
}

// Function to position input elements
function positionInputs() {
  let inputX = 150;
  let inputY = 10;
  let inputSpacing = 25;

  observerLocationInput.position(inputX, inputY + inputSpacing);
  startDateInput.position(inputX, inputY + 2 * inputSpacing);
  endDateInput.position(inputX, inputY + 3 * inputSpacing);
  stepSizeInput.position(inputX, inputY + 4 * inputSpacing);
  quantitiesInput.position(inputX, inputY + 5 * inputSpacing);
  dataFormatInput.position(inputX, inputY + 6 * inputSpacing);
}

// Function to get nested property with checks
function getNestedProperty(obj, propertyPath, defaultValue = undefined) {
  return propertyPath.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
}

// Function to group items
function groupItems(array, groupSize) {
  var result = [];

  for (var i = 0; i < array.length; i += groupSize) {
    var group = {};
    for (var j = 0; j < groupSize && i + j < array.length; j++) {
      group['line' + (j + 1)] = array[i + j];
    }
    result.push(group);
  }
console.log(result);
  return result;
}

// Function to remove spaces around "="
function removeSpaces(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let key in lines[i]) {
      lines[i][key] = lines[i][key].replace(/\s*=\s*/g, '=');
    }
  }
}

// Function to extract values
function extractValues(line, element) {
  let regex = new RegExp(`${element}=([^\\s]+)`, 'g');
  let matches = line.match(regex);

  if (matches) {
    let valueMatch = matches[0].match(new RegExp(`${element}=([^\s]+)`));
    return valueMatch ? valueMatch[1] : '';
  } else {
    console.error(`${element} match is undefined.`);
    return '';
  }
}

// Function to parse ephemeris data
function parseEphemerisData(data) {
  const lines = data.split('\\n');

  let nonEmptyLines = lines.filter(line => line.trim() !== '');
  let pattern = /\s*=\s*/g;
  let replacement = "=";
  let noSpaces = nonEmptyLines.map(line => line.replace(pattern, replacement));

  let groupedObjects = groupItems(noSpaces, 5);

  let TA = []; //True Anomaly
  let EC = []; //Eccentricity
  let IN = []; //Inclination'
  let OM = []; //Longitude of the Ascending Node
  let W = []; //Argument of Perifocus 
  let A = []; //Semi-Major Axis
  let MA = []; //Mean Anamoly
  

  for (let i = 0; i < groupedObjects.length; i++) {
    EC.push(extractValues(groupedObjects[i].line2, 'EC'));
    IN.push(extractValues(groupedObjects[i].line2, 'IN'));
    OM.push(extractValues(groupedObjects[i].line3, 'OM'));
    W.push(extractValues(groupedObjects[i].line3, 'W'));
    TA.push(extractValues(groupedObjects[i].line4, 'TA'));
    MA.push(extractValues(groupedObjects[i].line4, 'MA'));
    A.push(extractValues(groupedObjects[i].line5, 'A'));
    //IN.push(extractValues(groupedObjects[i].line5, 'IN'));
  }

  let newDataObject = {
    planet: commandSelect.value(),
    ec: EC,
    ta: TA,
    a: A,
    in: IN,
    om: OM,
    w: W,
    ma: MA
  }
  console.log(newDataObject);
  dataObjects.push(newDataObject);
  return newDataObject;
}

// Function to display data
// function displayData() {
//   textSize(16);


//   textSize(16);
//   fill(0);
//   text("Fetched Data:", 10, dataFormatInput.y + 3 * 25);
//   textSize(12);
//   text(`data Objects: ${dataObjects.length}`, 10, dataFormatInput.y + 4 * 25);

//   let yPos = 275; // Initial yPos value

//   for (let j = 0; j < dataObjects.length; j++) {
//     text("Planet: " + dataObjects[j].planet, 100, yPos, windowWidth);
//     text("EC: " + dataObjects[j].ec, 100, yPos + 20, windowWidth);
//     text("TA: " + dataObjects[j].ta, 100, yPos + 50, windowWidth);

//     yPos += 110;
//   }
// }