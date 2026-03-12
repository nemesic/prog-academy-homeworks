//1

let hoverArea = document.getElementById("hoverArea");

hoverArea.onmouseover = function(){
hoverArea.style.background="green";
}

hoverArea.onmouseout = function(){
hoverArea.style.background="#4c6ef5";
}



//2

let textBlock = document.getElementById("textBlock");
let menu = document.getElementById("contextMenu");

textBlock.oncontextmenu = function(e){

e.preventDefault();

menu.style.display="block";
menu.style.left = e.pageX + "px";
menu.style.top = e.pageY + "px";

}

document.onclick=function(){
menu.style.display="none";
}

menu.onclick=function(e){

let action=e.target.dataset.action;

if(action==="left") textBlock.style.textAlign="left";
if(action==="center") textBlock.style.textAlign="center";
if(action==="right") textBlock.style.textAlign="right";
if(action==="hide") textBlock.style.display="none";

}



//3

let img=document.getElementById("hoverImage");

img.onmouseover=function(){
img.style.transform="scale(1.2)";
img.style.boxShadow="0 10px 20px rgba(0,0,0,0.4)";
}

img.onmouseout=function(){
img.style.transform="scale(1)";
img.style.boxShadow="none";
}



//4
let player = document.getElementById('player');
let gameArea = document.getElementById('gameArea');

let posX = player.offsetLeft;
let posY = player.offsetTop;

const step = 10;

document.addEventListener('keydown', function(e){
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d","W","A","S","D"].includes(e.key)){
        e.preventDefault();
    }

    switch(e.key){
        case "ArrowUp":
        case "w":
        case "W":
            posY -= step;
            if(posY < 0) posY = 0;
            break;
        case "ArrowDown":
        case "s":
        case "S":
            posY += step;
            if(posY > gameArea.clientHeight - player.clientHeight)
                posY = gameArea.clientHeight - player.clientHeight;
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            posX -= step;
            if(posX < 0) posX = 0;
            break;
        case "ArrowRight":
        case "d":
        case "D":
            posX += step;
            if(posX > gameArea.clientWidth - player.clientWidth)
                posX = gameArea.clientWidth - player.clientWidth;
            break;
    }

    player.style.left = posX + 'px';
    player.style.top = posY + 'px';
});

//5

let menuList=document.getElementById("keyboardMenu");
let items=menuList.querySelectorAll("li");

let index=0;

document.addEventListener("keydown",function(e){

if(e.key==="m" || e.key==="M"){
menuList.style.display="block";
items[index].classList.add("active");
}

if(e.key==="c" || e.key==="C"){
menuList.style.display="none";
}

if(e.key==="ArrowDown"){

items[index].classList.remove("active");
index=(index+1)%items.length;
items[index].classList.add("active");

}

if(e.key==="ArrowUp"){

items[index].classList.remove("active");
index=(index-1+items.length)%items.length;
items[index].classList.add("active");

}

});



//bonus

let dragBox = document.getElementById("dragBox");
let dragArea = document.getElementById("dragArea");

let isDragging = false;

dragBox.onmousedown = function(){
    isDragging = true;
}

document.onmouseup = function(){
    isDragging = false;
}

document.onmousemove = function(e){

    if(!isDragging) return;

    let areaRect = dragArea.getBoundingClientRect();

    let x = e.clientX - areaRect.left - dragBox.offsetWidth/2;
    let y = e.clientY - areaRect.top - dragBox.offsetHeight/2;

    if(x < 0) x = 0;
    if(y < 0) y = 0;

    if(x > dragArea.clientWidth - dragBox.clientWidth)
        x = dragArea.clientWidth - dragBox.clientWidth;

    if(y > dragArea.clientHeight - dragBox.clientHeight)
        y = dragArea.clientHeight - dragBox.clientHeight;

    dragBox.style.left = x + "px";
    dragBox.style.top = y + "px";
}