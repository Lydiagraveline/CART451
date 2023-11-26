// Define the hingeMatches variable as an empty array
let hingeMatches = [];
let matches = [];
let index = 0;

// images
let flowerimg;
let flower2img;
let witheredimg;
let witheringimg;
let budImg;
let buddingImg;

let onABubble;// = false;

let state = "start" //can be "start", "hinge"
let button;


// Function to initialize the canvas and visualization
function initialize() {
  // Make a fetch request to load JSON data
  fetch('/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      // Handle the loaded JSON data
      if (result) {
        hingeMatches = result;
        console.log("Found data!", hingeMatches);
        // createObjects();
      } else {
        console.error('Data not found');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Call the initialize function
initialize();

//set up
function setup() {
  onABubble = false;
  canvasWidth = windowWidth;
  canvasHeight = windowHeight; 
  createCanvas(canvasWidth, canvasHeight);

  // load the images
  flowerimg = loadImage('images/fullflower.png');
  flower2img = loadImage('images/flower.png');
  witheredimg = loadImage('images/withered.png');
  witheringimg = loadImage('images/withering.png');
  budImg = loadImage('images/bud.png');
  buddingImg = loadImage('images/budding.png');


  createNewButton(button, "Press to continue", 10, 10, changeState());

  // button.mousePressed(function(){button.remove()})
}


function createNewButton(btn, text, x, y, callback){
  btn = createButton(text)
  btn.position(x,y)
  btn.mousePressed(callback);
}

function changeState(){
if (state == "start"){
  state = "hinge";
}
}

function draw(){
  background(245);
  if (state == 'start') {
    
  } else if (state == 'hinge') {
    background(245);
    fill(255, 255, 255, 50);
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].contains(mouseX, mouseY)) {
        matches[i].changeColor(200);
        onABubble = true;
      } else {
        matches[i].changeColor(255);
        onABubble = false;
      }
    if (matches[i].withered()){
      // console.log("bye");
    }
    else if (matches[i].filter()){
       matches.splice(i, 1);
       //mouseReleased();
       mousePressed()
    } else {
     // matches[i].init();
      matches[i].display();
    }
  
  }
   
  } 
  // else if (state == '3') {
  //   draw3();
  // }

;

}

function handleHingeFlowers() {
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      matches[i].changeState();
      onABubble = true;
    }
  }
  if (onABubble === false){
      let index = floor(random(hingeMatches.length))
      let newMatch = new Match(hingeMatches[index]);
      newMatch.init();
      matches.push(newMatch);
      }
}

// draw the flowers 
function touchMoved() {
  handleHingeFlowers();
  }

  // add one flower at a time, and change the flower state
function mousePressed() {
  handleHingeFlowers();

}


