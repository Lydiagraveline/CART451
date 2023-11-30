class ImageClass{
    constructor(data){
        this.filename = data.filename;
        this.timeStamp =  "time stamp"//this.formatTimestamp(int(data.creationTimestampMs));
        this.path = 'media/' + this.filename
         this.image = loadImage(this.path);
         //('../../media/' + this.filename, () => {
        //     console.log('Image loaded:', this.filename);
        // });
    } 

    initialize(){
        return this.image = loadImage(this.path);
    }


    display(){
        // let img = loadImage('../media/aroundthemill.jpg');
        text(this.filename, width/2, height/2 + 200);
        //const formattedDate = this.formatTimestamp(this.timeStamp * 1000);
        text(this.timeStamp, width / 2, height / 2 + 215);
        //text(formattedDate, width / 2, height / 2 + 30);
        image(this.image, 0, 0);
    }

    formatTimestamp(millis) {
        let date = new Date(millis);
         return date
    }
}
