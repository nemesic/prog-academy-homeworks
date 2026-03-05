//1
let num1 = Number(prompt("Введіть перше число"));
let num2 = Number(prompt("Введіть друге число"));
let num3 = Number(prompt("Введіть третє число"));

let maxNumber = num1;

if(num2 > maxNumber) {
    maxNumber = num2;
}
if(num3 > maxNumber) {
    maxNumber = num3;
}

console.log(`Найбільше число: ${maxNumber}`);

//2
let month = Number(prompt("Введіть номер місяця (1-12)"));

if(month >= 3 && month <= 5){
    console.log("Весна");
} else if(month >= 6 && month <= 8){
    console.log("Літо");
} else if(month >= 9 && month <= 11){
    console.log("Осінь");
} else if(month === 12 || month === 1 || month === 2){
    console.log("Зима");
} else {
    console.log("Некоректний місяць");
}

//3
let userNumber = Number(prompt("Введіть число"));

if(userNumber > 0){
    console.log("Число додатнє");
} else if(userNumber < 0){
    console.log("Число від'ємне");
} else {
    console.log("Число дорівнює нулю");
}

//4
let angle = Number(prompt("Введіть величину кута в градусах"));

let angleType = angle < 90 ? "Гострий" : "Тупий";
console.log(`Кут ${angle}° є ${angleType}`);

//5
let score = Number(prompt("Введіть оцінку студента (0-100)"));

let grade = "";
if(score >= 90) grade = "A";
else if(score >= 80) grade = "B";
else if(score >= 70) grade = "C";
else if(score >= 60) grade = "D";
else grade = "F";

console.log(`Оцінка до інкремента: ${grade}`);

score++;
console.log(`Оцінка після інкремента: ${score}`);

let passed = score >= 60 ? "Студент зарахований" : "Студент не зарахований";
console.log(passed);