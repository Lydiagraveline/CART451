
// variables to store fetched data
let hingeData = [];
let instagramData = [];

// Function to fetch data from the server
async function fetchData(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(path, result);
        return result;
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