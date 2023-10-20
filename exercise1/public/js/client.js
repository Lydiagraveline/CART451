window.onload = function () {
//console.log("we are loaded");
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
    console.log(jsonRep[i])
    let p = document.createElement("p");
   
    p.innerHTML = 
    `<span class = "title"> title: </span> ${jsonRep[i].postTitle}<br/> 
    <span class = "title"> body: </span> ${jsonRep[i].postBody}<br/>
    <span class = "title"> comments: </span> ${jsonRep[i].numComments}<br/>`;
    responseDiv.appendChild(p);

  }
  }
); //click
};