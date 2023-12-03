// Define the initial state and image index
let state = 'loading'; // can be loading, loaded, main menu, gallery, hinge
let imgIndex = 0; // the currently displayed image

// Variables to store fetched data
let hingeData = [];
let hingeMatches = [];
let matches = [];
let index = 0;
let images = [];
let myUserData = [];
let magneticPoetry;

let hoverState;

let onABubble = false;

// Interactive text objects
let interactiveTexts = [];
let introTxt, backTxt, hingeTxt, galleryTxt, inferencesTxt;

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
    hingeData = await fetchData('/hingeData', AllMatches);
    hingeMatches = await fetchData('/hingeData');
    console.log(hingeMatches);
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

function changeStateFromMain(newState){
  console.log('click');
  if (state === 'main menu') {
    console.log('Changing state to ', newState);
    state = newState;
  }
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

function changeStateToInferences() {
  if (state === 'main menu') {
    console.log('Changing state to inferences');
    state = 'inferences';
  }
}

//set up
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    backTxt = new InteractiveText('go back', 50, 50, 'word', changeStateToMain);
    hingeTxt = new InteractiveText('hinge', 50, 100, 'word');
    galleryTxt = new InteractiveText('gallery', 50, 150, 'word');
    inferencesTxt = new InteractiveText('inferences', 50, 200, 'word');

    magneticPoetry = new Magnets();
    console.log(magneticPoetry);
    magneticPoetry.setup();
  
    introTxt = new InteractiveText('For data you are, and to data you shall return', 
      width/2, height/2, 'word', changeStateToMain);
    if (state !== 'loading'){
      //console.log("hingematches array ",hingeData);
    }
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
    push();
    textAlign(LEFT);
    galleryTxt.display();
    hingeTxt.display();
    inferencesTxt.display();
    pop();

    if (hingeTxt.checkHover()){
      hingeData.forEach((match) =>{
        match.display();
     });
      //  draw(ellipse, width/2, height/2, 50);
    }
  } else if (state == 'gallery') {
    images[imgIndex].display();
  } else if (state == 'hinge') {
    handleHingeFlowers();
  } else if (state == 'inferences'){
    // noLoop();
    textAlign(LEFT);
    magneticPoetry.draw();

  }

  // Display "go back" text when the state is not loading, loaded, or main menu
  if (state !== 'loading' && state !== 'loaded' && state !== 'main menu') {
    backTxt.display();
    
    hoverState = backTxt.checkHover();
  }
 }

function mousePressed(){
  // Handle clicks based on the current state
  if (state == "loaded") {
    introTxt.click();
  } else if (state == "main menu") {
    galleryTxt.click(()=>{
      state = "gallery";
    });
    hingeTxt.click(()=>{
      state = "hinge";
    });
    inferencesTxt.click(()=>{
      state = "inferences";
    });
  } else if (state !== 'loading' && state !== 'loaded' && state !== 'main menu') {
    backTxt.click();
  }

  // Handle clicks on images when the state is 'gallery'
  if (state == 'gallery') {
    images[imgIndex].click();
  }

  if (state == 'hinge' && hoverState == false){
     createHingeFlowers();
  }

  if (state == 'inferences' && hoverState == false){
    magneticPoetry.mousePressed();
  }
}


// draw the flowers 
function touchMoved() {
  if (state == 'hinge'  && hoverState == false){
    createHingeFlowers();
  }
}

function mouseDragged() {
  magneticPoetry.mouseDragged();
}

function mouseReleased() {
  magneticPoetry.mouseReleased();
}

function doubleClicked() {
  magneticPoetry.doubleClicked();
}

function keyPressed() {
  magneticPoetry.keyPressed();
}


function createHingeFlowers() {
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      matches[i].handleClick();
      onABubble = true;
    }
  }
  if (onABubble === false) {
    console.log("create flower");
    let index = floor(random(hingeMatches.length));
    let newMatch = new Match(hingeMatches[index]);
    matches.push(newMatch);
  }
}

function handleHingeFlowers() {
  onABubble = false; // Reset onABubble before handling matches

  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      matches[i].handleHover();
      onABubble = true;
    } else {
      matches[i].handleHoverOutside();
    }

    if (matches[i].withered()) {
      matches.splice(i, 1);
    } else if (matches[i].filter()) {
      matches.splice(i, 1);
      mousePressed();
    } else {
      matches[i].display();
    }
  }
}

