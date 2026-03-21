const app = document.querySelector('#app');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let theme = localStorage.getItem('theme') || 'dark';
let filter = 'all';

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('theme', theme);
}

function addTask(text) {
  tasks.push({ text, done: false });
  save();
  render();
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  save();
  render();
}

function getFilteredTasks() {
  if (filter === 'active') return tasks.filter(t => !t.done);
  if (filter === 'done') return tasks.filter(t => t.done);
  return tasks;
}

function render() {
  document.body.className = theme;

  app.innerHTML = `
    <div class="container">
      <h1>NeoTask</h1>

      <div class="top">
        <input id="input" placeholder="Нова задача..." />
        <button id="addBtn">Додати</button>
      </div>

      <div class="filters">
        <button onclick="setFilter('all')">Всі</button>
        <button onclick="setFilter('active')">Активні</button>
        <button onclick="setFilter('done')">Виконані</button>
      </div>

      <button onclick="toggleTheme()">
        ${theme === 'dark' ? 'Сховати тему' : 'Стандартна тема'}
      </button>

      <ul>
        ${getFilteredTasks().map((t, i) => `
          <li class="${t.done ? 'done' : ''}">
            <span onclick="toggleTask(${i})">${t.text}</span>
            <button onclick="deleteTask(${i})">❌</button>
          </li>
        `).join('')}
      </ul>

      <p>📊 Всього: ${tasks.length} | Виконано: ${tasks.filter(t => t.done).length}</p>
    </div>
  `;

  document.querySelector('#addBtn').onclick = () => {
    const input = document.querySelector('#input');
    if (!input.value.trim()) return;

    addTask(input.value);
    input.value = '';
  };
}


window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.setFilter = setFilter;
window.toggleTheme = toggleTheme;

render();