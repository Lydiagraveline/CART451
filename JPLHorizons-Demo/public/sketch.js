//***************************************//
//*************Orbit sketch*************//
//**************************************//


  // Define orbit data
  const orbitData = [
    { TA: 3.364406687861443E+02, A: 1.082074884029348E+08 },
    { TA: 3.365082014108534E+02, A: 1.082074874932650E+08 },
    { TA: 3.365757345666674E+02, A: 1.082074865865390E+08 },
    { TA: 3.366432682522504E+02, A: 1.082074856827587E+08 },
    { TA: 3.367108024662663E+02, A: 1.082074847819261E+08 },
    { TA: 3.367783372073731E+02, A: 1.082074838840426E+08 },
    { TA: 3.368458724742340E+02, A: 1.082074829891104E+08 },
    { TA: 3.369134082655075E+02, A: 1.082074820971311E+08 },
    { TA: 3.369809445798484E+02, A: 1.082074812081064E+08 },
    { TA: 3.370484814159161E+02, A: 1.082074803220382E+08 },
    { TA: 3.371160187723680E+02, A: 1.082074794389283E+08 },
    { TA: 3.371835566478499E+02, A: 1.082074785587782E+08 },
    { TA: 3.372510950410175E+02, A: 1.082074776815897E+08 },
    { TA: 3.373186339505240E+02, A: 1.082074768073647E+08 },
    { TA: 3.373861733750173E+02, A: 1.082074759361046E+08 },
    { TA: 3.374537133131458E+02, A: 1.082074750678113E+08 },
    { TA: 3.375212537635553E+02, A: 1.082074742024864E+08 },
    { TA: 3.375887947248888E+02, A: 1.082074733401314E+08 },
    { TA: 3.376563361957976E+02, A: 1.082074724807481E+08 },
    { TA: 3.377238781749242E+02, A: 1.082074716243383E+08 },
    { TA: 3.377914206609056E+02, A: 1.082074707709033E+08 },
    { TA: 3.378589636523841E+02, A: 1.082074699204447E+08 },
    { TA: 3.379265071480002E+02, A: 1.082074690729644E+08 },
    { TA: 3.379940511463926E+02, A: 1.082074682284638E+08 },
    { TA: 3.380615956461941E+02, A: 1.082074673869443E+08 },
    { TA: 3.381291406461769E+02, A: 1.082074665483182E+08 }
    // Add more data points as needed
  ];

      // Data
      const time = [2460262.5, 2460262.54, 2460262.58, 2460262.62, 2460262.67, 2460262.71, 2460262.75, 2460262.79, 2460262.83, 2460262.88, 2460262.92, 2460262.96, 2460263, 2460263.04, 2460263.08, 2460263.13, 2460263.17, 2460263.21, 2460263.25, 2460263.29, 2460263.33, 2460263.38, 2460263.42, 2460263.46, 2460263.5];
      const eccentricity = [6.738130829209159E-03, 6.738124572668056E-03, 6.738118335671727E-03, 6.738112118243478E-03, 6.738105920408658E-03, 6.738099742191551E-03, 6.738093583615592E-03, 6.738087444706527E-03, 6.738081325486645E-03, 6.738075225981252E-03, 6.738069146214817E-03, 6.738063086209784E-03, 6.738057045989468E-03, 6.738051025579249E-03, 6.738045025001735E-03, 6.738039044279926E-03, 6.73803308343749E-03, 6.738027142497279E-03, 6.738021221483386E-03, 6.738015320418358E-03, 6.738009439325006E-03, 6.738003578225056E-03];

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


