// Define the hingeMatches variable as an empty array
let hingeMatches = [];

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
        console.log("Found data!", result);
        hingeMatches = result;
        updateHingeMatchesContainer();
      } else {
        console.error('Data not found');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

    // Function to update the content of the hingeMatches container
    function updateHingeMatchesContainer() {
      const hingeMatchesContainer = document.getElementById('hingeMatchesContainer');
      hingeMatchesContainer.innerHTML = '<pre>' + JSON.stringify(hingeMatches, null, 2) + '</pre>';
    }

// Call the initialize function
initialize();
