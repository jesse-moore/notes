function fizzBuzz(){
	for (var i = 1; i <= 100; i++) {
		if(!(i%3)&&(i%5))console.log('Fizz')
		else if((i%3)&&!(i%5))console.log('Buzz')
		else if ((i%3)&&(i%5))console.log(i);
		if(!(i%3)&&!(i%5))console.log('FizzBuzz');
	};
	return;
}

//filter
//map
//bind
//apply
//call

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});
var ageBM=[];
ancestry.forEach(function(person) {
	if(byName[person.mother]){
		ageBM=ageBM.concat(person.born-byName[person.mother].born);
	}
});
averageAge = ageBM.reduce(function(acc,curr){
	return acc=acc+curr;
})/ageBM.length;



var arrays = [[1, 2, 3], [4, 5], [6]];
var flatarray = arrays.reduce(function(accu, curr){
	return accu=accu.concat(curr);
})
// Your code here.
// → [1, 2, 3, 4, 5, 6]
var ancestry = JSON.parse(ANCESTRY_FILE);

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925;
}));

console.log(ancestry.filter(function(person) {
  return person.father == "Carel Haverbeke";
}));

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}

var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
  return person.name;
}));

console.log(ancestry.reduce(function(min, cur) {
  if (cur.born < min.born) return cur;
  else return min;
}));

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));
// → 61.67
console.log(average(ancestry.filter(female).map(age)));
// → 54.56
