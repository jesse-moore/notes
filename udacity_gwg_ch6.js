//Variables declared with let can be reassigned, 
//but can’t be redeclared in the same scope.
let a = 2;

//Variables declared with const must be assigned an initial value, 
//but can’t be redeclared in the same scope, and can’t be reassigned.
const b = [1,2,3,4,5,6];

//Template Literals
const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}

let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;

//Destructuring
const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];

console.log(x, y, z);
// 10 25 -34

let positions = ['Gabrielle', 'Jarrod', 'Kate', 'Fernando', 'Mike', 'Walter'];
let [first, ,third, , ,fifth] = positions;

third
// Kate

//Object Literal Shorthand
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { return carat*10 }
};

gemstone.calculateWorth()
//212.899

//Iteration
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


for (const index in digits) {
  console.log(digits[index]);
}

for (const digit of digits) {
  console.log(digit);
}

//Adding breakpoints
for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);

//Spread Operator
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
// 2 3 5 7 11 13 17 19 23 29

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits,...vegetables];

console.log(produce);
//["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

//Rest parameter
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
// 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

//Using with arguments
function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}