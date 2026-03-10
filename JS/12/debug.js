console.log("===getElementById===");

let header = document.getElementById("mainHeader");
let section = document.getElementById("mainSection");
let div = document.getElementById("mainDiv");

console.log(header);
console.log(section);
console.log(div);


console.log("===GetElementsByClassName===");

let classElements = document.getElementsByClassName("box");
console.log(classElements);


console.log("===getElementsByTagName===");

let tagElements = document.getElementsByTagName("li");
console.log(tagElements);


console.log("===querySelector ===");

let firstItem = document.querySelector("ul.nav li:first-child");
console.log(firstItem);

let lastItem = document.querySelector("ul.nav li:last-child");
console.log(lastItem);

let thirdItem = document.querySelector("ul.nav li:nth-child(3)");
console.log(thirdItem);


console.log("===querySelectorAll===");

let listItems = document.querySelectorAll("ul.nav > li");
console.log(listItems);


let listArray = Array.from(listItems);
console.log(listArray);

let listItem = document.querySelectorAll('li:nth-child(2)');