window.onload = function(){
//1
let tree = document.querySelector("#tree");
let firstLevel = tree.children;
let secondLevel = tree.querySelectorAll("ul > li");

console.log("Кількість елементів 2 рівня:", secondLevel.length);
console.log("Кількість елементів 1 рівня:", firstLevel.length);

//2
const booksArray = [ 
{
title: 'Пригоди Аліси в Країні Див',
year: 1865,
rating: 4.5
},

{
title: '1984',
year: 1949,
rating: 4.8
},

{
title: 'Гаррі Поттер і філософський камінь',
year: 1997,
rating: 4.7
}

];

let tableBody = document.querySelector("#booksTable");

for(let book of booksArray){
    let tr = document.createElement("tr");

    tr.innerHTML = `<td>${book.title}</td><td>${book.year}</td><td>${book.rating}</td>`;
    tableBody.appendChild(tr);
}

//3
const elementsArray = [

{ tag: 'p', text: 'Елемент 1' },
{ tag: 'div', text: 'Елемент 2' },
{ tag: 'span', text: 'Елемент 3' }

];

let container = document.querySelector("#container");

function createElementFromObject(obj){
    let el = document.createElement(obj.tag);
    el.textContent = obj.text;
    return el;
}

for(let element of elementsArray){ 
    let newElement = createElementFromObject(element);
    container.appendChild(newElement);
}

//4
const elementsArray2 = [

{ text: 'Елемент 1', usePrepend: true },
{ text: 'Елемент 2', usePrepend: false },
{ text: 'Елемент 3', usePrepend: true }

];

let mainContainer = document.querySelector("#mainContainer");

for(let item of elementsArray2){
    let p = document.createElement("p");
    p.textContent = item.text;
    if(item.usePrepend){
        mainContainer.before(p);
    }else{
        mainContainer.after(p);
    }   
}
}