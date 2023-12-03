// Define the initial state and image index
let state = 'loading'; // can be loading, loaded, main menu, gallery, hinge
let imgIndex = 0; // the currently displayed image

// Variables to store fetched data
let hingeData = [];
let images = [];
let myUserData = [];

// Interactive text objects
let interactiveTexts = [];
let introTxt, backTxt, hingeTxt, galleryTxt;

// Function to fetch data from the server
async function fetchData(path, className) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return createClassObj(result, className);
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    return [];
  }
}

// Preload the data & media
async function preload() {
  try {
    // Fetch data and assign them to the variables
    hingeData = await fetchData('/hingeData', Match);
    images = await fetchData('/mediaData', ImageClass);
    myUserData = await fetchData('/userData');

    // Set the state once data is fetched
    state = "loaded";

    // Call setup function again 
    setup();
  } catch (error) {
    console.error('Error during preload:', error);
  }
}

// Function to create class objects from fetched data
function createClassObj(result, className) {
  if (result && className) {
    return result.map(item => new className(item));
  } else {
    console.log("class not defined");
    return result;
  }
}

// Callbacks for state changes
function changeStateToMain() {
  console.log('Changing state to main menu');
  state = 'main menu';
}

function changeStateToHinge() {
  if (state === 'main menu') {
    console.log('Changing state to hinge');
    state = 'hinge';
  }
}

function changeStateToGallery() {
  if (state === 'main menu') {
    console.log('Changing state to gallery');
    state = 'gallery';
  }
}

//set up
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    backTxt = new InteractiveText('go back', 50, 50, 'word', changeStateToMain);
    hingeTxt = new InteractiveText('hinge', 50, 50, 'word', changeStateToHinge);
    galleryTxt = new InteractiveText('gallery', 50, 100, 'word', changeStateToGallery);
  
    introTxt = new InteractiveText('For data you are, and to data you shall return', 
      width/2, height/2, 'word', changeStateToMain);
  }

// Draw function to display content based on the state
function draw(){
  background(245);

  // Display the current state at the top of the canvas
  text(state, width/2 , 50);
  
  // Display content based on the current state
  if (state == 'loading') {
    text('loading data...', width/2, height/2 + 200);
  } else if (state == 'loaded') {
    introTxt.display();
  } else if (state == 'main menu') {
    galleryTxt.display();
    hingeTxt.display();
  } else if (state == 'gallery') {
    images[imgIndex].display();
  }

  // Display "go back" text when the state is not loading, loaded, or main menu
  if (state !== 'loading' && state !== 'loaded' && state !== 'main menu') {
    backTxt.display();
  }
 }

function mousePressed(){
  // Handle clicks based on the current state
  if (state == "loaded") {
    introTxt.click();
  } else if (state == "main menu") {
    galleryTxt.click();
    hingeTxt.click();
  } else if (state !== 'loading' && state !== 'loaded' && state !== 'main menu') {
    backTxt.click();
  }

  // Handle clicks on images when the state is 'gallery'
  if (state == 'gallery') {
    images[imgIndex].click();
  }
}



