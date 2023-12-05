// class for hinge matches
class Match {
    constructor(match) {
      // this.id = match._id;
      this.x = mouseX//random(width - 50);
      this.y = mouseY//random(height);
      this.w = random(50, 200);
      this.h = random(50, 200);
      this.brightness = 0;
      this.size = random(90, 200);
      this.color = color(random(255), random(255), random(255));
      this.like = match.like || false //'no-like'//[];
      this.matched = match.match || false //'no-match'//[];
      this.block = match.block || false //[];
      this.chats = match.chats || false //'no-chats'//[];
      this.met = match.we_met || false
      this.text;
      this.state = "neutral"; // "sent like", "matched", 
      this.budImg; // = loadImage('media/hingeFlowers/bud.png')//budImg;
      this.buddingImg; // = loadImage('media/hingeFlowers/budding.png')//budImg;
      this.flower2img; // = loadImage('media/hingeFlowers/flower.png')
      this.flowerimg; // = loadImage('media/hingeFlowers/fullflower.png')
      this.witheredimg; // =  loadImage('media/hingeFlowers/withered.png')
      this.img //= //loadImage('images/bug.png')//budImg;
      this.chatIndex = 0;
      this.preloadIMGs();
      this.init();
    }

    preloadIMGs(){
      this.budImg = loadImage('media/hingeFlowers/bud.png')//budImg;
      this.buddingImg = loadImage('media/hingeFlowers/budding.png')//budImg;
      this.flower2img = loadImage('media/hingeFlowers/flower.png')
      this.flowerimg = loadImage('media/hingeFlowers/fullflower.png')
      this.witheringimg =  loadImage('media/hingeFlowers/withering.png')
      this.witheredimg =  loadImage('media/hingeFlowers/withered.png')
      this.img = this.budImg;
    }
  
    init() {
      // console.log("init")
       if (this.like != false){
         this.state = "likeStart"
         this.text = "send like"
         this.img = this.budImg;
       } else if (this.like === false && this.matched != false ) {
          this.state = "matched";
          this.text = "match";
          this.img = this.buddingImg;
       } else if (this.like === false &&  this.matched === false ){
        // this.state = "filter";
        this.state = "t";
        this.text = "no like no match";
        this.img = this.witheredimg;
       }
    }
  
    //on mouse click
    changeState() {
      // I SENT A LIKE
      if (this.state === "likeStart"){
        if (this.matched != false){ /// THEY LIKED ME! WE MATCH 
          this.state = "matched";
          this.text = "they like me"
           this.img = this.buddingImg;
        } else if (this.matched === false){ /// THEY DIDN'T LIKE ME BACK
          this.state = "wither";
          this.text = "didn't like me"
        }
      } 
  
      // WE MATCHED!
       else if (this.state === "matched"){
        if (this.chats === false){ //WE NEVER SPEAK WITH EACHOTHER
          // console.log("no chats");
          this.state = "wither"
          this.text = "we never spoke"
          
      } else {  // WE CHIT-CHAT  
        this.state = "chatting"
      }
    }
      else if ( this.state === "chatting"){
         this.img = this.flowerimg;
        const body = this.chats[this.chatIndex].body;
        this.text = body;
        // console.log(this.chats);
        this.chatIndex += 1;
  
        if (this.chatIndex >= this.chats.length) {
          this.img = this.witheringimg;
          this.state = "nomorechats";
          this.text = "did we meet?";
           this.chatIndex = 0; // Reset the index for the next cycle
        }
      }
  
     // DID WE MEET? 
      else if (this.state === "nomorechats"){
      if (this.met === false){
        this.state = "wither"
        this.text = "no";
      } else {
        this.state = "we met"
        this.text = "yes";
        this.img = this.flower2img;
      }
     }
  
     else if (this.state === "we met") {
      this.state = "wither";
     }
    }
    
  
    contains(px, py) {
      let d = dist(px, py, this.x, this.y);
      if ((px>this.x) && (px<this.x+this.w) && (py>this.y) && (py<this.y+this.h)){
        return true
      } else {
        return false;
      }
    }

    handleClick() {
      this.changeState();
    }
  
    handleHover() {
      this.changeColor(200);
    }
  
    handleHoverOutside() {
      this.changeColor(255);
    }
  
  
    changeColor(bright) {
       this.brightness = bright;
      //this.img = this.flowerimg;
    }
  

  
    // end of the hinge match lifecycle
    wither(){
     this.img = this.witheredimg;
    this.size -= 0.5;
    this.w -= 0.5;
    this.h -= 0.5;
    if (this.w < 5) {
      this.state = "end";
      this.withered();
    }
    }
  
    withered() {
      if (this.state == "end"){
      return true;
      }
      }
  
    filter() {
      if (this.state == "filter"){
      //  this.size += 1;
      //  if (this.size > 100) {
        return true
      //  }
      }
    }
  
    logInfo() {
      //  console.log("INFO");
      //  console.log("like " + this.like);
      //  console.log("matched " + this.matched);
      // console.log("chats " + this.chats);
      // console.log("met " + this.met);
      // let blockType;
      // for(let i = 0; i < this.block.length; i++) {
      // blockType = this.block[i].block_type 
      // }
      // console.log("blocked " + blockType);
    }
    
  
    display() {
      if (this.state == "wither"){
        this.wither();
      }
  
       push();
      stroke(this.color);
      strokeWeight(1);
      fill(this.brightness, 125);
      //noFill();
      rect(this.x, this.y, this.w, this.h)
 
        // ellipse(this.x, this.y, this.size * 2);
     
       
  
      noStroke();
      imageMode(CORNER);
      // Displays the image at point (0, height/2) at half size
       image(this.img, this.x,this.y, this.w, this.h);
      //const offset = 20
      // this.text = this.state;
   
  
      fill(this.color);
      noStroke();
      textWrap(CHAR);
      textAlign(CENTER);
      text(this.text, this.x, this.y, this.w );
       pop();
    }
  }