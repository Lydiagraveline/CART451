// class for hinge matches
class AllMatches {
    constructor(match) {
        this.x = width/2//mouseX//random(width - 50);
        this.y = random(height);
        this.w = random(50, 200);
        this.h = random(50, 200);
        this.brightness = 0;
        this.size = random(90, 400);
        this.color = color(random(255), random(255), random(255));
        this.state = "match";
        this.yOffset = random(-5, 5);
    }

    display() {
    stroke(this.color);
    strokeWeight(1);
    noFill();
    rect(this.x, this.y, this.w * 2, this.h*2)
    ellipse(this.x, this.y, this.size * 2);

    noStroke();
    const offset = 20
    this.text = this.state;
 

    fill(this.color);
    noStroke();
    textWrap(CHAR);
    textAlign(CENTER);
    text(this.text, this.x, this.y+this.yOffset, this.w );
    }

  }