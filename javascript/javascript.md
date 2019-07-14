# Javascript

## Functions

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
};
```

Set _this_ to self to be sure _self_ refers to the right _this_

```js
c = {
  name: 'The c object',
  log: function() {
       var self = this;
       console.log(self);

       var setname = function(newname) {
       self.name = newname;
  }
```

### Immediately Invoked Function Expression (IIFE)

```js
(function(name) {
  console.log("hello " + name);
})("John");
```

### Closures

```js
function greet(whattosay) {
  // The arguemnet whattosay is still retained in memory after the function greet is
  // popped off the execution stack
  return function(name) {
    console.log(whattosay + " " + name);
  };
}

var sayHi = greet("Hi");
// sayHi function 'closes over' the outer functions variable whattosay
sayHi("Jane"); //=> Hi Jane
```

### Call, Apply and Bind

```js
var person = {
  firstname: "Jane",
  lastname: "Doe",
  getFullName: function() {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log(this.getFullName());
  console.log(lang1, lang2);
};

//BIND
var logPersonName = logName.bind(person);
logPersonName("en", "es"); // => Jane Doe
// The bind method creates a copy of the logName function and sets its 'this' to 'person' instead of the global 'this'.

//CALL
logName.call(person, "en", "es");
// The call method executes the function passing 'person' as its 'this' variable and any parameter after the first one gets passed as arguements to the function.

//APPLY
logName.apply(person, ["en", "es"]);
// The apply method is the same as call but the arguements are passed as an array.
```

### Function Borrowing

```js
var person1 = {
  firstname: "Jane",
  lastname: "Doe",
  this: this,
  getFullName: function() {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  }
};

// function borrowing
var person2 = {
  firstname: "John",
  lastname: "Doe"
};
// Apply sets the 'this' variable in getFullName method to 'person2'
person1.getFullName.apply(person2);
```

### Function Currying

```js
function multiply(a, b) {
  return a * b;
}
// Presets 'a' arguement to 2
var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));
```

## Functional Programming

```js
function mapForEach(arr, fn) {
  var newArr = [];
  for (var i = 0; i < arr1.length; i++) {
    newArr.push(fn(arr[i]));
  }

  return newArr;
}

var arr1 = [1, 2, 3];
console.log(arr1);

var arr2 = mapForEach(arr1, function(item) {
  return item * 2;
});
console.log(arr2);

var arr3 = mapForEach(arr1, function(item) {
  return item > 2;
});
console.log(arr3);

var checkPastLimit = function(limiter, item) {
  return item > limiter;
};

var arr4 = mapForEach(arr1, checkPastLimit.bind(null, 1));
console.log(arr4);

var checkPastLimitSimplified = function(limiter) {
  return function(limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};

var arr5 = mapForEach(arr5, checkPastLimitSimplified(1));
console.log(arr5);
```

## Function Factories, Constructors, and Classes

### Function Factory
```js
const PersonProto = {
  getFullName () {
    return this.firstname + ' ' + this.lastname;
  }
}
function personFactory (firstname, lastname) {
  // private variable
  var temp = [];
  // returns object with arguements as properties and proto as PersonProto
  return Object.create(PersonProto,{
    firstname:{value:firstname},
    lastname:{value:lastname}
  })
}

var john = personFactory("John", "Doe");
console.log(john.getFullName());
```

### Constructor
```js
function PersonConstructor(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
PersonConstructor.prototype.getFullName = function() {
  return this.firstname + " " + this.lastname;
};

var john = new Person("John", "Doe");
console.log(john.getFullName());
```

### Classes
```js
class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet() {
    return "Hi " + this.firstname;
  }
}

var john = new Person("John", "Doe");

class InformalPerson extends Person {
  constructor(firstname, lastname) {
    super(firstname, lastname);
  }

  greet() {
    return "Yo " + this.firstname;
  }
}
```
## Composition and Inheritance
### Inheritance
```js
class Employee {
  constructor(firstname,lastname) {
    Object.assign(this, {
      firstname:firstname,
      lastname:lastname,
    })
  }
}
class SeniorProgrammer extends Employee {
    constructor (firstname, lastname) {
    super(firstname,lastname);
    this.title = "Senior Programmer";
    this.manager = true;
  }
}
class Programmer extends Employee {
    constructor (firstname, lastname) {
    super(firstname,lastname);
    this.title = "Programmer";
    this.manager = false;
  }
}
var john = new SeniorProgrammer('John', 'Doe');
console.log(john);
```
### Composition
```js
const employee = {
  firstName:'default',
  lastName:'default',
  manager: false,
  project:'unassigned',
}

const manager = {
  manager:true
}

const programming = {
  level: 'b2'
}

const accounting = {
  level: 'a1'
}

const seniorProgrammer = (options) => {
  return Object.assign({}, employee, manager, programming, options)
}

const accountant = (options) => {
  return Object.assign({}, employee, accounting, options)
}

var john = seniorProgrammer({firstName:'John',lastName:'Doe'});
john.project = "Android Implementation"
console.log(john);

var jane = accountant({firstName:'Jane',lastName:'Doe'});
console.log(jane);
```
## Asynchronous Functions
### Callback
```js
function logsSomething(text) {
  console.log(text)
}

function doesWork(callback){
  console.log('Working');
  callback()
}

doesWork(logsSomething.bind(null,'Done'))
```
### Promise
```js
function logsSomething(text) {
  console.log(text)
}

function doesWork(){
  return new Promise((resolve,reject)=>{
    console.log('Working')
    resolve('Done')
  })
}

doesWork()
.then(result=>logsSomething(result))
```
### Async Await
```js
function logsSomething(text) {
  console.log(text)
}

async function doesWork(){
  await console.log("Working");
  logsSomething("Done")
}

doesWork()
```
### Async Await with multiple promises in parallel
```js
function logsSomething(text) {
  console.log(text)
}

function doesJob1(){
  return new Promise((resolve,reject)=>{
    console.log('Working Job 1')
    resolve('Job 1 Done')
  })
}

function doesJob2(){
  return new Promise((resolve,reject)=>{
    console.log('Working Job 2')
    resolve('Job 2 Done')
  })
}

function doesJob3(){
  return new Promise((resolve,reject)=>{
    console.log('Working Job 3')
    resolve('Job 3 Done')
  })
}

async function doesWork(){
  await Promise.all([doesJob1(),doesJob2(),doesJob3()])
  .then(result=>logsSomething(result))
}
doesWork()
```
### Generators / Yield
```js
function logsSomething(text) {
  console.log(text)
}

function doesJob1(){
  console.log('Working Job 1')
  return 'Job 1 Done'
}

function doesJob2(){
  console.log('Working Job 2')
  return 'Job 2 Done'
}

function doesJob3(){
  console.log('Working Job 3')
  return 'Job 3 Done'
}

function* doesWork(){
  var result = [];
  yield result.push(doesJob1())
  yield result.push(doesJob2())
  yield result.push(doesJob3())
  return result
}
var job = doesWork()

job.next()
job.next()
job.next()
logsSomething(job.next())
```
## Resources
### Javascript Modules
* [Javascript Modules: A Beginner's Guide](https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc)
* [Notes on Douglas Crockford's Javascript the Good Parts](https://github.com/dwyl/Javascript-the-Good-Parts-notes#chapter4)
```js
@param  {String} url
@return {Promise}
```
