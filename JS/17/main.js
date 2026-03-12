//1

const amountInput = document.getElementById('amount');
const rateInput = document.getElementById('rate');
const convertBtn = document.getElementById('convertBtn');
const convertResult = document.getElementById('convertResult');

convertBtn.onclick = function() {
    const amount = parseFloat(amountInput.value);
    const rate = parseFloat(rateInput.value);

    if(isNaN(amount) || isNaN(rate)) {
        convertResult.textContent = 'Будь ласка, введіть коректні числа.';
        return;
    }

    const result = amount * rate;
    convertResult.textContent = `Результат: ${result.toFixed(2)}`;
}

//2

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.onclick = function() {
    const taskText = taskInput.value.trim();
    if(taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    }

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}