class ImageClass{
    constructor(data){
        this.filename = data.filename;
        this.timeStamp =  this.formatTimestamp(int(data.creationTimestampMs));
        this.path = 'media/' + this.filename
        this.image = loadImage(this.path);
    } 

    displayImage(img, x, y, minSize, maxSize) { 

        // Calculate the scaling factor based on the maximum size
        let scaleFactor = Math.max(minSize / max(img.width, img.height), maxSize / max(img.width, img.height));
      
        // Calculate the scaled width and height
        let scaledWidth = img.width * scaleFactor;
        let scaledHeight = img.height * scaleFactor;
      
        // Draw the image at the specified position
        image(img, x, y, scaledWidth, scaledHeight);
      }

    display(){
        text(this.filename, width/2, height/2 + 200);
        text(this.timeStamp, width / 2, height / 2 + 215);

        this.displayImage(this.image, width / 2, height / 2, 100, 300);
    }

    formatTimestamp(millis) {
        let date = new Date(millis);
         return date
    }

    click(){
        if (imgIndex < images.length - 1){
          if (mouseX > width/2){
            imgIndex++
          } else if (mouseX < width/2 && imgIndex > 0){
            imgIndex--
          }
        } else {
        imgIndex = 0;
        }
      }
}
