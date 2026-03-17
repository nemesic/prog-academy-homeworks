//1
const task1Input = document.getElementById('task1Input');
const task1Btn = document.getElementById('task1Btn');
const task1Output = document.getElementById('task1Output');

task1Btn.onclick = () => {
    const num = Number(task1Input.value);
    if (isNaN(num)) {
        task1Output.textContent = 'Помилка: введіть число!';
        return;
    }

    task1Output.textContent = 'Обробка...';

    Promise.resolve(num)
        .then(x => x + 5)
        .then(x => x * 2)
        .then(x => x - 10)
        .then(result => {
            task1Output.textContent = `Результат: ${result}`;
        })
        .catch(err => {
            task1Output.textContent = `Помилка: ${err}`;
        });
};

//2
const task2Input = document.getElementById('task2Input');
const task2Btn = document.getElementById('task2Btn');
const task2Output = document.getElementById('task2Output');

function toUpperAsync(str) {
    return new Promise((resolve, reject) => {
        if (typeof str !== 'string' || str.trim() === '') reject('Не рядок або порожній текст!');
        setTimeout(() => resolve(str.toUpperCase()), 2000);
    });
}

task2Btn.onclick = () => {
    task2Output.textContent = 'Обробка...';
    toUpperAsync(task2Input.value)
        .then(res => task2Output.textContent = `Результат: ${res}`)
        .catch(err => task2Output.textContent = `Помилка: ${err}`);
};

//3
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const task3Btn = document.getElementById('task3Btn');
const task3Output = document.getElementById('task3Output');

function compareNumbers(a, b) {
    return new Promise((resolve, reject) => {
        if (isNaN(a) || isNaN(b)) reject('Введіть обидва числа!');
        else if (a === b) reject('Числа рівні');
        else resolve(a > b ? `${a} більше ${b}` : `${b} більше ${a}`);
    });
}

task3Btn.onclick = () => {
    const a = Number(num1.value);
    const b = Number(num2.value);

    task3Output.textContent = 'Обробка...';

    compareNumbers(a, b)
        .then(res => task3Output.textContent = `Результат: ${res}`)
        .catch(err => task3Output.textContent = `Помилка: ${err}`);
};