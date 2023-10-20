window.onload = function () {
//console.log("we are loaded");

function myFunction() {
  //document.getElementById("demo").innerHTML = "Hello World";
  console.log("click!");
}


let responseDiv = document.querySelector("#responseContainer");
document.querySelector("#findData").addEventListener(
  "click",
  async function () {
    let exp = document.querySelector("#inputRegex").value;
    let response = await fetch(
    `http://localhost:8080/sendSearch?${new URLSearchParams({exp})}`
  );
  console.log("the response::: ");
  responseDiv.innerHTML ='';
  let jsonRep = await response.json();
  for(let i=0; i<jsonRep.length; i++){
    //console.log(jsonRep[i]);
    let c = document.createElement("div");
    c.classList.add("t");


    // <button type="button" class="collapsible">Open Collapsible</button>
    // <div class="content">
    //   <p> content </p>
    // </div>
   
    c.innerHTML = 
    `<button type="button" class="collapsible">
    <span class = "title"> title: </span> ${jsonRep[i].postTitle}<br/> 
    </button> 

   <div class="content" style="display:none">
   <span class = "body"> body: </span> ${jsonRep[i].postBody}<br/>
   <span class = "numComments"> comments: </span> ${jsonRep[i].numComments}<br/>
   </div>`;

    responseDiv.appendChild(c);
    myFunction(c);
  }
  }
); //click

//collapsible
// var coll = document.getElementsByClassName("collapsible");
// var i;
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       console.log("click");
//       content.style.display = "block";
//     }
//   });
// }

// document.querySelector("#collapsible").addEventListener('click', function(){
//   console.log("click!");
// });

function myFunction(c) {
  c.addEventListener("click", function(){
  //console.log(c);
  var content = c.querySelector('.content');
  if (content.style.display === "block") {
    content.style.display = "none";
  }
  else if (content.style.display === "none") {
    console.log("open");
    content.style.display = "block";
  }
  });
}

};