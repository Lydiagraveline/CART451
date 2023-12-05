class Inferences {
    constructor(data) {
      this.dataObj = data;
      this.source = data.source;
      this.topicsArray = data.topic;
    //   this.visualElements = [];
    //   this.setup();
    }
  
  
    draw() {
        text("hi", 50, 50);
       // console.log(this.topicsArray);

       const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

       // Set initial position for topics
       let xPos = 50;
       let yPos = 50;
   
         // Draw circles for each unique topic
         this.topicsArray.forEach(topic => {
            fill(colorScale(topic));
            ellipse(xPos, yPos, 50, 50);
            fill(255);
            textAlign(CENTER, CENTER);
            text(topic, xPos, yPos);
            
            // Update position for the next topic
            xPos += 100;
            if (xPos > width - 50) {
              xPos = 50;
              yPos += 100;
            }
         })
     }
        
    }


class InferenceElement {
    constructor(data) {
      this.data = data;
      // Additional initialization logic if needed
    }
  
    draw() {
      // Visualization logic for each inference element
      // You can use p5.js functions to draw on the canvas
    }
  }