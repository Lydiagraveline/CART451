class InteractiveText {
    constructor(text, x, y, typeMethod, callback) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.fontSize = 16;
        this.textColor = color(0);
        this.callback = callback;
        this.typeMethod = typeMethod; // can be 'letter' or 'word' or none
        this.typingIndex = 0;
        this.lastMillis = 0;
        this.isHovered = false;
    }

    display() {
        this.checkHover();
        push();
        // Set styles based on hover state
        if (this.isHovered) {
          fill('magenta');
          cursor('grab');
        } else {
          fill(0);
          cursor(ARROW);
        }
    
        // Display text based on typeMethod
        if (this.typeMethod === "letter" || this.typeMethod === "word") {
          this.typeWriter(this.text);
        } else {
          text(this.text, this.x, this.y);
        }
        pop();
    }
  
    checkHover() {
    // Check if the mouse is over the text
      this.isHovered = mouseX > this.x - textWidth(this.text) / 2 &&
             mouseX < this.x + textWidth(this.text) / 2 &&
             mouseY > this.y - this.fontSize / 2 &&
             mouseY < this.y + this.fontSize / 2;    
             return this.isHovered; 
    }
  
    click() {
        // Trigger callback if clicked and a callback is provided
        if (this.isHovered && this.callback) {
          this.callback();
        }
     }
    
    //https://editor.p5js.org/cfoss/sketches/SJggPXhcQ
    typeWriter(message) {
        // Display text gradually like a typewriter
        text(message.substring(0, this.typingIndex), this.x, this.y);
        
        if (millis() > this.lastMillis + 200) {
          this.typingIndex += 1;
    
          // If typeMethod is "word," skip to the next word
          if (this.typeMethod === "word") {
            while (message.charAt(this.typingIndex) !== ' ' &&
                   this.typingIndex < message.length) {
              this.typingIndex += 1;
            }
          }
    
          this.lastMillis = millis();
        }
      }
    }
  