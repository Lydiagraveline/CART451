class Image{
    constructor(data){
        this.fileName = data.filename;
        this.timeStamp = data.timeStamp;
    } 
    
    display(){
        text("this is an image", width/2, height/2);
    }
}
