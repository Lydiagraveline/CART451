//let data;
//let data1;
let topicsData;
let advertData;

let customAudiences = []; // Declare customAudiences as a global variable
let advertiserNames = [];

function isMouseWithinCanvas(s) {
  return (0 < s.mouseX && s.mouseX < s.width) && (0 < s.mouseY && s.mouseY < s.height);
}

getRandomAdvertiser = function (s, data) {
  
  //console.log(data);
  let randomIndex = s.int(s.map(s.mouseX, 0, s.width, 0, data.length));
  customAudiences = data[randomIndex].custom_audiences;
  let mappedIndex = s.int(s.map(s.mouseY, 0, s.height, 0, customAudiences.length));
  let randomAdvertiser = customAudiences[mappedIndex].advertiser_name;
  let sourceSite = data[randomIndex].source.site;
  return{
    name:randomAdvertiser,
    site:sourceSite
  };
  //console.log(customAudiences);d
  //return randomAdvertiser;
};

getRandomTopic = function (s, data) {
  
let randomIndex = s.int(s.map(s.mouseX, 0, s.width, 0,  data.length));
console.log( data[randomIndex].topic.length);
let mappedIndex = s.int(s.map(s.mouseY, 0, s.height, 0,  data[randomIndex].topic.length));
randTopic = data[randomIndex].topic[mappedIndex];
let sourceSite = data[randomIndex].source.site;
  return{
    value:randTopic,
    site:sourceSite
  }
}
  

// Function to initialize the canvas and visualization
function initializeCanvas(sketch) {
    //sketch.preload = function() {
      advertData = sketch.loadJSON('/data', (result) => {
            if (result) {
             // data = result;
              advertData = result.data1;
              
              topicsData = result.data2
            
            } else {
              console.error('Data not found');
            }
            
          });
          return advertData;
   // }
    
    // sketch.setup = function() {
    //   sketch.createCanvas(400, 400);
    //   sketch.background(100);
    // };
  
    // sketch.draw = function() {
    //   sketch.fill(0);
    //   sketch.textSize(16);
    //   // if (data) {
    //   //   sketch.text('Data from MongoDB:', 10, 20);
    
    //   //   // Your data visualization code here
    //   // } else {
    //   //   sketch.text('No data', 10, 20);
    //   // }
    // };
  }

//let index;
// let randomIndex;
//let mappedIndex;

//let randomAdvertiser = 'hi';
//let site = 'hi';
  

//////////////////////////////////////////////////////////////////
//                 THE FIRST SKETCH                             //
//////////////////////////////////////////////////////////////////


  // First Sketch
  var firstSketch = function(s) {
    //console.log(advertData);
  let data;
    //initializeCanvas(s);
    //let data =  initializeCanvas(s)
    // console.log(advertData);
    // console.log(data);

    s.preload = function() {
      data = s.loadJSON('/data', (result) => {
        if (result) {
          data = result.data1;
          //console.log(data);
        } else {
          console.error('Data not found');
        }
      });
    }

    s.setup = function(){
        s.createCanvas(400, 400);
        s.background(100);
       // console.log(data);
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].custom_audiences)
           // customAudiences = customAudiences.concat(data[i].custom_audiences);
           // data[i].custom_audiences.forEach(collection => advertiserNames.push(collection.advertiser_name));
        };
    }

    let text = 'move mouse';
    let siteText = 'left and right and up and down';
    s.draw = function(){
        s.background(199,21,133);
        s.fill(255,255,255);
        s.textSize(24);
        s.textAlign(s.CENTER);
        // s.text(randomAdvertiser, s.width/2, s.height/2);
        s.text(text, s.width/2, s.height/2);
         s.textSize(16);
         s.text(siteText, s.width/2, s.height/2 + 25);
         }; //draw

        s.mouseMoved = function() {
          if (isMouseWithinCanvas(s)) {
            let result = getRandomAdvertiser(s, data);
             text = result.name;
             siteText = result.site;
          } else {
           // console.log("Out of bounds");
          }
        }
      
  };

 

   var myp5 = new p5(firstSketch, 'c1');

