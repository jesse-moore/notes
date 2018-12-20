// Symbols
//A symbol is a unique and immutable data type that is often used to identify object properties.
//To create a symbol, you write Symbol() with an optional string as its description.
const sym1 = Symbol('apple');
console.log(sym1);
//Symbol(apple)

//Iteration and Iterable Protocols
/*
An object becomes an iterator when it implements the .next() method. The .next() method is a zero arguments function that returns an object with two properties:
value : the data representing the next value in the sequence of values within the object
done : a boolean representing if the iterator is done going through the sequence of values
If done is true, then the iterator has reached the end of its sequence of values.
If done is false, then the iterator is able to produce another value in its sequence of values.
*/
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
//Object {value: 0, done: false}
//Object {value: 1, done: false}
//Object {value: 2, done: false}
const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185
};

james[Symbol.iterator] = function() {
	const keys = Object.keys(this);
	let nextKey = 0;
	return {
		next: () => {
			return {value: this[keys[nextKey]],
				key: keys[nextKey++],
				done: nextKey===keys.length
			};
		}
	};
};

console.log(iterator.next().value); // 'James'
console.log(iterator.next().value); // `5'10`
console.log(iterator.next().value); // 185

//Sets
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games);
//Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}

games.clear()
console.log(games);
//Set {}

/*
If you attempt to .add() a duplicate item to a Set, you won’t receive an error, 
but the item will not be added to the Set. Also, if you try to .delete() an item that is 
not in a Set, you won’t receive an error, and the Set will remain unchanged.
.add() returns the Set if an item is successfully added. 
On the other hand, .delete() returns a Boolean (true or false) depending on successful deletion.
*/

//Use the .size property to return the number of items in a Set:

const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size);
//12

//Use the .has() method to check if an item exists in a Set. If the item is in the Set, then .has() will return true. 
//If the item doesn’t exist in the Set, then .has() will return false.

console.log(months.has('September'));
//true

//Finally, use the .values() method to return the values in a Set. 
//The return value of the .values() method is a SetIterator object.

console.log(months.values());
//SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}

//Because the .values() method returns a new iterator object (called SetIterator), 
//you can store that iterator object in a variable and loop through each item in the 
//Set using .next().

const iterator = months.values();
iterator.next();
//Object {value: 'January', done: false}

//An easier method to loop through the items in a Set is the for...of loop.

const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}
/*
red 
orange 
yellow 
green 
blue 
violet 
brown 
black
*/

//WeakSet
/*
A WeakSet is just like a normal Set with a few key differences:
a WeakSet can only contain objects
a WeakSet is not iterable which means it can’t be looped over
a WeakSet does not have a .clear() method
*/
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
//WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}}
student3 = null;
console.log(roster);
//WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}
const student3 = { name: 'Richard', age: 31, gender: 'male' };
roster.add(student3);

//Maps
const employees = new Map();
console.log(employees);
//Map {}
/*
Unlike Sets, you can’t create Maps from a list of values; instead, 
you add key-values by using the Map’s .set() method.
The .set() method takes two arguments. 
The first argument is the key, which is used to reference the second argument, the value.
*/
const employees = new Map();

employees.set('james.parkes@udacity.com', { 
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer' 
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});

console.log(employees);

//To remove key-value pairs, simply use the .delete() method.

employees.delete('julia@udacity.com');
employees.delete('richard@udacity.com');
console.log(employees);

//Again, similar to Sets, you can use the .clear() method to remove all key-value pairs from the Map.

employees.clear()
console.log(employees);
//Map {}

const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

console.log(members.has('Xavier'));
console.log(members.has('Marcus'));
//false
//true

//And you can also retrieve values from a Map, by passing a key to the .get() method.

console.log(members.get('Evelyn'));
//75.68

//Looping Through Maps
//Using the Mapiterator
let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
//Object {value: 'Evelyn', done: false}

let iteratorObjForValues = members.values();
iteratorObjForValues.next();
//Object {value: 75.68, done: false}

for (const member of members) {
  console.log(member);
}
 // ['Evelyn', 75.68]
 // ['Liam', 20.16]
 // ['Sophia', 0]
 // ['Marcus', 10.25]

const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

for (const member of members) {
    [key,...value]=member;
    console.log(key, value);
}

//WeakMap
/*
a WeakMap can only contain objects as keys,
a WeakMap is not iterable which means it can’t be looped and
a WeakMap does not have a .clear() method.
*/

const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver’s Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);
/*
WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true, 
Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, 
Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}
*/
library.set('The Grapes of Wrath', false);
//Uncaught TypeError: Invalid value used as weak map key(…)

book1 = null;
console.log(library);
// WeakMap {Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, 
// Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}

//Promises
/*
A JavaScript Promise is created with the new Promise constructor function - new Promise(). 
A promise will let you start some work that will be done asynchronously and let you get back 
to your regular work. When you create the promise, you must give it the code that will be run 
asynchronously. You provide this code as the argument of the constructor function:
*/
new Promise(function (resolve, reject) {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        if ( /* iceCreamConeIsEmpty(flavor) */ ) {
            reject(`Sorry, we're out of that flavor :-(`);//Function called when the request fails
        }
        resolve(sundae);//Function called when the request is successfully completed
    }, Math.random() * 2000);
});

//The first thing to understand is that a Promise will immediately return an object.
/*
That object has a .then() method on it that we can use to have it notify us if the request we 
made in the promise was either successful or failed. The .then() method takes two functions:
the function to run if the request completed successfully
the function to run if the request failed to complete
*/
const myPromiseObj = new Promise(function (resolve, reject) {
    // sundae creation code
});

