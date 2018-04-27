//Currying

// Sample Data
let categories = [
	{id: 'animals', 'parent': null},
	{id: 'mammals', 'parent': 'animals'},
	{id: 'cats', 'parent': 'mammals'},
	{id: 'dogs', 'parent': 'mammals'},
	{id: 'chihuahua', 'parent': 'dogs'},
	{id: 'labrador', 'parent': 'dogs'},
	{id: 'persian', 'parent': 'cats'},
	{id: 'siamese', 'parent': 'cats'}
]

var people = [
	{name: 'Anthony', class: 'First', amount: 25},
	{name: 'Bob', class: 'Third', amount: 180},
	{name: 'Chris', class: 'Second', amount: 410},
	{name: 'Daniel', class: 'Forth', amount: 220},
	{name: 'George', class: 'First', amount: 650},
	{name: 'Jorge', class: 'Forth', amount: 800},
	{name: 'Edgar', class: 'Second', amount: 50},
	{name: 'Timothy', class: 'First', amount: 500},
	{name: 'Zach', class: 'Third', amount: 350}
]
var data = 'Mark Johansson\tWaffle Iron\t80\t2\nMark Johansson\tBlender\t200\t1\nMark Johansson\tKnife\t10\t2\nNikki Smith\tKnife\t20\t8\nNikki Smith\tWaffle Iron\t80\t1\nNikki Smith\tBlender\t200\t2'

// Map function example
var names = people.map(function(x){return [x.name,x.class]})
//console.log(names)

// Filter function example
var namesClassFirst = people.filter(function(x){return x.class==='First'})
//console.log(namesClassFirst)

// Reduce function example reduce(function(accumulator, current){function}),startElement)
var peopleTotalAmount = people.reduce(function(acc,cur){return acc+cur.amount},0)
//console.log(peopleTotalAmount)

// Reduce Advanced function example
var dataOutput = data
	.split('\n') //Split on newline
	.map(function(line){return line.split('\t')}) //Map each line into an array
	.reduce(function(customers,line){ //Reduce into an object
		customers[line[0]]=customers[line[0]] || [] 
		customers[line[0]].push({name:line[1],price:line[2],quantity:line[3]})
		return customers
	}, {})
console.log(dataOutput)
//console.log(JSON.stringify(data, null, 1))

// Recursion
let makeTree = (categories, parent) => {
	let node = {}
	categories
		.filter(c => c.parent === parent)
		.forEach(c =>
			node[c.id] = makeTree(categories, c.id))
		return node
}
console.log(JSON.stringify(makeTree(categories, null),null,2))


//Closures
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

//console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
//console.log(counter.value()); // logs 2
counter.decrement();
//console.log(counter.value()); // logs 1

var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var counter1 = makeCounter();
var counter2 = makeCounter();
//alert(counter1.value()); /* Alerts 0 */
counter1.increment();
counter1.increment();
//alert(counter1.value()); /* Alerts 2 */
counter1.decrement();
//alert(counter1.value()); /* Alerts 1 */
//alert(counter2.value()); /* Alerts 0 */