//***************************************//
//*************Orbit sketch*************//
//**************************************//


  // Define orbit data
//   const orbitData = [
//     { TA: 3.364406687861443E+02, A: 1.082074884029348E+08 },
//     { TA: 3.365082014108534E+02, A: 1.082074874932650E+08 },
//     { TA: 3.365757345666674E+02, A: 1.082074865865390E+08 },
//     { TA: 3.366432682522504E+02, A: 1.082074856827587E+08 },
//     { TA: 3.367108024662663E+02, A: 1.082074847819261E+08 },
//     { TA: 3.367783372073731E+02, A: 1.082074838840426E+08 },
//     { TA: 3.368458724742340E+02, A: 1.082074829891104E+08 },
//     { TA: 3.369134082655075E+02, A: 1.082074820971311E+08 },
//     { TA: 3.369809445798484E+02, A: 1.082074812081064E+08 },
//     { TA: 3.370484814159161E+02, A: 1.082074803220382E+08 },
//     { TA: 3.371160187723680E+02, A: 1.082074794389283E+08 },
//     { TA: 3.371835566478499E+02, A: 1.082074785587782E+08 },
//     { TA: 3.372510950410175E+02, A: 1.082074776815897E+08 },
//     { TA: 3.373186339505240E+02, A: 1.082074768073647E+08 },
//     { TA: 3.373861733750173E+02, A: 1.082074759361046E+08 },
//     { TA: 3.374537133131458E+02, A: 1.082074750678113E+08 },
//     { TA: 3.375212537635553E+02, A: 1.082074742024864E+08 },
//     { TA: 3.375887947248888E+02, A: 1.082074733401314E+08 },
//     { TA: 3.376563361957976E+02, A: 1.082074724807481E+08 },
//     { TA: 3.377238781749242E+02, A: 1.082074716243383E+08 },
//     { TA: 3.377914206609056E+02, A: 1.082074707709033E+08 },
//     { TA: 3.378589636523841E+02, A: 1.082074699204447E+08 },
//     { TA: 3.379265071480002E+02, A: 1.082074690729644E+08 },
//     { TA: 3.379940511463926E+02, A: 1.082074682284638E+08 },
//     { TA: 3.380615956461941E+02, A: 1.082074673869443E+08 },
//     { TA: 3.381291406461769E+02, A: 1.082074665483182E+08 }
//     // Add more data points as needed
//   ];

//       // Data
//       const time = [2460262.5, 2460262.54, 2460262.58, 2460262.62, 2460262.67, 2460262.71, 2460262.75, 2460262.79, 2460262.83, 2460262.88, 2460262.92, 2460262.96, 2460263, 2460263.04, 2460263.08, 2460263.13, 2460263.17, 2460263.21, 2460263.25, 2460263.29, 2460263.33, 2460263.38, 2460263.42, 2460263.46, 2460263.5];
//       const eccentricity = [6.738130829209159E-03, 6.738124572668056E-03, 6.738118335671727E-03, 6.738112118243478E-03, 6.738105920408658E-03, 6.738099742191551E-03, 6.738093583615592E-03, 6.738087444706527E-03, 6.738081325486645E-03, 6.738075225981252E-03, 6.738069146214817E-03, 6.738063086209784E-03, 6.738057045989468E-03, 6.738051025579249E-03, 6.738045025001735E-03, 6.738039044279926E-03, 6.73803308343749E-03, 6.738027142497279E-03, 6.738021221483386E-03, 6.738015320418358E-03, 6.738009439325006E-03, 6.738003578225056E-03];

//   function setup() {
//     createCanvas(400, 400);
//     angleMode(DEGREES);
//    //parseEphemerisData(inputText);
//    //console.log(orbitalData);
//     //time = orbitalData.time;
//     //eccentricity = orbitalData.eccentricity;
//   // const { time, eccentricity } = parseEphemerisData(inputText);

// // console.log('Time:', time);
// // console.log('Eccentricity:', eccentricity);
//   }

//   function draw() {
//     background(255);
//     translate(width / 2, height / 2);

//     // Draw circle
//     noFill();
//     stroke(0);
//     ellipse(0, 0, 300, 300);

//     // Plot data points on the circle
//     for (let i = 0; i < time.length; i++) {
//       let angle = map(time[i], min(time), max(time), 0, 360);
//       let radius = map(eccentricity[i], min(eccentricity), max(eccentricity), 50, 150);

//       let x = radius * cos(angle);
//       let y = radius * sin(angle);

