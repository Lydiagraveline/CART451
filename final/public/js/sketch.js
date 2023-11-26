// Define the hingeMatches variable as an empty array
let hingeMatches = [];
let matches = [];
let index = 0;

let flowerimg;
let flower2img;
let witheredimg;
let witheringimg;
let budImg;
let buddingImg;

let onABubble;// = false;


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
  onABubble = false;
  canvasWidth = windowWidth;
  canvasHeight = windowHeight; 
  createCanvas(canvasWidth, canvasHeight);

  flowerimg = loadImage('images/fullflower.png');
  flower2img = loadImage('images/flower.png');
  witheredimg = loadImage('images/withered.png');
  witheringimg = loadImage('images/withering.png');
  budImg = loadImage('images/bud.png');
  buddingImg = loadImage('images/budding.png');
}

function draw(){
  background(245);
  fill(0)
  text(onABubble, 10, 10);
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

function touchMoved() {
  //let onABubble;
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      // matches.splice(i, 1);
      matches[i].changeState();
      //matches[i].logInfo();
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

function mousePressed() {
  
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].contains(mouseX, mouseY)) {
      // matches.splice(i, 1);
      matches[i].changeState();
      matches[i].logInfo();
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

function createNewMatch(){

}

// class
class Match {
  constructor(match) {
    // this.id = match._id;
    this.x = mouseX//random(width - 50);
    this.y = mouseY//random(height);
    this.w = random(50, 200);
    this.h = random(50, 200);
    this.brightness = 0;
    this.size = random(90, 200);
    this.color = color(random(255), random(255), random(255));
    this.like = match.like || false //'no-like'//[];
    this.matched = match.match || false //'no-match'//[];
    this.block = match.block || false //[];
    this.chats = match.chats || false //'no-chats'//[];
    this.met = match.we_met || false
    this.text;
    this.state = "neutral"; // "sent like", "matched", 
    this.img = budImg;
    this.chatIndex = 0;
  }

  init() {
    // console.log("init")
     if (this.like != false){
       this.state = "likeStart"
       this.text = "send like"
      this.img = budImg;
     } else if (this.like === false && this.matched != false ) {
        this.state = "matched";
        this.text = "match";
         this.img = buddingImg;
     } else if (this.like === false &&  this.matched === false ){
      this.state = "filter";
     }

    //  if (this.met === false) {
    //   this.state = "filter";
    //  } else if (this.met != false){
    //   this.state = "met";
    //  }
  }

  //on mouse click
  changeState() {
    // I SENT A LIKE
    if (this.state === "likeStart"){
      if (this.matched != false){ /// THEY LIKED ME! WE MATCH 
        this.state = "matched";
        this.text = "they like me"
        // this.img = flower2img;
        this.img = buddingImg;
      } else if (this.matched === false){ /// THEY DIDN'T LIKE ME BACK
        this.state = "wither";
        this.text = "didn't like me"
      }
    } 

    // WE MATCHED!
     else if (this.state === "matched"){
      if (this.chats === false){ //WE NEVER SPEAK WITH EACHOTHER
        // console.log("no chats");
        this.state = "wither"
        this.text = "we never spoke"
        
    } else {  // WE CHIT-CHAT  
      this.state = "chatting"
    }
  }
    else if ( this.state === "chatting"){
      this.img = flowerimg;
      const body = this.chats[this.chatIndex].body;
      this.text = body;
      console.log(this.chats);
      // Move to the next chat for the next click
      console.log("chatIndex:", this.chatIndex);
      this.chatIndex += 1;

      if (this.chatIndex >= this.chats.length) {
        this.state = "nomorechats";
        this.text = "did we meet?";
         this.chatIndex = 0; // Reset the index for the next cycle
      }
    }

   // DID WE MEET? 
    else if (this.state === "nomorechats"){
    console.log(this.met);
    if (this.met === false){
      this.state = "wither"
      this.text = "no";
    } else {
      this.state = "we met"
      this.text = "yes";
      this.img = flower2img;
    }
   }

   else if (this.state === "we met") {
    this.state = "wither";
   }

    //console.log("state = "+this.state);
    //this.text = this.state;
  }
  

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if ((px>this.x) && (px<this.x+this.w) && (py>this.y) && (py<this.y+this.h)){
      return true
    } else {
      return false;
    }
    // if (d < this.size) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  changeColor(bright) {
     this.brightness = bright;
    //this.img = flowerimg;
  }

  grow() {
    // Increase the size of the bubble
    this.size += 1;
  }

  // end of the hinge match lifecycle
  wither(){
    this.img = witheredimg;
  this.size -= 0.5;
  this.w -= 0.5;
  this.h -= 0.5;
  if (this.w < 5) {
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
    //  console.log("INFO");
    //  console.log("like " + this.like);
    //  console.log("matched " + this.matched);
    // console.log("chats " + this.chats);
    // console.log("met " + this.met);
    // let blockType;
    // for(let i = 0; i < this.block.length; i++) {
    // blockType = this.block[i].block_type 
    // }
    // console.log("blocked " + blockType);
  }
  

  display() {
    if (this.state == "wither"){
      this.wither();
    }

    stroke(this.color);
    strokeWeight(1);
    fill(this.brightness, 125);
    //noFill();
    rect(this.x, this.y, this.w, this.h)
    // ellipse(this.x, this.y, this.size * 2);

    noStroke();
    // Displays the image at point (0, height/2) at half size
    image(this.img, this.x,this.y, this.w, this.h);
    //const offset = 20
    // this.text = this.state;
 

    fill(this.color);
    noStroke();
    textWrap(CHAR);
    textAlign(CENTER);
    text(this.text, this.x, this.y, this.w );

   

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