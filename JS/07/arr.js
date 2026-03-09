console.log(`===Push 1.1===`); 
const myArray = [];
myArray.push(1);
myArray.push(2);
myArray.push(3);
console.log(myArray); // Output: [1, 2, 3]

console.log(`===Push 1.2===`);
function addToArray(arr, element) {
    arr.push(element);
    return arr;
}
let numbers = [1, 2, 3];
console.log(addToArray(numbers, 4)); // Output: [1, 2, 3, 4]

console.log(`===Pop 2.1===`);
const myArray2 = [1, 2, 3, 4];
myArray2.pop();
console.log(myArray2); // Output: [1, 2, 3]

console.log(`===Pop 2.2===`);
function removeLast(arr) {
    arr.pop();
    return arr;
}   
let numbers2 = [1, 2, 3, 4];
console.log(removeLast(numbers2)); // Output: [1, 2, 3]

console.log(`===Unshift 3.1===`);
const myArray3 = [2, 3, 4];
myArray3.unshift(1);
console.log(myArray3); // Output: [1, 2, 3, 4]

console.log(`===Unshift 3.2===`);
function addToStart(arr, element) {
    arr.unshift(element);
    return arr;
}
let numbers3 = [2, 3, 4];
console.log(addToStart(numbers3, 1)); // Output: [1, 2, 3, 4]

console.log(`===Shift 4.1===`);
const myArray4 = [1, 2, 3, 4];
myArray4.shift();
console.log(myArray4); // Output: [2, 3, 4]

console.log(`===Shift 4.2===`);
function removeFirst(arr) {
    arr.shift();
    return arr;
}   
let numbers4 = [1, 2, 3, 4];
console.log(removeFirst(numbers4)); // Output: [2, 3, 4]

console.log(`===Fill 5.1===`);
const myArray5 = new Array(5);
myArray5.fill(1);
console.log(myArray5); // Output: [1, 1, 1, 1, 1]

console.log(`===Fill 5.2===`);
function fillArray(arr, value, start, end) {
    arr.fill(value, start, end);
    return arr;
}
let numbers5 = [1, 2, 3, 4, 5];
console.log(fillArray(numbers5, 0, 1, 4)); // Output: [1, 0, 0, 0, 5]

console.log(`===Splice 6.1===`);
const myArray6 = [1, 2, 3, 4, 5];
myArray6.splice(1, 3);
console.log(myArray6); // Output: [1, 5]

console.log(`===Splice 6.2===`);
function removeElements(arr, index, count) {
    arr.splice(index, count);
    return arr;
}
let numbers6 = [1, 2, 3, 4, 5];
console.log(removeElements(numbers6, 1, 3)); // Output: [1, 5]

console.log(`===Reverse 7.1===`);
const myArray7 = [1, 2, 3, 4, 5];
myArray7.reverse();
console.log(myArray7); // Output: [5, 4, 3, 2, 1]

console.log(`===Reverse 7.2===`);
function reverseArray(arr) {
    arr.reverse();
    return arr;
}
let numbers7 = [1, 2, 3, 4, 5];
console.log(reverseArray(numbers7)); // Output: [5, 4, 3, 2, 1]

console.log(`===Concat 8.1===`);
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const newArray = array1.concat(array2);
console.log(newArray); // Output: [1, 2, 3, 4, 5, 6]

console.log(`===Concat 8.2===`);
function concatenateArrays(arr1, arr2) {
    return arr1.concat(arr2);
}
const array3 = [1, 2, 3];
const array4 = [4, 5, 6];
console.log(concatenateArrays(array3, array4)); // Output: [1, 2, 3, 4, 5, 6]

console.log(`===Includes 9.1===`);
const myArray9 = [1, 2, 3, 4, 5];
console.log(myArray9.includes(3)); // Output: true
console.log(myArray9.includes(6)); // Output: false

console.log(`===Includes 9.2===`);
function checkElement(arr, element) {
    return arr.includes(element);
}
const myArray10 = [1, 2, 3, 4, 5];
console.log(checkElement(myArray10, 3)); // Output: true
console.log(checkElement(myArray10, 6)); // Output: false

console.log(`===Filter 10.1===`);
const numbers11 = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers11.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4, 6]

console.log(`===Filter 10.2===`);
function filterArray(arr, condition) {
    return arr.filter(condition);
}   
const numbers12 = [1, 2, 3, 4, 5, 6];
const oddNumbers = filterArray(numbers12, num => num % 2 !== 0);
console.log(oddNumbers); // Output: [1, 3, 5]

console.log(`===Map 11.1===`);
const numbers13 = [1, 2, 3, 4, 5];
const squares = numbers13.map(num => num * num);
console.log(squares); // Output: [1, 4, 9, 16, 25]

console.log(`===Map 11.2===`);
function mapArray(arr, transform) {
    return arr.map(transform);
}
let result = mapArray([1, 2, 3, 4, 5], value => `Number: ${value}`);
console.log(result);