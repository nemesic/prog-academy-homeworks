class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    sayHello(){
        console.log(`Hello, my name is ${this.name}`);
    }
}

let person1 = new Person('John', 30);
console.log(person1);
person1.sayHello();


class Student extends Person {
    constructor(name, age, studentId){
        super(name, age);
        this.studentId = studentId;
    }

    study(){
        console.log(`${this.name} is studying`);
    }
}

let student = new Student('Max', 20, 'S12345');

student.sayHello();
student.study();