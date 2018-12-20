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
}
```
Set *this* to self to be sure *self* refers to the right *this*
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
  console.log('hello ' + name);
}('John'));
```

// Credit to Jake Archibald
// https://github.com/jakearchibald/svgomg/blob/master/src/js/page/utils.js#L7
```js
@param  {String} url 
@return {Promise}    
```
