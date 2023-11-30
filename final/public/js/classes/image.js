class Image{
    constructor(data){
        this.filename = data.filename;
        this.timeStamp = data.creationTimestampMs;
    } 

    display(){
        text(this.filename, width/2, height/2);
        // console.log(this.timeStamp);
        // text(this.timeStamp, width/2, height/2 - 10);
    }


}
