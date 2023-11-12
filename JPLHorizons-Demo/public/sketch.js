let dataObjects = [];
let canvasWidth, canvasHeight;
let dataString;
let headerInfo;
let ephemerisData;
let commandSelect, commandInput, observerLocationInput, startDateInput, endDateInput, stepSizeInput, quantitiesInput, dataFormatInput;
let apiUrl;
let targetBody;

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

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight; 
  createCanvas(canvasWidth, canvasHeight);

  // Create input elements with labels
  commandSelect = createSelectInput('Command:', 10, 10, planetOptions, commandSelect);


  //reateInputLabel('Command:', 10, 10);
  //commandInput = createInput('399'); // Default value for Mars

  createInputLabel('Observer Location:', 10, 35);
  observerLocationInput = createInput('500@399'); // Default value for Earth

  createInputLabel('Start Date:', 10, 60);
  startDateInput = createInput('2006-01-01');

  createInputLabel('End Date:', 10, 85);
  endDateInput = createInput('2006-01-20');

  createInputLabel('Step Size:', 10, 110);
  stepSizeInput = createInput('1%20d');

  createInputLabel('Quantities:', 10, 135);
  quantitiesInput = createInput('1,3,4,9,20,23,24,29');

  createInputLabel('Data Format:', 10, 160);
  dataFormatInput = createInput('json');

  // Create a button to trigger data fetching
  let fetchDataButton = createButton('Fetch Data');
  fetchDataButton.mousePressed(fetchData);

  // Position input elements
  positionInputs();

   // Position fetch data button
   fetchDataButton.position(10, dataFormatInput.y + 25 ); // Adjust the position as needed

  // Fetch data from JPL Horizons API
  fetchData();
}

function createSelectInput(label, x, y, options, selectVar) {
  createInputLabel(label, x, y);
  selectVar = createSelect();
  selectVar.position(150, y);
  for (let option of options) {
    selectVar.option(option.label, option.value);
  }
  return selectVar; // Return the created select element
}

function fetchData() {
  // Get values from input elements
  command = commandSelect.value();
  observerLocation = observerLocationInput.value();
  startDate = startDateInput.value();
  endDate = endDateInput.value();
  stepSize = stepSizeInput.value();
  quantities = quantitiesInput.value();
  dataFormat = dataFormatInput.value();

  // Set the dynamic parameters in the apiUrl
  apiUrl = `api?format=${dataFormat}&COMMAND='${command}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='${observerLocation}'&START_TIME='${startDate}'&STOP_TIME='${endDate}'&STEP_SIZE='${stepSize}'&QUANTITIES='${quantities}'`;

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
      const newDataObject = parseData(JSON.parse(dataString));
      // Call a function to display the data
      displayData();
    })
    .catch(error => console.error('Error fetching data:', error));
}

function draw() {
  //background(255); // Clear the canvas
   // Clear only the section where data is displayed
   fill(200);
   noStroke();
   rect(0, dataFormatInput.y + 3*25, width, height);
  displayData();
}

function createInputLabel(label, x, y) {
  textAlign(LEFT);
  textSize(14);
  text(label, x, y + 12);
}

function positionInputs() {
  let inputX = 150;
  let inputY = 10;
  let inputSpacing = 25;

  //commandInput.position(inputX, inputY);
  observerLocationInput.position(inputX, inputY + inputSpacing);
  startDateInput.position(inputX, inputY + 2 * inputSpacing);
  endDateInput.position(inputX, inputY + 3 * inputSpacing);
  stepSizeInput.position(inputX, inputY + 4 * inputSpacing);
  quantitiesInput.position(inputX, inputY + 5 * inputSpacing);
  dataFormatInput.position(inputX, inputY + 6 * inputSpacing);
}


function parseData(data) {
  let planetName = commandSelect.value();
  let version = data.signature.version;
  let source = data.signature.source;
  // let meanRadius = data.result.match(/Vol\. mean radius \(km\) = ([\d.]+)/)[1];
  // let startDate = data.result.match(/Start time\s+: (.*?)\n/)[1];
  // let stopDate = data.result.match(/Stop  time\s+: (.*?)\n/)[1];

  let newDataObject = {
    planet: planetName, 
    version: version,
    source: source,
    // meanRadius: meanRadius,
    // startDate: startDate,
    // stopDate: stopDate
  };

  dataObjects.push(newDataObject);
  return newDataObject;
}


function displayData() {
  textSize(16);
  let a = createA(`https://ssd.jpl.nasa.gov/api/horizons.${apiUrl}`, 'link to the data', '_blank');
  a.position(width/2, 0);

  // let b = createA(apiUrl, 'link to the unformatted data', '_blank');
  // b.position(width/2, 20);


  textSize(16);
  fill(0);
  text("Fetched Data:", 10, dataFormatInput.y + 3 * 25);
  textSize(12);
  text(`data Objects: ${dataObjects.length}`, 10,dataFormatInput.y + 4 * 25);

    // Iterate through data objects and display information
    for (let i = 0; i < dataObjects.length; i++) {
      let currentDataObject = dataObjects[i];
      let yPos = dataFormatInput.y + (5 + i) * 25;
      
      //console.log(`Data Object ${i + 1}:`, currentDataObject);
      text(`planet: ${currentDataObject.planet}`, 10, yPos);
    }
}