mySundae.then(function(sundae) {
    console.log(`Time to eat my delicious ${sundae}`);
}, function(msg) {
    console.log(msg);
    self.goCry(); // not a real method
});
/*
As you can see, the first function that's passed to .then() will be called and passed the data 
that the Promise's resolve function used. In this case, the function would receive the sundae 
object. The second function will be called and passed the data that the Promise's reject 
function was called with. In this case, the function receives the error message 
"Sorry, we're out of that flavor :-(" that the reject function was called with in the 
Promise code above.
*/

//Proxies
/*
To create a proxy object, we use the Proxy constructor - new Proxy();.
The proxy constructor takes two items:
The object that it will be the proxy for an object containing the list of 
methods it will handle for the proxied object
The second object is called the handler.
*/
var richard = {status: 'looking for work'};
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'

/*
The key to making Proxies useful is the handler object that's passed as the second object to 
the Proxy constructor. The handler object is made up of a methods that will be used for 
property access.
*/

//The get trap is used to "intercept" calls to properties:
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
const agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
//This will log out the target object of the proxy (the richard object) and then logs out 
//the name of the property being requested (the status property).

//If we wanted to actually provide the real result, we would need to return the property on the target object:
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target);
        console.log(propName);
        return target[propName];
    }
};
const agent = new Proxy(richard, handler);
agent.status; // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status

//The set trap is used for intercepting code that will change a property. 
//The set trap receives: the object it proxies the property that is being set the new value for the proxy

const richard = {status: 'looking for work'};
const handler = {
    set(target, propName, value) {
        if (propName === 'payRate') { // if the pay is being set, take 15% as commission
            value = value * 0.85;
        }
        target[propName] = value;
    }
};
const agent = new Proxy(richard, handler);
agent.payRate = 1000; // set the actor's pay to $1,000
agent.payRate; // $850 the actor's actual pay

/*
Other Traps
the get trap - lets the proxy handle calls to property access
the set trap - lets the proxy handle setting the property to a new value
the apply trap - lets the proxy handle being invoked (the object being proxied is a function)
the has trap - lets the proxy handle the using in operator
the deleteProperty trap - lets the proxy handle if a property is deleted
the ownKeys trap - lets the proxy handle when all keys are requested
the construct trap - lets the proxy handle when the proxy is used with the new keyword as a constructor
the defineProperty trap - lets the proxy handle when defineProperty is used to create a new property on the object
the getOwnPropertyDescriptor trap - lets the proxy handle getting the property's descriptors
the preventExtenions trap - lets the proxy handle calls to Object.preventExtensions() on the proxy object
the isExtensible trap - lets the proxy handle calls to Object.isExtensible on the proxy object
the getPrototypeOf trap - lets the proxy handle calls to Object.getPrototypeOf on the proxy object
the setPrototypeOf trap - lets the proxy handle calls to Object.setPrototypeOf on the proxy object
*/

//Generators
/*
Whenever a function is invoked, the JavaScript engine starts at the top of the function 
and runs every line of code until it gets to the bottom. There's no way to stop the execution 
of the function in the middle and pick up again at some later point. This "run-to-completion" 
is the way it's always been:
*/
function getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
    }

    console.log('the function has ended');
}

getEmployee();
/*
the function has started
Amanda
Diego
Farrin
James
Kagure
Kavita
Orit
Richard
the function has ended
*/

//Pausable Functions
/*
If we do want to be able to pause a function mid-execution, then we'll need a new type of 
function available to us in ES6 - generator functions! Let's look at one:
Notice the asterisk (i.e. *) right after the function keyword? 
That asterisk indicates that this function is actually a generator!
*/
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log( name );
    }

    console.log('the function has ended');
}

getEmployee();

// this is the response I get in Chrome:
//getEmployee {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}

//When a generator is invoked, it doesn't actually run any of the code inside the function. 
//Instead, it creates and returns an iterator. This iterator can then be used to execute the 
//actual generator's inner code.

const generatorIterator = getEmployee();
generatorIterator.next();

function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
        yield;//Pauses the function
    }

    console.log('the function has ended');

const generatorIterator = getEmployee();
generatorIterator.next();//Resumes function 

//Yielding Data to the "Outside" World
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        yield name;//"yield" the name back out to the function and then pause its execution.
    }

    console.log('the function has ended');
}

const generatorIterator = getEmployee();
let result = generatorIterator.next();
result.value // is "Amanda"

generatorIterator.next().value // is "Diego"
generatorIterator.next().value // is "Farrin"

//We can also send data back into the generator, too. We do this using the .next() method:
function* displayResponse() {
    const response = yield;
    console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // starts running the generator function
iterator.next('Hello Udacity Student'); // send data into the generator
// the line above logs to the console: Your response is "Hello Udacity Student"!

function* getEmployee() {
    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];
    const facts = [];

    for (const name of names) {
        // yield *out* each name AND store the returned data into the facts array
        facts.push(yield name); 
    }

    return facts;
}
/*
o the yield keyword is used to pause a generator and used to send data outside of the generator, 
and then the .next() method is used to pass data into the generator. Here's an example that makes 
use of both of these to cycle through a list of names one at a time:
*/

const generatorIterator = getEmployee();

// get the first name out of the generator
let name = generatorIterator.next().value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is cool!`).value; 

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is awesome!`).value; 

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is stupendous!`).value; 

// you get the idea
name = generatorIterator.next(`${name} is rad!`).value; 
name = generatorIterator.next(`${name} is impressive!`).value;
name = generatorIterator.next(`${name} is stunning!`).value;
name = generatorIterator.next(`${name} is awe-inspiring!`).value;

// pass the last data in, generator ends and returns the array
const positions = generatorIterator.next(`${name} is magnificent!`).value; 

// displays each name with description on its own line
positions.join('\n');