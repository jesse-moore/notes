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

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1

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