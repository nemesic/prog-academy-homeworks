import { add, subtract, multiply, divide } from './mathOperations.js';
import { toUpper, reverseString } from './stringUtilities.js';

const userCard = document.getElementById('userCard');
const filmCard = document.getElementById('filmCard');
const planetCard = document.getElementById('planetCard');

const randomUserBtn = document.getElementById('randomUserBtn');
const randomFilmBtn = document.getElementById('randomFilmBtn');
const randomPlanetBtn = document.getElementById('randomPlanetBtn');

//1
randomUserBtn.onclick = async () => {
    userCard.innerHTML = 'Завантаження...';
    try {
        const id = Math.floor(Math.random()*10) + 1;
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if(!res.ok) throw new Error('Користувача не знайдено');
        const user = await res.json();

        userCard.innerHTML = `
            <p><b>Ім'я:</b> ${user.name}</p>
            <p><b>Username:</b> ${user.username}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Website:</b> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p><b>Компанія:</b> ${user.company.name}</p>
        `;
    } catch(err){
        userCard.innerHTML = `Помилка: ${err}`;
    }
};

//2
randomFilmBtn.onclick = async () => {
    filmCard.innerHTML = 'Завантаження...';
    try {
        const id = Math.floor(Math.random()*6) + 1;
        const res = await fetch(`https://swapi.dev/api/films/${id}/`);
        if(!res.ok) throw new Error('Фільм не знайдено');
        const film = await res.json();
        filmCard.innerHTML = `
            <p><b>Назва:</b> ${film.title}</p>
            <p><b>Дата виходу:</b> ${film.release_date}</p>
            <p><b>Режисер:</b> ${film.director}</p>
            <p><b>Продюсери:</b> ${film.producer}</p>
        `;
    } catch(err){
        filmCard.innerHTML = `Помилка: ${err}`;
    }
};

//3
randomPlanetBtn.onclick = async () => {
    planetCard.innerHTML = 'Завантаження...';
    try {
        const id = Math.floor(Math.random()*60) + 1;
        const res = await fetch(`https://swapi.dev/api/planets/${id}/`);
        if(!res.ok) throw new Error('Планету не знайдено');
        const planet = await res.json();

        const residents = planet.residents.length
            ? planet.residents.map(url => `<a href="${url}" target="_blank">${url}</a>`).join(', ')
            : 'Немає';
        const films = planet.films.length
            ? planet.films.map(url => `<a href="${url}" target="_blank">${url}</a>`).join(', ')
            : 'Немає';

        planetCard.innerHTML = `
            <p><b>Назва:</b> ${planet.name}</p>
            <p><b>Клімат:</b> ${planet.climate}</p>
            <p><b>Населення:</b> ${planet.population}</p>
            <p><b>Жителі:</b> ${residents}</p>
            <p><b>Фільми:</b> ${films}</p>
        `;
    } catch(err){
        planetCard.innerHTML = `Помилка: ${err}`;
    }
};

console.log('5 + 3 =', add(5,3));
console.log('5 / 0 =', divide(5,0));
console.log('toUpper("hello") =', toUpper('hello'));
console.log('reverseString("hello") =', reverseString('hello'));