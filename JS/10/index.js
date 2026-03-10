let userChoice = prompt("Вибери: камінь, ножниці або папір");

let options = ["камінь", "ножниці", "папір"];
let playerChoice = options[Math.floor(Math.random() * 3)];

if(userChoice === playerChoice){
    alert("Нічия! Користувач вибрав " + playerChoice);
}
else if(
    (userChoice === "камінь" && playerChoice === "ножниці") ||
    (userChoice === "ножниці" && playerChoice === "папір") ||
    (userChoice === "папір" && playerChoice === "камінь")
){
    alert("Ти виграв! Користувач вибрав " + playerChoice);
}
else{
    alert("Ти програв! Користувач вибрав " + playerChoice);
}

function findMin(a, b) {
    return Math.min(a, b);
}

function findMax(a, b) {
    return Math.max(a, b);
}

console.log(findMin(5, 10));
console.log(findMax(5, 10)); 


function power(base, exponent) {
    return Math.pow(base, exponent);
}

console.log(power(2, 3));


function roundDown(num) {
    return Math.floor(num);
}   

function roundUp(num) {
    return Math.ceil(num);
}

console.log(roundDown(4.9));
console.log(roundUp(4.2));

function calculateBirthYear(age) {
    let currentYear = new Date().getFullYear();
    return currentYear - age;
}

let userAge = prompt("Введіть свій вік:");
let birthYear = calculateBirthYear(userAge);
console.log("Ваш рік народження: " + birthYear);

let currentDate = new Date();
let formattedDate = currentDate.toLocaleString();
console.log("Поточна дата та час: " + formattedDate);

let text = "HELLO WORLD FROM PROG ACADEMY";
let wordsArray = text.split(" ");
let upperCaseWords = wordsArray.map(word => word.toUpperCase());
console.log(upperCaseWords);