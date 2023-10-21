window.onload = function () {
//console.log("we are loaded");

function myFunction() {
  //document.getElementById("demo").innerHTML = "Hello World";
  console.log("click!");
}

//sorted
let responseDiv = document.querySelector("#responseContainer");
document.querySelector("#findData").addEventListener(
  "click",
  async function () {
    //let random = false;
    let exp = document.querySelector("#inputRegex").value;
    let sortMethod = document.querySelector("#sortSelect").value; 
    let response = await fetch(
    `http://localhost:8080/sendSearch?${new URLSearchParams({exp, sortMethod})}`
  );
  responseDiv.innerHTML ='';
  let jsonRep = await response.json();
  display(jsonRep, 'sorted');
  }
); //click

//random
document.querySelector("#findRandom").addEventListener(
  "click",
  async function () {
    //let random = true;
    let exp = document.querySelector("#inputRegex").value;
    let sortMethod = 'random'   //document.querySelector("#sortSelect").value; 
    let response = await fetch(
    `http://localhost:8080/sendSearch?${new URLSearchParams({exp, sortMethod})}`
  );
  responseDiv.innerHTML ='';
  let jsonRep = await response.json();
  display(jsonRep, 'random');
  }
); //click

//display the results 
function display(jsonRep, method){
  let m = method;
  let disM;
  if ( m == 'random'){
    disM = "display:block";
  }else {
    disM = "display:none";
  }
  for(let i=0; i<jsonRep.length; i++){
    //console.log(jsonRep[i]);
    let c = document.createElement("div");
    c.classList.add("t");
   
    /* collapsible / button based on tutorial: */
    /* https://www.w3schools.com/howto/howto_js_collapsible.asp */
    c.innerHTML = 
    `<button type="button" class="collapsible">
    <span class = "title"></span>${jsonRep[i].postTitle}<br/> 
    </button> 
   <div class="content" style=${disM}>
   <span class = "author"></span> author: ${jsonRep[i].author}<br/>
   <span class = "body"></span> ${jsonRep[i].postBody}<br/>
   <span class = "author"></span> score: ${jsonRep[i].score}<br/>
   <span class = "author"></span> score: ${jsonRep[i].searchScore}<br/>
   <span class = "numComments"> comments: </span> ${jsonRep[i].numComments}<br/>
   </div>`;
    
    responseDiv.appendChild(c);
    
    myFunction(c, m);
  }
}

function myFunction(c, m) {
  let displayMethod = m;
  c.addEventListener("click", function(){
  console.log(displayMethod);
  var content = c.querySelector('.content');
  if (content.style.display === "block") {
    content.style.display = "none";
  }
  else if (content.style.display === "none") {
    //console.log("open");
    content.style.display = "block";
  } else if (m === 'random'){
    console.log("display block");
    content.style.display = "block";
  }
  });
}

};