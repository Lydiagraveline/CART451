//main.js
let state = 'loading' //can be loading, loaded
let imgIndex = 0 //the currently displayed image
// variables to store fetched data
let hingeData = [];
let instagramData = [];
let images = [];
let myUserData = [];

let interactiveTexts = [];

//typewriter
 var index = 0
 var lastMillis = 0;

 let displayedTextIndex = 1;

// Function to fetch data from the server
async function fetchData(path, className) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
          const classObject = createClassObj(result, className);
          console.log(classObject);
          return classObject; //return the data as an object
      } catch (error) {
        console.error('Error fetching hinge data:', error);
        return [];
      }
  }

//preload the data & media
async function preload(){
   try {
    // Fetch data and assign them to the variables
    hingeData = await fetchData('/hingeData', Match);
    // instagramData = await fetchData('/instagramData', Instagram);
    images = await fetchData('/mediaData', ImageClass);
    myUserData = await fetchData('/userData');
    // change the state once data is fetch
    state = "loaded"
    setup(); //cal setup again
} catch (error) {
    console.error('Error during preload:', error);
}
}

function createClassObj(result, className){
    if(result && className){ //wait for the data to be fetched, and for the class to be defined
        let array = [];
        for(let i=0; i<result.length; i++){ 
         array.push(new className(result[i]));
        }
         return array;
    } else {
        console.log("class not defined");
        return result; //return the original result if no class was given 
    }
}

//set up
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    if(state == "loaded"){
      interactiveTexts.push(new InteractiveText('For data you are, and to data you shall return', 
      width/2, height/2, 
      'word', 
      () => {
        interactiveTexts.splice(0, 1);
        cursor(ARROW)
        state = 'main';
        let text = 'name: Lydia \n last name: Graveline';
          createInteractiveText(text, width/2, height/2 - 25, ()=>{
          if (displayedTextIndex <interactiveTexts.length ){
            displayedTextIndex += 1;
          }
          
           state = "test"
        });
        let y = 100;
        let x = 100;
        for(let i=0; i < myUserData.length; i++){
          let nameObject = myUserData[i].name;
          let nameString = JSON.stringify(nameObject, null, 2);
          createInteractiveText(myUserData[i].source, x, y, ()=>{
            //console.log("hi");
          });
          x += 100;
       }
      
        console.log("hi")
    
      }))
    }
  }

//draw
function draw(){
     background(245);
    // text(state, width/2, height/2 - 10);
    if (state == 'loading'){
        text('loading data...', width/2, height/2 + 200);
        
    } else if(state == 'loaded' ){
      for(let i=0; i < displayedTextIndex; i++){
         interactiveTexts[0].display();
      }
    } else if(state == 'main' ){
      text (state, 20, 20);
      for(let i=0; i < displayedTextIndex; i++){
        interactiveTexts[i].display();
     }

    }else if(state == 'gallery' ){
      images[imgIndex].display();
    }
 }

function createInteractiveText(string, x, y, callback){
  // console.log(string);
  let newText = new InteractiveText(
    string,
    x,
    y,
    'typewriter',
    callback
  );
  interactiveTexts.push(newText);
}


function mousePressed(){
  images[imgIndex].mousePressed();

  if(state == 'main'){
  }

  for(let i=0; i < interactiveTexts.length; i++){
    interactiveTexts[i].click();
  }
}


class InteractiveText {
  constructor(text, x, y, typeMethod, callback) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = 16;
    this.textColor = color(0);
    this.callback = callback;
    this.typeMethod = typeMethod; // can be 'typewriter' '
    this.typingIndex = 0;
    this.lastMillis = 0;
  }

  display() {
    push();
    if (this.isCursorOverText()) {
      this.textColor = 'magenta';
      cursor('grab');
    } else {
      cursor(ARROW);
      this.textColor =  color(0);
    }
    fill(this.textColor);
       if(this.typeMethod == "typewriter" || this.typeMethod == "word") {
        this.typeWriter(this.text);
      } else {
        text(this.text, this.x, this.y);
      }
    pop();
  }

  isCursorOverText() {
    // Check if the cursor is within the bounding box of the text
    return mouseX > this.x - textWidth(this.text) / 2 &&
           mouseX < this.x + textWidth(this.text) / 2 &&
           mouseY > this.y - this.fontSize / 2 &&
           mouseY < this.y + this.fontSize / 2;
  }

  click(){
    if (this.callback){
      this.callback();
    }
  
  }
  
  //https://editor.p5js.org/cfoss/sketches/SJggPXhcQ
  typeWriter(message){
  text(message.substring(0, this.typingIndex ), this.x, this.y);
	if (millis() > this.lastMillis + 200) {
		this.typingIndex = this.typingIndex  + 1;
		//ONE WORD AT A TIME
    if (this.typeMethod == "word") {
		while(message.charAt(	this.typingIndex ) != ' ' &&
    this.typingIndex  < message.length){
      this.typingIndex = 	this.typingIndex + 1;
		}
  }
		this.lastMillis = millis();
	}
}

}

