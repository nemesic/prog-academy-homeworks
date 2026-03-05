// 1
let number1 = 10;
let number2 = 20;
let areEqual = number1 === number2;

alert(`Чи рівні числа? ${areEqual}`);

// 2
let userNumber = Number(prompt("Введіть число"));

if (userNumber % 2 === 0) {
    console.log(`Число ${userNumber} парне`);
} 

else {
    console.log(`Число ${userNumber} непарне`);
}

// 3
let userAge = Number(prompt("Введіть ваш вік"));

if (userAge < 18) {
    console.log("Ви не можете використовувати цей ресурс");
} 

else {
    console.log("Ви можете використовувати цей ресурс");
}

// 4
let price = Number(prompt("Введіть ціну товару"));
let quantity = Number(prompt("Введіть кількість товару"));
let totalCost = price * quantity;

console.log(`Загальна вартість товару: ${totalCost}`);

// 5
let productPrice = Number(prompt("Введіть вартість товару"));
let discount = productPrice * 0.5;

alert(`Ваша знижка: ${discount}`);