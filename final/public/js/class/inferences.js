class Inferences {
    constructor(inferencesArray) {
      this.data = inferencesArray;
      this.visualElements = [];
      this.setup();
    }
  
    setup() {
    //   this.visualElements = this.data.map((inferenceData) => new InferenceElement(inferenceData));
      // Additional setup logic if needed
    }
  
    draw() {
    //   for (const visualElement of this.visualElements) {
        // visualElement.draw();
    //   }
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