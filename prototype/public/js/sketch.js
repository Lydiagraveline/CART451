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
let randomIndex;
let mappedIndex;
let customAudiences = []; // Declare customAudiences as a global variable
let advertiserNames = [];
let randomAdvertiser = 'hi';
let site = 'hi';

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
         s.textSize(16);
         s.text(site, s.width/2, s.height/2 + 25);
         }; //draw

         s.mouseMoved = function() {
          //check if mouse is within the bounds of the canvas
            if (0 < s.mouseX && s.mouseX < s.width ){
              if (0 < s.mouseY && s.mouseY < s.height ){
                randomIndex =  s.int(s.map(s.mouseX, 0, s.width, 0,data.length));
                customAudiences = data[randomIndex].custom_audiences;
                mappedIndex = s.int(s.map(s.mouseY, 0, s.height, 0, customAudiences.length));
                randomAdvertiser = customAudiences[mappedIndex].advertiser_name;
                site = data[randomIndex].source.site;
              }
            } else {
              console.log("out of bounds");
            }
         };

  };


let dots = [];
let data_count = 1;  //Initializing data_count, how many data lines to read
let planet_dist;     //The distance between a planet and user's mouse 



  var myp5 = new p5(firstSketch, 'c1');
  
  // Second Sketch
  var secondSketch = function(s) {
    s.setup = function(){
      s.createCanvas(400, 400);
      s.background(100);
  }

  s.draw = function(){
      s.background(199,21,133);
      s.fill(255,255,255);
      s.textSize(24);
      s.textAlign(s.CENTER);
      //s.text(randomAdvertiser , s.width/2, s.height/2);
       s.textSize(16);
     //  s.text(site, s.width/2, s.height/2 + 25);
       }; //draw


       class Advertiser {
        constructor() {
          this.x;                  //X coordinate for the planet                    
          this.y;                  //Y coordinate for the planet 
          this.radius;      //Radius of the planet image
         // this.design_num;         //Type of planet design from planet_designs
          //this.data;               //String data of the planet
         //this.data_split;         //Splits the data into an array of its data
          
          this.init();
          this.printData();
        }

          //This function initializes all the variables for each exoplanet.
  init() {
    //this.design_num = int(random(5));
    this.radius = 10;
    
    this.x = mouseX;
    this.y = mouseY;
    
    // this.data = exoplanet_data[data_count];
    // this.data_split = split(this.data, ',');
    // if(data_count != exoplanet_data.length) {
    //   data_count++;
    // }
    // else {
    //   print("All planets printed!");
    // }
  }

  draw() {
   // image(planet_designs[this.design_num], this.x, this.y, planet_designs[this.design_num].width/5, planet_designs[this.design_num].height/5); 
   ellipse(this.x, this.y, this.radius);  
  }



      }

      

};



  
  var myp5_2 = new p5(secondSketch, 'c2');