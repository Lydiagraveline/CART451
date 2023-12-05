
class Word {
    constructor(data) {
     // this.term = data//data.term;
     // this.score = data.tfidf;
     this.term = data.term;
     this.pos = data.pos;
     this.tfidf = data.tfidf;
      this.wiggle = random(-PI/100, PI/100);
      this.wiggle = random(-PI/100,PI/100)
      // this.setup();
      // this.text = text
      // console.log(this.term);
     
    }
    
    get tw() { return textWidth(this.term) }
    get w() { return this.tw + Word.PADDING + Word.PADDING }
    get h() { return Word.h; }
    
    static get h() { return textSize() + 2 * Word.PADDING }
  }
  
Word.PADDING = 2

class Container {
    constructor(word,position) {
      this.words = [word];
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
        text(word.term,-word.w/2 + Word.PADDING, textSize()/2 - textDescent()/2 - Word.PADDING)
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
        for (let i = 0; i < c.words.length; i++) {
          // Changes made to ensure the new Word instance receives 'c.words[i]' as an object
          newContainers.push(new Container(new Word(c.words[i]), createVector(x, c.y)));
          x += Container.INTER + 1 + c.words[i].w;
        }
        return newContainers;
      }
    }
      
    Container.INTER = 2


class Magnets {
    constructor(wordsArray) {
      this.data = wordsArray;
      this.words = [];
      this.containers = [];
      this.dragIndex = null;
      this.overlapIndex = null;
      this.settings = {
        filterBy: 'tfidf', // Initial filter option ('tfidf' or 'frequency')
      };
      this.setup();
    }

    setFilterOption(option) {
       this.settings.filterBy = option;
       this.setup(); // Re-run setup when the filter option changes
    }

    setup() {
        /// "f"
      const posFreqThresholds = {
        NN: 3,  // nouns
        VB: 2,  // verbs
        PRP: 1,  // personal pronouns
        IN: 705,   // prepositions
        CC: 800,   // coordinating conjunctions
        MD: 900,   // modal verbs
        DT: 600,   // determiners
        RB: 700,   // adverbs
        WP: 850,   // wh-pronouns
        VBP: 905,  // verb phrases
        JJ: 110,   // Threshold for adjectives
        N: 90,     // Threshold for nouns (new)
        NNS: 90,   // Threshold for plural nouns
        PRP$: 500,  // Threshold for possessive pronouns
        TO: 90,    // Threshold for infinitive marker "to"
        UH: 70,    // Threshold for interjections
        VBD: 95,   // Threshold for past tense verbs
        VBG: 60,   // Threshold for gerunds
        VBZ: 120,  // Threshold for third person singular present verbs
        WDT: 60,   // Threshold for wh-determiners
        WRB: 60,   // Threshold for wh-adverbs
        EX: 100,
        VBN: 100,
        RBR: 100,
        NNP: 100,
        RBS: 100,
        FW: 100,
        JJR: 10, // warmer better closer cooler etc
        JJS: 10, // best least biggest
      };

      /// "t"
      const posTfidfThresholds = {
        EX: 1,
        NN: 0.3,  // nouns

        VB: 1,  // verbs
        VBD: 0.9,  // Threshold for past tense verbs
        VBG: 0.5,   // Threshold for gerunds

        PRP: 0.5,  // personal pronouns
        IN: 0.4,   // prepositions
        RB: 0.5,   // adverbs
        WP: 0.1,   // wh-pronouns //what who whatever 
        JJ: 0.3,   // Threshold for adjectivesf
        NNS: 0.5,   // Threshold for plural nouns
        JJR: 0.1, // warmer better closer cooler etc
        JJS: 0.1, // best least biggest
        JJ: 0.3,   // Threshold for adjectives
     
        VBN: 1,
        RBR: 1,
        // NNP: 0.5,
        RBS: 1,
        // FW: 0.1,
        WP: 1,   // wh-pronouns
        VBP: 1,  // verb phrases
        
        // N: 1,     // Threshold for nouns (new)
        NNS: 1,   // Threshold for plural nouns
        PRP$: 1,  // Threshold for possessive pronouns
        // TO: 1,    // Threshold for infinitive marker "to"
        // UH: 0.5,    // Threshold for interjections
 
        VBZ: 1,  // Threshold for third person singular present verbs
        // WDT: 0.5,   // Threshold for wh-determiners
        WRB: 1,   // Threshold for wh-adverbs
      };

          // Clear existing magnets
    this.words = [];
    this.containers = [];

      this.words = this.data
      .filter((wordData) => {
        const threshold = this.settings.filterBy === 'tfidf'
          ? (posTfidfThresholds[wordData.pos] || 100)
          : (posFreqThresholds[wordData.pos] || 100);

        return wordData[this.settings.filterBy] !== undefined && wordData[this.settings.filterBy] >= threshold;
      })
      .map((wordData) => new Word(wordData));


      this.words.push()
      this.layoutWords();
      }

      layoutWords() {
        this.words.sort((a, b) => a.pos.localeCompare(b.pos));
      
        let x = Word.PADDING;
        let dy = Word.h;
        let y = 50 + dy;
      
        const nextPositionFor = (item) => {
          if (x + item.tw > width) {
            x = Container.INTER;
            y += dy + Container.INTER;
          }
          const p = { x, y };
          x += item.w + Container.INTER;
          return p;
        };
        for (let i = 0; i < this.words.length; i++) {
          const word = this.words[i];
      
          // Check if the next word has a different POS
          if (i > 0 && word.pos !== this.words[i - 1].pos) {
            // Start x at 0 when a new POS starts
            x = 0;
            // Leave a significant gap between words with the same POS on the y-axis
            y += Container.INTER +28;
          }
      
          const position = nextPositionFor(word);
          // console.log(word);
          const container = new Container(word, { x: position.x, y: position.y });
          this.containers.push(container);
        }
      }

      draw(){
        // background(245);

        for( const container of this.containers ) {
          container.draw()  
        }
      }

      mousePressed() {
        for (let i = 0; i < this.containers.length; i++) {
          if (this.containers[i].isMouseOver()) {
            this.dragIndex = i;
            this.containers[i].setDragBG();
            // redraw();
            return;
          }
        }
      }
    
      mouseDragged() {
        if (this.dragIndex !== null) {
          this.handleDrag();
          // redraw();
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
        // redraw();
      }
    
      doubleClicked() {
        for (let i = 0; i < this.containers.length; i++) {
          if (this.containers[i].isMouseOver()) {
            if (this.containers[i].words.length > 1) {
              const c = this.containers[i];
              this.containers.splice(i, 1);
              this.containers = [...this.containers, ...Container.separate(c)];
            }
            // redraw();
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