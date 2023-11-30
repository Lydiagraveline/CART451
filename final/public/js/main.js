let state = 'loading' //can be loading, loaded

// variables to store fetched data
let hingeData = [];
let instagramData = [];
let images = [];

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
    hingeData = await fetchData('/hingeData');
    instagramData = await fetchData('/instagramData', Instagram);
    images = await fetchData('/mediaData', Image);
    // change the state once data is fetch
    state = "loaded"
    console.log("changed state to ", state);
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
    createCanvas(windowWidth, windowHeight);
  }

//draw
function draw(){
    background(245);
    if (state == 'loading'){
        text('loading data...', width/2, height/2);
    } else if(state == 'loaded' ){
        images[0].display();
    }


 }