let dataObjects = [];
let canvasWidth, canvasHeight;
let dataString;
let headerInfo;
let ephemerisData;
let commandSelect, commandInput, observerLocationInput, startDateInput, endDateInput, stepSizeInput, quantitiesInput, dataFormatInput;
let apiUrl;
let targetBody;
let ephemerisBlock;
let ephemData;

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
  observerLocationInput = createInput('500@10'); //500@10 =  Sun (body center) // 500@399 = Default value for Earth

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


  // Extract the ephemeris block
  // let ephemerisBlock = extractEphemerisBlock(dataString);

  // if (ephemerisBlock) {
  //   console.log(ephemerisBlock);
  // } else {
  //   console.log("No ephemeris block found.");
  // }


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
  let output = "ELEMENTS"; //OBSERVER //VECTORS //ELEMENTS if ELEMENTS, then observer location needs to be 500@10 (the sun)

  // Set the dynamic parameters in the apiUrl
  apiUrl = `api?format=${dataFormat}&COMMAND='${command}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='${output}'&CENTER='${observerLocation}'&START_TIME='${startDate}'&STOP_TIME='${endDate}'&STEP_SIZE='${stepSize}'&QUANTITIES='${quantities}'`;

  // Use the fetch API to make the request
  fetch(apiUrl)

    .then(response => {
      //console.log(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      //console.log('Raw Data:', data); // Add this line
      dataString = data;
      ephemerisBlock = extractEphemerisBlock(data);

      
      if ( dataFormat === "json"){
        //console.log(dataFormat)
        const newDataObject = parseData(JSON.parse(dataString));
        ephemData = parseEphemerisData(ephemerisBlock);
        //console.log(ephemData);
      } else {
        console.log("data format = "+dataFormat)
        const newDataObject = parseData(dataString);
      }
      
      //const newDataObject = parseJsonData(JSON.parse(dataString));

      
      // Call a function to display the data
      displayData();
    })
    .catch(error => console.error('Error fetching data:', error));
}


