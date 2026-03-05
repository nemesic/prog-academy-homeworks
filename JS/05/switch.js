//1
// let figure = "квадрат";
// let figure = "коло";
let figure = "трикутник"; 

switch (figure) {
    case "коло":
        console.log("Коло має 0 сторін");
        break;
    case "квадрат":
        console.log("Квадрат має 4 сторони");
        break;
    case "трикутник":
        console.log("Трикутник має 3 сторони");
        break;
    default:
        console.log("Невідома фігура");
}

//2
let num = 1;
let sum = 0;

while (num <= 20) {
    if (num % 2 === 0) {
        sum += num;
    }
    num++;
}

console.log("Сума парних чисел:", sum);

//3
let number = 5;

for (let i = 1; i <= 10; i++) {
    console.log(`${number} * ${i} = ${number * i}`);
}

//4
for (let i = 10; i >= 1; i--) {
    console.log(i);
}

//5
let checkNumber = 7;

for (let i = checkNumber; i <= checkNumber; i++) {
    if (i % 2 === 0) {
        console.log("Число парне");
    } else {
        console.log("Число непарне");
    }
}

//6
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log("Перше парне число:", i);
        break;
    }
}

//7
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        continue;
    }
    console.log(i);
}