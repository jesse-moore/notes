//Arrow functions

/*
!! There's a gotcha with the this keyword in arrow functions
!! Arrow functions are only expressions there's no such thing as an arrow function declaration
*/
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) { 
  return name.toUpperCase();
});

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);

//Singal parameter function
const greet = name => `Hello ${name}!`;

greet('Jesse');
//Hello Jesse!

//Multiple parameter function
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
//Hello Udacity Student!

const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
//Here's your chocolate ice cream in a waffle cone.

// Concise and block body syntax
// Concise body syntax
// Has no curly braces surrounding the function body and automatically returns the expression.
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);

const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(square=>square * square);
console.log(...squares);
// Block body syntax
// It uses curly braces to wrap the function body
// and a return statement needs to be used to actually return something from the function.
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});

// Using the this keyword
/*
1. A new object
If the function is called with new:
The value of this inside the Sundae constructor function is a new object because it was called with new.
*/
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);

/*
2. A specified object
If the function is invoked with call/apply:
The value of this inside printName() will refer to obj2 since the first parameter of call() is to explicitly set what this refers to.
*/
const result = obj1.printName.call(obj2);

/*
3. A context object
If the function is a method of an object:
The value of this inside teleport() will refer to data.
*/
data.teleport();

/*
4. The global object or undefined
If the function is called with no context:
The value of this inside teleport() is either the global object or, if in strict mode, it's undefined.
*/
teleport();

//With arrow functions, the value of this is based on the function's surrounding context. In other words, the value of this inside an arrow function is the same as the value of this outside the function.

//Default function parameters
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!

function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
createGrid(); // throws an error

function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}
createGrid(); // Generates a 5 x 5 grid

//Defaults and destructuring objects
function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
createSundae(); // throws an error

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.

// Classes
// Old way
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// methods "inherited" by all instances
Plane.prototype.startEngines = function () {
  console.log('starting engines...');
  this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();

//Using class
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
/*
See how badWeather() has the word static in front of it while startEngines() doesn't? 
That makes badWeather() a method that's accessed directly on the Plane class, 
so you can call it like this:
*/
Plane.badWeather([plane1, plane2, plane3]);

// Super and Extends
/*
Both Tree and Maple are JavaScript classes. The Maple class is a "subclass" of Tree and uses the 
extends keyword to set itself as a "subclass". To get from the "subclass" to the parent class, 
the super keyword is used. Did you notice that super was used in two different ways? 
In Maple's constructor method, super is used as a function. In Maple's changeSeason() method, 
super is used as an object!
*/

class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');

//Compared to ES5 subclasses

function Tree() {
  this.size = size || 10;
  this.leaves = leaves || {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');

//Working with subclasses
//super must be called before this
//In a subclass constructor function, before this can be used, a call to the super class must be made.

class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy); 
  }
}

