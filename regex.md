# Regular Expressions
## Test Method - Regex Boolean
```js
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString);
// result == true
```

Flags | | 
-- | -- 
i | ignore case
g | global - extracts pattern more than once
m | multi line

Character classes | |
-- | -- 
[abc] | single character a, b or c
[^abc] | any character except a, b, or c
[a-z] | character in range a-z
. | any single character
\s | white space
\S | non-whitespace
\d | any digit
\D | any non-digit
\w | any word character, equivalent to [a-zA-Z0-9_]
\W | negated \w

Group Constructs | |
-- | --
(...) | everything enclosed
(a|b) | match a or b

Quantifiers | | Example | Result
-- | -- | -- | --
a? | zero or one of a | /ba?/g | ***ba b*** a
a* | zero or more of a | /ba*/g | a ***ba baaa*** aaa ***ba b***
a+ | one or more of a |
a{3} | exactly 3 of a |
a{3,} | 3 or more of a |
a{3,6} | 3 to 6 of a |
a*? | Lazy - matches as few of a as possible | /<.*?>/ | ***\<h1>*** Winter is coming ***\</h1>***