function extractEphemerisBlock(text) {
  // Find the start and end indices of the ephemeris block
  let start = text.indexOf("$$SOE");
  let end = text.indexOf("$$EOE");

  // Check if both start and end indices are found
  if (start !== -1 && end !== -1) {
    // Extract the ephemeris block
    let ephemerisBlock = text.substring(start + 5, end).trim();
    return ephemerisBlock;
  } else {
    // Return null if either start or end index is not found
    return null;
  }
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

// Function to get nested property with checks
function getNestedProperty(obj, propertyPath, defaultValue = undefined) {
  return propertyPath.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
}

function parseValue(dataBlock, key) {
  let regex = new RegExp(`${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${massRegex.source}`);
  let match = dataBlock.match(regex);

  console.log(match);

  if (match) {
    let exponent = parseInt(match[1].trim());
    let unit = match[2].trim();
    let value = parseFloat(match[3].trim());
    let uncertainty = match[5] ? parseFloat(match[5].trim()) : null;

    return { value, exponent, unit, uncertainty };
  } else {
    return { value: 'N/A', exponent: 'N/A', unit: 'N/A', uncertainty: 'N/A' };
  }
}

function groupItems(array, groupSize) {
  var result = [];

  for (var i = 0; i < array.length; i += groupSize) {
    var group = {};
    for (var j = 0; j < groupSize && i + j < array.length; j++) {
      group['line' + (j + 1)] = array[i + j];
    }
    result.push(group);
  }

  return result;
}

function parseEphemerisData(data) {
  const lines = data.split('\\n');
  const parsedData = {
      time: [],
      eccentricity: []
  };



  let nonEmptyLines = lines.filter(line => line.trim() !== '');
  for (let i = 0; i < nonEmptyLines.length; i++) {
    if (nonEmptyLines[i] === "") {
      console.log("Empty element at index:", i);
    }




    // Remove extra spaces from the time and date strings
    // time = time.trim();
    // date = date.trim();
  
    // // Create an object to store the result
    // let result = {
    //   time: time,
    //   date: date
    // };

    //groupedData = lines.slice(i, i + 5);
    //groupedData.push(group);
      // const line = lines[i].trim();

      // if (line !== "") {
      //     const components = line.split(/\s+/);

      //     const time = parseFloat(components[0]);
      //     const eccentricity = parseFloat(components[2]);

      //     parsedData.time.push(time);
      //     parsedData.eccentricity.push(eccentricity);
      // }
      //console.log(lines.slice(i, i + 5));
  }
  let groupedObjects = groupItems(nonEmptyLines, 5);
  console.log(groupedObjects);
  //let nonEmptyLines = lines.filter(line => line.trim() !== '');
 // console.log(arrayOfObjects);

  // let timeData
  //  for(let i = 0; i < arrayOfObjects.length; i++){
  //  // timeData = arrayOfObjects[i].line1;
  //   console.log ("line " + i + arrayOfObjects[i].line1);
  //  }
  
 // console.log(nonEmptyLines);
//console.log(lines[6]);
 // return groupedData;
 return groupedObjects;
 //return lines; 
  //return parsedData;
}




function parseData(data) {
  let result = data.result;
  let planetName = commandSelect.value();
  //let version = data.signature.version;
  let source = data.signature.source;
  let meanRadiusMatch = data.result.match(/Vol\. Mean Radius \(km\) =\s+([\d.]+)\+\-([\d.]+)/i);
  let meanRadius = meanRadiusMatch ? meanRadiusMatch[1] : 'N/A'; // Use 'N/A' or another default value if there's no match

  let massRegex = /Mass\s+x?\s*10\^(-?\d+)\s*\((\w)\)\s*=\s*([\d.]+)\s*(?:\+\-\s*([\d.]+)\s*)?/i;

  let dataBlock = "Mass x10^23 (kg)      = 1.307+-0.018";
  let massMatch = dataBlock.match(massRegex);
  let mass = massMatch ? massMatch[3] : 'N/A';
  
  //console.log(mass);
  
 // let massMatch = data.result.match(/Mass\s+x?\s*10\^(-?\d+)\s*\((\w)\)\s*=\s*([\d.]+)\s*(\+\-\s*([\d.]+)\s*)?/i);
  //let mass = massMatch ? massMatch[3] : 'N/A';
  //let mass = parseValue(result, 'Mass');
  //let mass  = parseValue(result, 'Mass x10^26 (kg)')
  //let equatorialRadiusMatch = data.result.match(/Equat\. radius \(1 bar\) =\s+([\d.]+)/i);
  //let equatorialRadius = equatorialRadiusMatch ? equatorialRadiusMatch[1] : 'N/A';
  // let startDate = data.result.match(/Start time\s+: (.*?)\n/)[1];
  // let stopDate = data.result.match(/Stop  time\s+: (.*?)\n/)[1];

  let newDataObject = {
    planet: planetName, 
    mass: mass,
   // massExponent: mass.exponent,
   // massUnit: mass.unit,
    //version: version,
    source: source,
    meanRadius: meanRadius,
   // equatorialRadius:  equatorialRadius,
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
  let yPos = 275 + i * 60; // Adjusted yPos for each data object

  for (let j = 0; j < ephemData.length; j++) {
    text("object " + j + ": ", 20, yPos, windowWidth);
    text("line 1 " + ephemData[j].line1, 100, yPos, windowWidth);
    text("line 2 " + ephemData[j].line2, 100, yPos + 20, windowWidth);
    text("line 3 " + ephemData[j].line3, 100, yPos + 40, windowWidth);
    text("line 4 " + ephemData[j].line4, 100, yPos + 60, windowWidth);
    text("line 5 " + ephemData[j].line5, 100, yPos + 80, windowWidth);


    yPos += 110;
  }
}
    // // Iterate through data objects and display information
    // for (let i = 0; i < dataObjects.length; i++) {
    //   //let currentDataObject = dataObjects[i];
    //   //let yPos = dataFormatInput.y + (5 + i) * 25;
    //   let yPos = 275;
      
    //  // text(`planet: ${currentDataObject.planet}`, 10, yPos);
    //  // text(`meanRadius: ${currentDataObject.meanRadius}`, 80, yPos);
    //  // text(`mass: ${currentDataObject.mass}`, 200, yPos);
    //   //console.log(currentDataObject.mass);
    //  // text(`equator radius: ${currentDataObject.equatorialRadius}`, 300, yPos);
    //  //text(ephemerisBlock, 20, yPos, 900);
    //  for (let j = 0; j < ephemData.length; j++) {
    //   //text("object "+j+": "+ephemData[j], 20, yPos, windowWidth);
    //   text("object "+j+": ", 20, yPos, windowWidth);
  
     
    //   for (let k = 0; k < ephemData[j].length; k++){
    //     console.log(ephemData[j].line1);
    //      //text(ephemData[k].line1, 100, yPos, windowWidth);
    //   }
     
     
    //   yPos += 60;
    //  }
     
    //}
 
}


// Helper function to parse a specific value from the data block
function parseValue(dataBlock, key) {
  let regex = new RegExp(`${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*([^\\n]+)`); //`${key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*=\\s*([^\\n]+)`
  let match = dataBlock.match(regex);
  return match ? match[1].trim() : 'N/A';
}