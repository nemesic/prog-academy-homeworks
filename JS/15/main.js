//1

let btn = document.getElementById("colorBtn");
let text = document.getElementById("text");

function randomColor(){
return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
}

btn.onclick=function(){
text.style.color=randomColor();
}


//2

let box=document.getElementById("resizeBox");

box.ondblclick=function(){
box.style.width="240px";
box.style.height="240px";
}


//3

let countBtn=document.getElementById("countBtn");
let counter=document.getElementById("counter");

let count=0;

function addCount(){

count++
counter.textContent=count

if(count>10){
countBtn.removeEventListener("click",addCount)
}

}

countBtn.addEventListener("click",addCount)


//4

let container=document.getElementById("elementsContainer")

for(let i=1;i<=10;i++){

let div=document.createElement("div")

div.textContent="Element "+i
div.classList.add("element")

div.onclick=function(){
div.remove()
}

container.appendChild(div)

}


//5

let blockContainer = document.querySelector(".blockContainer"); //6

blockContainer.addEventListener("click", function(event){

    if(event.target.tagName === "BUTTON"){
        alert("Натиснули кнопку: " + event.target.textContent);
    }
});