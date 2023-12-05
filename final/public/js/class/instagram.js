

class Instagram{
    constructor(data){
        this.chat = data.title;
        this.messages = data.messages;
        this.lydiaMessages
       this.setup();
    } 

    setup() {
    // Filter messages where sender_name is Lydia
    this.lydiaMessages = this.messages.filter((message) => message.sender_name === 'Lydia');

    // Create an array of strings from the content of Lydia's messages
    this.lydiaMessageArray = this.lydiaMessages
      .filter((message) => message.content && message.content.trim() !== '')
      .map((message) => message.content);

    // Do something with the array, for example, log it
   // this.lydiaMessageArray.forEach((messageContent) => console.log(messageContent));
//    console.log(this.lydiaMessageArray);
  }

}




//Saving for later

//  function parseIGData() {
//     let chats = [];
//     let participants = [];
//     for (let i=0; i<inbox.length; i++){
//       chats.push(inbox[i].title);
//       participants.push(inbox[i].participants);
//     }
//     console.log(participants);
//   }