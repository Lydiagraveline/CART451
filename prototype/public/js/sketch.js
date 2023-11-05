let data;

// Function to initialize the canvas and visualization
function initializeCanvas(sketch) {
    sketch.preload = function() {
        data = sketch.loadJSON('/data', (result) => {
            if (result) {
              data = result;
            } else {
              console.error('Data not found');
            }
          });
    }
    
    sketch.setup = function() {
      sketch.createCanvas(400, 400);
      sketch.background(100);
    };
  
    sketch.draw = function() {
      sketch.fill(0);
      sketch.textSize(16);
      if (data) {
        sketch.text('Data from MongoDB:', 10, 20);
    
        // Your data visualization code here
      } else {
        sketch.text('No data', 10, 20);
      }
    };
  }

let index;
let customAudiences = []; // Declare customAudiences as a global variable
let advertiserNames = [];
let randomAdvertiser = " ";
let text2 = 'hi';

let pgPos = 0; //for scrolling
  
  // First Sketch
  var firstSketch = function(s) {
    initializeCanvas(s);

    s.setup = function(){
        s.createCanvas(400, 400);
        s.background(100);
        for (let i = 0; i < data.length; i++) {
           // customAudiences = customAudiences.concat(data[i].custom_audiences);
           // data[i].custom_audiences.forEach(collection => advertiserNames.push(collection.advertiser_name));
        };
    }

    s.draw = function(){
        s.background(199,21,133);
        s.fill(255,255,255);
        s.textSize(24);
        s.textAlign(s.CENTER);
        s.text(randomAdvertiser , s.width/2, s.height/2);
        // s.text(text, s.width/2, s.height/2);
        
      
        // s.text(customAudiences[mappedIndex].advertiser_name, s.width / 2, s.height / 2);
         s.textSize(16);
         s.text(text2, s.width/2, s.height/2 + 25);
         }; //draw

         s.mouseMoved= function() {
            let randomIndex =  s.int(s.map(s.mouseX, 0, s.width, 0,data.length));
            //console.log(randomIndex);
            customAudiences = data[randomIndex].custom_audiences;
             let mappedIndex = s.int(s.map(s.mouseY, 0, s.height, 0, customAudiences.length));
             console.log(mappedIndex);
             randomAdvertiser = customAudiences[mappedIndex].advertiser_name;
             let site = data[randomIndex].source.site;

             text = randomAdvertiser;
             text2 = site;
         };

    s.mousePressed = function() {
        index = 0;
    //     let randomIndex = s.floor(s.random(data.length));
    //    // console.log(randomIndex);
    //     customAudiences = data[randomIndex].custom_audiences;
    //     let randomAdvertiserIndex = s.floor(s.random(customAudiences.length));
    //     randomAdvertiser = customAudiences[randomAdvertiserIndex].advertiser_name;
    //     let site = data[randomIndex].source.site;

    //     text = randomAdvertiser;
    //     text2 = site;
        if (index == advertiserNames.length) {
          index = 0;
        }
     }; //mousepress

  };




  var myp5 = new p5(firstSketch, 'c1');
  
  // Second Sketch
  var secondSketch = function(s) {
    initializeCanvas(s);
  };
  var myp5_2 = new p5(secondSketch, 'c2');