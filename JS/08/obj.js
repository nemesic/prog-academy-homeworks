console.log('===1===');
for (let i = 0; i < 5; i++) {
    console.log(i);
}

const message = 'test';

function example() {

    if (true) {
        let message = 'Hello, world!';
        console.log(message);
    }
    console.log(message);
}

console.log('===2===');
const person = {
    name: 'John',
    age: 25,
    occupation: 'Developer'
};

for (let key in person) {
    console.log(person[key]);
}

console.log('===3===');
const students = [
    { name: 'Alice', age: 20, grade: 'A' },
    { name: 'Bob', age: 22, grade: 'B' },
    { name: 'Charlie', age: 21, grade: 'C' }
];

for (const student of students) {
    console.log('New Student');
    for (const key in student) {
        if (student.hasOwnProperty(key)) {
            console.log(`${key}: ${student[key]}`);
        }
    }
}