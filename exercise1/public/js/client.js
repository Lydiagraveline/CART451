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
  //console.log("the response::: ");
  responseDiv.innerHTML ='';
  let jsonRep = await response.json();
  for(let i=0; i<jsonRep.length; i++){
    //console.log(jsonRep[i]);
    let c = document.createElement("div");
    c.classList.add("t");
   
    /* collapsible / button based on tutorial: */
    /* https://www.w3schools.com/howto/howto_js_collapsible.asp */
    c.innerHTML = 
    `<button type="button" class="collapsible">
    <span class = "title"></span> ${jsonRep[i].postTitle}<br/> 
    </button> 

   <div class="content" style="display:none">
   <span class = "body"></span> ${jsonRep[i].postBody}<br/>
   <span class = "numComments"> comments: </span> ${jsonRep[i].numComments}<br/>
   </div>`;

    responseDiv.appendChild(c);
    myFunction(c);
  }
  }
); //click

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