console.log('===Spread===');

let FirstArr = [1,2,3];
let SecondArr = [4,5,6];

let resultArr = [...FirstArr, ...SecondArr];

console.log(resultArr);

console.log('===Rest===');
console.log('===1===');

function RestArr (FirstArg, ...SecondArgs) {
    console.log('Перший аргумент:', FirstArg);
    console.log('Інші аргументи:', SecondArgs);
}

RestArr('Hello', 1, 2, 3, 'Test');
console.log('===2===');

function average(...numbers) {
    let sum = 0;
    for(let num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}

console.log(average(5, 10, 15));
console.log(average(2, 4, 6, 8));

console.log('===TypeOf===');
console.log('===1===');

function showType(value) {
    console.log(`Тип значення: ${typeof value}`);
}

showType(42);
showType('Hello');
showType(true);
showType([1,2,3]);
showType({a:1});
showType(() => {});

console.log('===2===');

let testValue = 123;

if(typeof testValue === 'number') {
    console.log('Це число');
} else if(typeof testValue === 'string') {
    console.log('Це рядок');
} else {
    console.log('Це інший тип');
}