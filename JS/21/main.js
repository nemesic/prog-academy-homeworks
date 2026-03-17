//1️ sessionStorage
const input = document.getElementById('userInput');
const output = document.getElementById('output');
const saveBtn = document.getElementById('saveBtn');
const showBtn = document.getElementById('showBtn');

saveBtn.onclick = () => {
    sessionStorage.setItem('text', input.value);
};

showBtn.onclick = () => {
    output.textContent = sessionStorage.getItem('text') || 'Немає даних';
};

input.addEventListener('input', () => {
    sessionStorage.setItem('text', input.value);
});

//2️ settings
const colorPicker = document.getElementById('colorPicker');
const darkMode = document.getElementById('darkMode');
const saveSettings = document.getElementById('saveSettings');

window.onload = () => {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        colorPicker.value = savedColor;
    }

    if (localStorage.getItem('dark') === 'true') {
        document.body.classList.add('dark');
        darkMode.checked = true;
    }

    input.value = sessionStorage.getItem('text') || '';
    renderTodos();
};

saveSettings.onclick = () => {
    localStorage.setItem('bgColor', colorPicker.value);
    localStorage.setItem('dark', darkMode.checked);
    document.body.style.backgroundColor = colorPicker.value;
    document.body.classList.toggle('dark', darkMode.checked);
};

//3 To-Do List
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const addTodo = document.getElementById('addTodo');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, i) => {
        const li = document.createElement('li');
        li.textContent = todo;

        const btn = document.createElement('button');
        btn.textContent = '❌';
        btn.onclick = () => {
            todos.splice(i, 1);
            saveTodos();
        };

        li.appendChild(btn);
        todoList.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

addTodo.onclick = () => {
    const value = todoInput.value.trim();
    if (value) {
        todos.push(value);
        saveTodos();
        todoInput.value = '';
    }
};

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo.click();
});

//JSON download 
const downloadJson = document.getElementById('downloadJson');

const myObject = {
    name: "Oleksii",
    age: 20,
    skills: ["HTML", "CSS", "JS"],
    address: {
        city: "Kalush",
        country: "Ukraine"
    },
    active: true
};

downloadJson.onclick = () => {
    const json = JSON.stringify(myObject, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
};