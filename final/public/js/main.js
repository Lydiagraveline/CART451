
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
        console.log(path, result);
        // console.log(result.length);
        const classObject = createClassObj(result, className);
        return classObject; //return the data as an object
      } catch (error) {
        console.error('Error fetching hinge data:', error);
        return [];
      }
  }

//preload the data & media
async function preload(){
    // Fetch data and assign them to the variables
   hingeData = await fetchData('/hingeData');//initialize();
   instagramData = await fetchData('/instagramData');
   images = await fetchData('/mediaData', Image);
}

function createClassObj(result, className){
    if(result, className){ //wait for the data to be fetched, and for the class to be defined
        let array = [];
        for(let i=0; i<result.length; i++){ 
         array.push(new className(result[i]));
        }
         return array;
    } else {
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

 }





//Saving for later

//  function parseIGData() {
//     let chats = [];
//     let participants = [];
//     for (let i=0; i<inbox.length; i++){
//       chats.push(inbox[i].title);
//       participants.push(inbox[i].participants);
//     }
//     console.log(participants);
//   }