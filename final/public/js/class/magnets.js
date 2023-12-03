class Word {
    constructor(text) {
      this.text = text
      this.wiggle = random(-PI/100,PI/100)
    }
    
    get tw() { return textWidth(this.text) }
    get w() { return this.tw + Word.PADDING + Word.PADDING }
    get h() { return Word.h; }
    
    static get h() { return textSize() + 2 * Word.PADDING }
  }
  
Word.PADDING = 2

class Container {
    constructor(word,position) {
      this.words = [word]
      this.position = position;
      this.bg = color('white')
    }
    
    get x() { return this.position.x }
    get y() { return this.position.y }
    get midx() { return this.x + this.w/2 }
    
    get w() { 
      return this.words
        .reduce( (width, word) => width + word.w, 0) +
        Container.INTER * (this.words.length - 1)
    }
    get h() { return Word.h }  
  
    addText(text) { this.words.push(new Word(text))}
    addWord(word) { this.words.push(word)}
    
    setDragBG() { this.bg = color(255,0,0,16) }
    setDefaultBG() { this.bg = color('white') } 
    setOverlapBG() { this.bg = color(0,0,255,16) }
    
    isMouseOver() { 
      return collidePointRect(mouseX,mouseY,this.position.x,this.position.y,this.w, Word.h)
    }

    draw() {
        push()
        translate(this.position.x, this.position.y) 
        let x = 0;
        for( let word of this.words ) {
          this.drawWord(word,x);
          x += word.w + Container.INTER
        }
        pop()   
      }  
      
      drawWord(word,x) {
        push()
        translate(x+word.w/2,word.h/2)
        rotate(word.wiggle)
        fill(this.bg)
        rect(-word.w/2,-word.h/2,word.w,word.h)
        fill("black")
        text(word.text,-word.w/2 + Word.PADDING, textSize()/2 - textDescent()/2 - Word.PADDING)
        pop()
      }

      add(otherContainer) {
        this.words = [...this.words, ...otherContainer.words]
      }
      
      overlapsWith(otherContainer) {
        return Container.overlap(this,otherContainer)
      }
      
      static overlap(a,b) { return collideRectRect(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h) }
  
      static separate(c) {
        const newContainers = []
        let x = c.x
        for( let i = 0; i < c.words.length; i++ ) {
          newContainers.push( 
            new Container( 
              new Word( c.words[i].text ),
              createVector( x, c.y )
            )
          );
          x += Container.INTER + 1 + c.words[i].w
        }
        return newContainers;
      }
    }
      
    Container.INTER = 2


class Magnets {
    constructor() {
      this.words = [];
      this.containers = [];
      this.dragIndex = null;
      this.overlapIndex = null;
      this.instructions = [
        "r to reset",
        "click and drag",
        "hover to combine",
        "double click to separate",
        "up and down to resize",
      ];
    }

    setup() {
        this.words = ['word1', 'word2', 'word3']; // Replace this with your actual word list or loadStrings("magneticPoetryWordList.txt");
        this.words = shuffle(this.words).map((word) => new Word(word));
        this.layoutWords();
        redraw();
      }

      layoutWords() {
        this.containers = [];
        const centerX = width / 2; // Center of the canvas X
        const centerY = height / 2; // Center of the canvas Y
        let angle = 0; // Initial angle for positioning words around the center
      
        const nextPositionFor = (item) => {
          const radius = 100; // Adjust the radius as needed
          const x = centerX + cos(angle) * radius;
          const y = centerY + sin(angle) * radius;
      
          angle += radians(45); // Adjust the angle increment as needed
      
          const p = { x, y };
          return p;
        };
      
        for (const word of this.words) {
          this.containers.push(new Container(word, nextPositionFor(word)));
        }
      
        redraw();
      }
      
      draw(){
         background('white')

        for( const container of this.containers ) {
          container.draw()  
        }

      }

      mousePressed() {
        for (let i = 0; i < this.containers.length; i++) {
          if (this.containers[i].isMouseOver()) {
            this.dragIndex = i;
            this.containers[i].setDragBG();
            redraw();
            return;
          }
        }
      }
    
      mouseDragged() {
        if (this.dragIndex !== null) {
          this.handleDrag();
          redraw();
        }
      }
    
      handleDrag() {
        this.containers[this.dragIndex].setDragBG();
        this.updateDragPosition();
        this.handleOverlap();
      }
    
      updateDragPosition() {
        this.containers[this.dragIndex].position.x += movedX;
        this.containers[this.dragIndex].position.y += movedY;
      }
    
      handleOverlap() {
        this.overlapIndex = null;
        for (let i = 0; i < this.containers.length; i++) {
          if (this.dragIndex !== i) {
            if (
              !this.overlapIndex &&
              this.containers[this.dragIndex].overlapsWith(
                this.containers[i]
              )
            ) {
              this.containers[i].setOverlapBG();
              this.overlapIndex = i;
            } else {
              this.containers[i].setDefaultBG();
            }
          }
        }
      }
    
      mouseReleased() {
        if (this.dragIndex !== null) {
          this.containers[this.dragIndex].setDefaultBG();
          if (this.overlapIndex !== null) {
            this.containers[this.overlapIndex].setDefaultBG();
            if (
              this.containers[this.dragIndex].x <
              this.containers[this.overlapIndex].midx
            ) {
              this.containers[this.dragIndex].add(
                this.containers[this.overlapIndex]
              );
              this.containers.splice(this.overlapIndex, 1);
            } else {
              this.containers[this.overlapIndex].add(
                this.containers[this.dragIndex]
              );
              this.containers.splice(this.dragIndex, 1);
            }
          }
        }
        this.dragIndex = null;
        this.overlapIndex = null;
        redraw();
      }
    
      doubleClicked() {
        for (let i = 0; i < this.containers.length; i++) {
          if (this.containers[i].isMouseOver()) {
            if (this.containers[i].words.length > 1) {
              const c = this.containers[i];
              this.containers.splice(i, 1);
              this.containers = [
                ...this.containers,
                ...Container.separate(c),
              ];
            }
            redraw();
            return;
          }
        }
      }
    
      keyPressed() {
        if (keyCode === UP_ARROW) {
          textSize(textSize() + 1);
          this.layoutWords();
        }
        if (keyCode === DOWN_ARROW) {
          textSize(textSize() - 1);
          this.layoutWords();
        }
        if (key === "r") {
          this.layoutWords();
        }
      }
      
}