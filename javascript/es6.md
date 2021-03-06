# Javascript ES6 Reference

## Function Hoisting / Variable Declaration
### Function Declaration - gets hoisted to the top
```js
function foo() {
  // code here
}
```
### Function Expression - Only declared at the point it is in the source code
```js
var bar = function() {
  // code here
}
var variable; // Gets hoisted
let variable; // Lives within block
const constant; // Lives within block
```

## Rest Parameters
### Treats arguments as an array
```js
function foo(a,b,...bar) {
	console.log(a,b,bar);
}
foo(1,2,3,4,5); // 1 2 [3,4,5] 
```

## Spread Operator 
### Spreads an array into its individual values.
```js
var a = [3,4,5];
var b = [1,2,...a,6,7]; //[1,2,3,4,5,6,7]
```

## Default Parameters
```js
function greeting(name = "Anonymous") {
  return "Hello " + name;
}
console.log(greeting("John")); // Hello John
console.log(greeting()); // Hello Anonymous
```

## Destructuring Objects
```js
var voxel = {x: 3.6, y: 7.4, z: 6.54 };
const { x, y, z } = voxel; // x = 3.6, y = 7.4, z = 6.54
const { x : a, y : b, z : c } = voxel; // a = 3.6, b = 7.4, c = 6.54
```

### Destructuring Nested Objects
```js
const a = {
  start: { x: 5, y: 6},
  end: { x: 6, y: -9 }
};
const { start : { x: startX, y: startY }} = a;
console.log(startX, startY); // 5, 6
```
### Destructuring Arrays
```js
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b); // 1, 2

const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5
```
### Destruturing with Rest operator
```js
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```
### Destructuring Functions Parameters
```js
const profileData = {name: 'Mark', age:32, nationality:'Deutsch', location:'Hamburg, Deutschland'}
const profileUpdate = ({ name, age, nationality, location }) => {
  console.log(name);
}
profileUpdate(profileData); // Mark
```

## Object Literals  
```js
const createPerson = (name, age, gender) => {
  return {
    name,
    age,
    gender
  };
};
console.log(createPerson("Zodiac Hasbro", 56, "male"));
// {age: 56, gender: "male", name: "Zodiac Hasbro"}
```

## Declarative Functions 
```js
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

## Classes / Getters and Setters

## Import / Export

## Misc
```js
Object.freeze(obj); // Object is now unmutable
```




