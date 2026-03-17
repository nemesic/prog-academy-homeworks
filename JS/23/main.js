//1
const loadUsersBtn = document.getElementById('loadUsersBtn');
const usersList = document.getElementById('usersList');

loadUsersBtn.onclick = () => {
    usersList.innerHTML = 'Завантаження...';
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => {
            usersList.innerHTML = '';
            users.forEach(u => {
                const li = document.createElement('li');
                li.textContent = `${u.name} (${u.email})`;
                usersList.appendChild(li);
            });
        })
        .catch(err => usersList.textContent = `Помилка: ${err}`);
};

//2
const loadUserBtn = document.getElementById('loadUserBtn');
const userDetail = document.getElementById('userDetail');

loadUserBtn.onclick = () => {
    userDetail.innerHTML = 'Завантаження...';
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.json())
        .then(u => {
            userDetail.innerHTML = `
                <p><strong>Ім'я:</strong> ${u.name}</p>
                <p><strong>Нікнейм:</strong> ${u.username}</p>
                <p><strong>Email:</strong> ${u.email}</p>
            `;
        })
        .catch(err => userDetail.textContent = `Помилка: ${err}`);
};

//3
const loadPostsBtn = document.getElementById('loadPostsBtn');
const postsList = document.getElementById('postsList');

loadPostsBtn.onclick = () => {
    postsList.innerHTML = 'Завантаження...';
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then(res => res.json())
        .then(posts => {
            postsList.innerHTML = '';
            posts.forEach(p => {
                const li = document.createElement('li');
                li.textContent = p.title;
                postsList.appendChild(li);
            });
        })
        .catch(err => postsList.textContent = `Помилка: ${err}`);
};

//4
const loadPlanetBtn = document.getElementById('loadPlanetBtn');
const planetCard = document.getElementById('planetCard');

loadPlanetBtn.onclick = () => {
    planetCard.innerHTML = 'Завантаження...';
    fetch('https://swapi.dev/api/planets/1/')
        .then(res => res.json())
        .then(planet => {
            planetCard.innerHTML = '';
            for (let key in planet) {
                const value = planet[key];
                const p = document.createElement('p');
                if (Array.isArray(value)) {
                    p.innerHTML = `<strong>${key}:</strong> `;
                    value.forEach(v => {
                        const a = document.createElement('a');
                        a.href = v;
                        a.target = '_blank';
                        a.textContent = v;
                        a.style.marginRight = '5px';
                        p.appendChild(a);
                    });
                } else {
                    p.innerHTML = `<strong>${key}:</strong> ${value}`;
                }
                planetCard.appendChild(p);
            }
        })
        .catch(err => planetCard.textContent = `Помилка: ${err}`);
};