// Define the hingeMatches variable as an empty array
let hingeMatches = [];
let matches = [];
let index = 0;

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
        createObjects();
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

function createObjects(){
  // for (let i = 0; i < hingeMatches.length; i++) {
  //   matches.push(new Match(hingeMatches[i]));
  //   //console.log(matches);
  // }
}

//set up
function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight; 
  createCanvas(canvasWidth, canvasHeight);
}

function draw(){
  background(51);
  fill(255, 255, 255, 50);
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].contains(mouseX, mouseY)) {
      matches[i].changeColor(255);
    } else {
      matches[i].changeColor(0);
    }
  if (matches[i].withered()){
    // console.log("bye");
  }
  else if (matches[i].filter()){
     matches.splice(i, 1);
     mouseClicked();
  } else {
   // matches[i].init();
    matches[i].display();
  }

}
}

function mouseClicked() {
  let onABubble = false;
  
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      // matches.splice(i, 1);
      matches[i].changeState();
      matches[i].logInfo();
      onABubble = true;
    }
  }
  
  if (onABubble === false){
      //createNewBubble();
      let index = floor(random(hingeMatches.length))
      let newMatch = new Match(hingeMatches[index]);
      newMatch.init();
      matches.push(newMatch);
      }
}

// class
class Match {
  constructor(match) {
    // this.id = match._id;
    this.x = mouseX//random(width - 50);
    this.y = mouseY//random(height);
    this.brightness = 0;
    this.size = 70;
    this.color = color(random(255), random(255), random(255));
    this.like = match.like || false //'no-like'//[];
    this.matched = match.match || false //'no-match'//[];
    this.block = match.block || false //[];
    this.chats = match.chats || false //'no-chats'//[];
    this.met = match.we_met || false
    this.text;
    this.state; // "sent like", "matched", 
  }

  init() {
    // console.log("init")
     if (this.like != false){
       this.state = "sent like"
     } else if (this.like === false && this.matched != false ) {
        this.state = "matched";
     } else if (this.like === false &&  this.matched === false ){
      this.state = "filter";
     }

    //  if (this.met === false) {
    //   this.state = "filter";
    //  } else if (this.met != false){
    //   this.state = "met";
    //  }
  }

  changeState() {
    // I SENT A LIKE
    if (this.state === "sent like"){
      if (this.matched != 'no-match'){ /// THEY LIKED ME! WE MATCH 
        this.state = "matched";
      } else if (this.matched === 'no-match'){ /// THEY DIDN'T LIKE ME BACK
        this.state = "didn't match";
      }
    } 

    // WE MATCHED!
     if (this.state === "matched"){
      if (this.chats === false){ //WE NEVER SPEAK WITH EACHOTHER
        // console.log("no chats");
        this.state = "no chats"
        
    } else if (this.chats){  // WE CHIT-CHAT
      this.state = "chatted"
    }
  }

   // DID WE MEET? 
    if (this.state === "chatted"){
    //  this.state = "met?"
    if (this.met === false){
      this.state = "didn't meet"
    } else {
      this.state = "we met"
    }
   }

   if (this.state === "we met") {
   // this.state = "end";
   }

    console.log("state = "+this.state);
    this.text = this.state;
  }
  

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.size) {
      return true;
    } else {
      return false;
    }
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  grow() {
    // Increase the size of the bubble
    this.size += 1;
  }

  // end of the hinge match lifecycle
  wither(){
  this.size -= 1;
  if (this.size < 0) {
    this.state = "end";
    this.withered();
  }
  }

  withered() {
    if (this.state == "end"){
    return true;
    }
    }

  filter() {
    if (this.state == "filter"){
    //  this.size += 1;
    //  if (this.size > 100) {
      return true
    //  }
    }
  }

  logInfo() {
    // console.log("INFO");
    // console.log("like " + this.like);
    // console.log("matched " + this.matched);
    // console.log("chats " + this.chats);
    // console.log("met " + this.met);
    // let blockType;
    // for(let i = 0; i < this.block.length; i++) {
    // blockType = this.block[i].block_type 
    // }
    // console.log("blocked " + blockType);
  }
  

  display() {
    if (this.state == "no chats" || this.state == "didn't meet"){
      this.wither();
    }
    const offset = 20
    this.text = this.state;
    stroke(this.color);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.size * 2);

    fill(this.color);
    noStroke();
    textWrap(CHAR);
    textAlign(CENTER);
    text(this.text, this.x, this.y, this.size );

      // if(! this.like == 'no-like'){
      // for (let i = 0; i < this.like.length; i++) {
      //   if (this.like[i].timestamp){
      //     const time = this.like[i].timestamp;
      //     // this.text = "i send a like";
      //   }
      // }
      // } //else 
     //if(!this.matched === 'no-match'){
    //   for (let i = 0; i < this.matched.length; i++) {
    //     // const time = this.matched[i].timestamp;
    //   //  text("matched", this.x, this.y, this.size );
    //  }
     //} //else if(this.blocked.length > 0){
    //  for(let i = 0; i < this.block.length; i++) {
    //       const blockType = this.block[i].block_type 
    //        text(blockType, this.x, this.y, this.size );
    //     }
    // }


  }
}