//////////////////////////////////////////////////////////////////
//                 THE SECOND SKETCH                            //
//////////////////////////////////////////////////////////////////


  
  // Second Sketch
  var secondSketch = function(s) {

    let myAdvertisers = [];
  let distance;   
let data;
  s.preload = function() {
    data = s.loadJSON('/data', (result) => {
      if (result) {
        data = result.data1;
      //  console.log(data);
      } else {
        console.error('Data not found');
      }
    });
  }

    s.setup = function(){
      s.createCanvas(400, 400);
  }

  s.draw = function(){
      s.background(255, 255, 255);
      s.fill(0,0,0);
      //s.textSize(24);
      s.textAlign(s.CENTER);
      //s.text(randomAdvertiser , s.width/2, s.height/2);
      s.textSize(10);
      s.text("click!", s.width/2, s.height/2 + 25);
       
      //Here we continuously draw the planets on the canvas
  for(let i=0; i<myAdvertisers.length; i++) {
    myAdvertisers[i].draw();
    //console.log("call draw");
    distance = s.dist(myAdvertisers[i].x, myAdvertisers[i].y, s.mouseX, s.mouseY);
    myAdvertisers[i].displayData();


  if(distance < myAdvertisers[i].radius) {
  // myAdvertisers[i].displayData();

    }
  }
    }; //draw

s.mouseClicked = function() {
  if (isMouseWithinCanvas(s)) {
  //const result = getRandomAdvertiser(s);
  s.append(myAdvertisers, new Advertiser());
  }
}

class Advertiser {
  constructor() {
    this.x;                          
    this.y;      
    this.radius;      
    this.name = getRandomAdvertiser(s, data).name;
          
    this.init();
  }

  init() {
    //this.design_num = int(random(5));
    this.radius = s.random(20, 50);
    
    this.x = s.mouseX;
    this.y = s.mouseY;
  }

  draw() {
   s.fill(255,255,255);
   s.ellipse(this.x, this.y, this.radius);  
  }

  displayData() {
    s.fill(255, 255, 255);
    //s.rect(s.mouseX, s.mouseY, 500, 120);
    
    s.textAlign(s.CENTER);
    s.fill("black");
    
    s.text(this.name,this.x, this.y);
    //s.text(this.name,s.mouseX+this.radius, s.mouseY+20);
    this.radius += 1;
  }
}
};
var myp5_2 = new p5(secondSketch, 'c2');


// //////////////////////////////////////////////////////////////////
// //                 THE THIRDS SKETCH                            //
// //////////////////////////////////////////////////////////////////
 // Third Sketch
 var thirdSketch = function(s) {
  let data;
    //initializeCanvas(s);
    //let data =  initializeCanvas(s)
    // console.log(advertData);
    // console.log(data);

    s.preload = function() {
      data = s.loadJSON('/data', (result) => {
        if (result) {
          data = result.data2;
          //console.log(data);
        } else {
          console.error('Data not found');
        }
      });
    }

    s.setup = function(){
        s.createCanvas(400, 400);
        s.background(100);
       // console.log(data);
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].custom_audiences)
           // customAudiences = customAudiences.concat(data[i].custom_audiences);
           // data[i].custom_audiences.forEach(collection => advertiserNames.push(collection.advertiser_name));
        };
    }

    let text = 'move mouse';
    let siteText = 'left and right and up and down';
    s.draw = function(){
        s.background(199,21,133);
        s.fill(255,255,255);
        s.textSize(24);
        s.textAlign(s.CENTER);
        // s.text(randomAdvertiser, s.width/2, s.height/2);
        s.text(text, s.width/2, s.height/2);
         s.textSize(16);
         s.text(siteText, s.width/2, s.height/2 + 25);
         }; //draw

        s.mouseMoved = function() {
          if (isMouseWithinCanvas(s)) {
            //console.log(data);
            let result = getRandomTopic(s, data);
             text = result.value;
             siteText = result.site;
          } else {
           // console.log("Out of bounds");
          }
        }
      
  };

var myp5_3 = new p5(thirdSketch, 'c3');

//////////////////////////////////////////////////////////////////
//                 THE FOURTH SKETCH                            //
//////////////////////////////////////////////////////////////////


  
  // Second Sketch
  var fourthSketch = function(s) {

    let myAdvertisers = [];
  let distance;   
let data;
  s.preload = function() {
    data = s.loadJSON('/data', (result) => {
      if (result) {
        data = result.data2;
      //  console.log(data);
      } else {
        console.error('Data not found');
      }
    });
  }

    s.setup = function(){
      s.createCanvas(400, 400);
  }

  s.draw = function(){
      s.background(255, 255, 255);
      s.fill(0,0,0);
      //s.textSize(24);
      s.textAlign(s.CENTER);
      //s.text(randomAdvertiser , s.width/2, s.height/2);
      s.textSize(10);
      s.text("click!", s.width/2, s.height/2 + 25);
       
      //Here we continuously draw the planets on the canvas
  for(let i=0; i<myAdvertisers.length; i++) {
    myAdvertisers[i].draw();
    //console.log("call draw");
    distance = s.dist(myAdvertisers[i].x, myAdvertisers[i].y, s.mouseX, s.mouseY);
    myAdvertisers[i].displayData();


  if(distance < myAdvertisers[i].radius) {
  // myAdvertisers[i].displayData();

    }
  }
    }; //draw

s.mouseClicked = function() {
  if (isMouseWithinCanvas(s)) {
  //const result = getRandomAdvertiser(s);
  s.append(myAdvertisers, new Topic());
  }
}

class Topic {
  constructor() {
    this.x;                          
    this.y;      
    this.radius;      
    this.name = getRandomTopic(s, data).value;
          
    this.init();
  }

  init() {
    //this.design_num = int(random(5));
    this.radius = s.random(20, 50);
    
    this.x = s.mouseX;
    this.y = s.mouseY;
  }

  draw() {
   s.fill(255,255,255);
   s.ellipse(this.x, this.y, this.radius);  
  }

  displayData() {
    s.fill(255, 255, 255);
    //s.rect(s.mouseX, s.mouseY, 500, 120);
    
    s.textAlign(s.CENTER);
    s.fill("black");
    
    s.text(this.name,this.x, this.y);
    //s.text(this.name,s.mouseX+this.radius, s.mouseY+20);
    this.radius += 1;
  }
}
};
var myp5_4 = new p5(fourthSketch, 'c4');
 