//       // Draw data points
//       fill(0);
//       ellipse(x, y, 8, 8);
//     }
//   }




//***************************************//
//*************Input sketch*************//
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
  quantitiesInput = createInputWithLabel('Quantities:', 10, 135, '1,3,4,9,20,23,24,29');
  dataFormatInput = createInputWithLabel('Data Format:', 10, 160, 'json');

  // Create and position fetch data button
  let fetchDataButton = createButton('Fetch Data');
  fetchDataButton.mousePressed(fetchData);
  fetchDataButton.position(10, dataFormatInput.y + 25);

  // Fetch data from JPL Horizons API
  fetchData();

  // Draw the canvas
  // draw();

  stepSlider = createSlider(0, 100, 0); // Set initial range, you can adjust this
  stepSlider.position(10, fetchDataButton.y + 25);
  stepSlider.input(updateSelectedDate); // Call updateSelectedDate when the slider is moved
  stepSlider.input(updateDate);
    // Inside the setup() function
selectedDate = createP('Selected Date: ');
selectedDate.position(10, dataFormatInput.y + 3 * 25);
}

let speed = 1;
// Draw function
function draw() {
  fill(250);
  noStroke();
  rect(0, dataFormatInput.y + 3 * 25, width, height);
  push();
  textSize(16);
  fill(0);
  textSize(12);
  let sliderValue = stepSlider.value();
  let sliderMin = stepSlider.attribute('min');
  let sliderMax = stepSlider.attribute('max');
  let selectedStep = new Date(stepSlider.value()); // stepSlider.attribute('min')
  let mappedStep = map(sliderValue, sliderMin, sliderMax, 0, totalSteps);


  for (let j = 0; j < dataObjects.length; j++) {
    text(`True Anomaly ${dataObjects[j].ta[mappedStep]} `, 10, dataFormatInput.y + 5 * 25);
    text(`semiMajorAxis ${dataObjects[j].a[mappedStep]} `, 10, dataFormatInput.y + 6 * 25);
    text(`eccentricity ${dataObjects[j].ec[mappedStep]} `, 10, dataFormatInput.y + 7 * 25);
    text(`inclination ${dataObjects[j].in[mappedStep]} `, 10, dataFormatInput.y + 8 * 25);
    text(`LongAscNode ${dataObjects[j].om[mappedStep]} `, 10, dataFormatInput.y + 9 * 25);
    text(`perifocus ${dataObjects[j].w[mappedStep]} `, 10, dataFormatInput.y + 10 * 25);
    pop();
    
    let trueAnomaly = dataObjects[j].ta.map(Number); // True anomaly. The actual angle between the object and the point of closest approach to the Sun.
    let semiMajorAxis = dataObjects[j].a.map(Number);  //Semi-major axis. The average distance from the Sun, defining the size of the orbit.
    let eccentricity = dataObjects[j].ec.map(Number); // Eccentricity of the orbit. How much an orbit deviates from being a perfect circle. It's a number between 0 and 1.// determine how stretched or circular the orbit is
    let inclination = dataObjects[j].in.map(Number); //crucial for showing how tilted the orbit is relative to the plane of the solar system. It affects the orientation of the orbit.
    let LongAscNode = dataObjects[j].om.map(Number); //determines where the orbit crosses the reference plane (usually the plane of the solar system). It defines the starting point of the orbit in a 2D view.
    let perifocus  = dataObjects[j].w.map(Number); //indicates where the closest approach to the Sun occurs in the orbit. Together with OM, it helps define the orientation of the orbit.
 

    let time = trueAnomaly;
    translate(width / 2, height / 2);

    // Draw circle
    noFill();
    stroke(0);
    ellipse(0, 0, 300, 300);

    // Plot data points on the circle
    for (let i = 0; i < time.length; i++) {
      let angle = map(time[i], min(time), max(time), 0, 360);
      let radius = map(eccentricity[i], min(eccentricity), max(eccentricity), 50, 150);

      let x = radius * cos(angle);
      let y = radius * sin(angle);

      // Draw data points
      fill(0);
      ellipse(x, y, 8, 8);
    }
 
 
  }

}

function updateDate() {
  let dayOfYear = stepSlider.value();
  time.current = new Date(time.current.getFullYear(), 0, 1);
  time.current.setDate(dayOfYear);
  dateToTransDate();
}

//   function setup() {
//     createCanvas(400, 400);
//     angleMode(DEGREES);
//    //parseEphemerisData(inputText);
//    //console.log(orbitalData);
//     //time = orbitalData.time;
//     //eccentricity = orbitalData.eccentricity;
//   // const { time, eccentricity } = parseEphemerisData(inputText);

