console.log(`===1===`);
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function calculator(operation, a, b) {
    switch (operation) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'divide':
            return divide(a, b);
        case 'multiply':
            return multiply(a, b);
        default:
            return "Error: Invalid operation.";
    }
}

console.log(calculator('add', 5, 3)); 
console.log(calculator('subtract', 5, 3)); 
console.log(calculator('divide', 5, 3)); 
console.log(calculator('multiply', 5, 3)); 
console.log(calculator('unknown', 5, 3));


console.log(`===2===`);
function hiUser(user) {
    console.log(`Вітаю ${user}`);
}

function wellcomUser(users, callback) {
    for (let i = 0; i < users.length; i++) {
        callback(users[i]);
    }
}

const users = ['Alex', 'Max', 'Tom'];
wellcomUser(users, hiUser);

console.log(`===3===`);
const wellcomUserArrow = (users, callback) => {
    users.forEach(user => callback(user));
};

wellcomUserArrow(users, user => console.log(`Вітаю ${user}`));


console.log(`===4===`);
function greet(value = 'Hello, world!') {
    console.log(value);
}

greet(); 
greet('Hello, friend!');

console.log(`===5===`);
function processString(str, callback) {
    callback(str);
}
processString('Hello, callback!', value => console.log(`Processed string: ${value}`));

console.log(`===6===`);
function multiplyValues(a, b, c) {
    return a * b * c;
}
console.log(`Test normal version ${multiplyValues(2,3,4)}`);
