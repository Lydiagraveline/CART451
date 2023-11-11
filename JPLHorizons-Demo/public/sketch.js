let headerInfo;
let ephemerisData;

function processHeader(data) {
  const lines = data.trim().split('\n');
  let headerInfo = {};
  for (const line of lines) {
    const [key, value] = line.split(':').map(item => item.trim());
    if (key && value) {
      headerInfo[key] = value;
    }
  }
  return headerInfo;
}

function processEphemeris(data) {
  const lines = data.trim().split('\n').slice(24);
  const ephemerisData = lines.map(line => {
    const [date, time, ra, dec, apmag, sbrt, delta, deldot, sot_r, sto_r, cnst] = line.trim().split(/\s+/);
    return {
      date,
      time,
      ra,
      dec,
      apmag,
      sbrt,
      delta,
      deldot,
      sot_r,
      sto_r,
      cnst,
    };
  });
  return ephemerisData;
}

function renderSolarSystem() {
  // Display header information
  textSize(16);
  text('Header Information:', 20, 30);
  let yPos = 50;
  for (const key in headerInfo) {
    text(`${key}: ${headerInfo[key]}`, 20, yPos);
    yPos += 20;
  }

  // Display ephemeris data
  textSize(14);
  text('\nEphemeris Data:', 20, yPos + 20);
  yPos += 40;

  for (const entry of ephemerisData) {
    const displayText = `${entry.date} ${entry.time} - RA: ${entry.ra}, Dec: ${entry.dec}`;
    text(displayText, 20, yPos);
    yPos += 20;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Use the local server API to fetch data
  const apiUrl = '/api?format=text&COMMAND=\'499\'&OBJ_DATA=\'NO\'&MAKE_EPHEM=\'YES\'&EPHEM_TYPE=\'OBSERVER\'&CENTER=\'500@399\'&START_TIME=\'2006-01-01\'&STOP_TIME=\'2006-01-20\'&STEP_SIZE=\'1%20d\'&QUANTITIES=\'1,3,4,9,20,23,24,29\'';

  fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
      headerInfo = processHeader(data);
      ephemerisData = processEphemeris(data);
      renderSolarSystem();
    })
    .catch(error => console.error('Error fetching data:', error));
}