// // console.log('Time:', time);
// // console.log('Eccentricity:', eccentricity);
//   }

//   function draw() {
//     background(255);
//     translate(width / 2, height / 2);

//     // Draw circle
//     noFill();
//     stroke(0);
//     ellipse(0, 0, 300, 300);

//     // Plot data points on the circle
//     for (let i = 0; i < time.length; i++) {
//       let angle = map(time[i], min(time), max(time), 0, 360);
//       let radius = map(eccentricity[i], min(eccentricity), max(eccentricity), 50, 150);

//       let x = radius * cos(angle);
//       let y = radius * sin(angle);

//       // Draw data points
//       fill(0);
//       ellipse(x, y, 8, 8);
//     }
//   }

// Function to update slider range
function updateSliderRange(startDate, endDate) {
  // Your logic to update the slider range goes here
  // Set the minimum and maximum values of the slider based on the start and end dates
   const startTimestamp = new Date(startDate).getTime();
  //  console.log(startTimestamp);
   const endTimestamp = new Date(endDate).getTime();
  //  console.log(endDate);
    //console.log(endTimestamp);
   const stepMilliseconds = parseStepSize(stepSizeInput.value());
    const totalSteps = Math.floor((endTimestamp - startTimestamp) / stepMilliseconds);

  // Update the slider range
  stepSlider.attribute('min',startTimestamp);
   stepSlider.attribute('max',endTimestamp);
   stepSlider.attribute('step', stepMilliseconds);
  // stepSlider.value(startTimestamp); // Set the initial value to the start date
}

function updateSelectedDate() {
  let currentDate = new Date(startDateInput.value());
  // console.log(currentDate);
  let selectedStep = stepSlider.value();
  //console.log(stepSlider.value());
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
  dataObjects = []; // clear the array

  // Get values from input elements
  let command = commandSelect.value();
  let observerLocation = observerLocationInput.value();
  let startDate = startDateInput.value();
  let endDate = endDateInput.value();
  let stepSize = stepSizeInput.value();
  let quantities = quantitiesInput.value();
  let dataFormat = dataFormatInput.value();
  let output = "ELEMENTS";



  // Set the dynamic parameters in the apiUrl
  apiUrl = `api?format=${dataFormat}&COMMAND='${command}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='${output}'&CENTER='${observerLocation}'&START_TIME='${startDate}'&STOP_TIME='${endDate}'&STEP_SIZE='${stepSize}'&QUANTITIES='${quantities}'`;
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
         // Calculate the number of steps between Start Date and End Date
         //totalSteps = calculateTotalSteps(startDate, endDate, stepSize);
        // updateSelectedDate(); 
      //updateSelectedDate(); //updates the slider
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
  // Your logic to parse the step size and return it in milliseconds
  // For example, if step size is in days, you can convert it to milliseconds
  // Return the step size in milliseconds
  const daysInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
  return parseInt(stepSize) * daysInMilliseconds; // Assuming step size is in days
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
  

  for (let i = 0; i < groupedObjects.length; i++) {
    EC.push(extractValues(groupedObjects[i].line2, 'EC'));
    IN.push(extractValues(groupedObjects[i].line2, 'IN'));
    OM.push(extractValues(groupedObjects[i].line3, 'OM'));
    W.push(extractValues(groupedObjects[i].line3, 'W'));
    TA.push(extractValues(groupedObjects[i].line4, 'TA'));
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
    w: W
  }
  console.log(newDataObject);
  dataObjects.push(newDataObject);
  return newDataObject;
}

// Function to display data
function displayData() {
  textSize(16);
  let a = createA(`https://ssd.jpl.nasa.gov/api/horizons.${apiUrl}`, 'link to the data', '_blank');
  a.position(width/2, 0);

  textSize(16);
  fill(0);
  text("Fetched Data:", 10, dataFormatInput.y + 3 * 25);
  textSize(12);
  text(`data Objects: ${dataObjects.length}`, 10, dataFormatInput.y + 4 * 25);

  let yPos = 275; // Initial yPos value

  for (let j = 0; j < dataObjects.length; j++) {
    text("Planet: " + dataObjects[j].planet, 100, yPos, windowWidth);
    text("EC: " + dataObjects[j].ec, 100, yPos + 20, windowWidth);
    text("TA: " + dataObjects[j].ta, 100, yPos + 50, windowWidth);

    yPos += 110;
  }
}