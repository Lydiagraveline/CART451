//main.js
let state = 'loading' //can be loading, loaded
let imgIndex = 0 //the currently displayed image
// variables to store fetched data
let hingeData = [];
let instagramData = [];
let images = [];
let img;

// Function to fetch data from the server
async function fetchData(path, className) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const classObject = createClassObj(result, className);
        // console.log(result);
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
    hingeData = await fetchData('/hingeData');
    // instagramData = await fetchData('/instagramData', Instagram);
    images = await fetchData('/mediaData', ImageClass);
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
        return [];
    }
}

//set up
function setup() {
    console.log("setting up");
    createCanvas(windowWidth, windowHeight);
  }

//draw
function draw(){
     background(245);
    text(state, width/2, height/2 - 10);
    if (state == 'loading'){
        text('loading data...', width/2, height/2 + 200);
        
    } else if(state == 'loaded' ){
        text('Lydia', width/2, height/2); 
        images[imgIndex].display();
    }
 }

function mouseClicked(){
  if (imgIndex < images.length - 1){
  imgIndex++
  } else {
  imgIndex = 0;
  }
}