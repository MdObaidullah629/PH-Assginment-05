Ans all the quesion

1.Difference between var, let, and const:

var → old way, can be changed, function-scoped.

let → new way, can be changed, block-scoped (inside {} only).

const → cannot be changed, block-scoped.


2.It spreads out items from an array or object.

let nums = [1, 2, 3];
let newNums = [...nums, 4]; // [1, 2, 3, 4]


3.Difference between map(), filter(), and forEach():

map() → changes every item and returns a new array.

filter() → keeps only items that meet a condition and returns a new array.

forEach() → goes through items but does NOT return anything.


4.Shorter way to write a function.

Normal function
function add(a, b) { return a + b; }

Arrow function
let add = (a, b) => a + b;



5.Use backticks ` to easily add variables into strings.

let name = "Ali";
console.log(`Hello, ${name}!`); 
Hello, Ali!