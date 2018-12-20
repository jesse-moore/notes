//----------------------------------------------Sum of all numbers in range----------------------------------------------
function sumAll(arr) {
  result = 0;
  var maxNum=arr.reduce(function(a,b){ //Find maximum number in array
    return Math.max(a,b);
  });
  var minNum=arr.reduce(function(a,b){ //Find minimum number in array
    return Math.min(a,b);
  });
  for (var i=minNum;i<=maxNum;i++){ //Starting with min number loop until max number adding each iteration to result variable
    result+=i;
  }
  return result;
}
//sumAll([1, 4]);

//----------------------------------------------Difference of two arrays----------------------------------------------
function diffArray(arr1, arr2) {
  var newArr = arr1.concat(arr2); //Combine both arrays into a new array
  var result = newArr.filter(function(val){ //Filter values from newArr
    return arr2.indexOf(val)==-1||arr1.indexOf(val)==-1; //If val from combined array is not in arr2 or is not in arr1 return the value
  });
 return result;

}
//diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

//----------------------------------------------Convert to Roman Numeral----------------------------------------------
function convertToRoman(num) {
  var sym10=['I','X','C','M']; //10s Roman Numerals
  var sym5=['V','L','D']; //5s Roman Numerals
  var rom=''; //Temp string to hold each numeral on each iteration
  var result=''; //Result string
  var strNum = num.toString(); //Convert argument to string in order to get each digit at specific index
  function roman(num){ //Function to iterate through each digit of argument
    if(num===0){return 0;} //Catch if value is zero
      for(var i=0;i<strNum.length;i++){ //Iterate through each digit starting with the first digit
        rom=getRoman(strNum[i],strNum.length-i); //Send each digit and position in relation to number length to getRoman function
        result=result.concat(rom); //Concat each result to the end of result
      }
    return result;
  }
  function getRoman(snum,i){
    if(snum==5){
      return sym5[i-1];
    } else if(snum%5==4){    
      return snum==4?sym10[i-1]+sym5[i-1]:sym10[i-1]+sym10[i]; 
    } else if(snum%5==1){
      return snum==6?sym5[i-1]+sym10[i-1]:sym10[i-1];
    } else{
        return snum<5?sym10[i-1].repeat(snum):sym5[i-1]+sym10[i-1].repeat(snum-5);
    }
  }
return roman(num);
}

//----------------------------------------------Symmetric Difference----------------------------------------------
function sym(args) {
  var arr = Array.prototype.slice.call(arguments); //Make arguments into an Array
  var newArr = []; //Array to hold results
  return arr.reduce(function(acc,item){ //Iterate through arrays
    if(acc==0){acc=item;}else //Check if first iteration, if it is set accumulator to first item
    {
    newArr = acc.concat(item); //Set newArr as all items in acc and item
    newArr=newArr.filter(function(num,pos){return newArr.indexOf(num)==pos;}); //Filter duplicate numbers in newArr
    acc=newArr.filter(function(val){ //set accumulator to the results of the filter
    if(item.indexOf(val)==-1||acc.indexOf(val)==-1){return true;} //Check differences between acc and item
    });
    }
    return acc;
  },0);
}

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6]);

//----------------------------------------------              ----------------------------------------------
convertToRoman(5);

var arr = [10, 20, 30, 60];
arr.reduce(function(acc, item){
   return acc;
}, 0);

var arr2 = [-20, -50, -5, -60];
arr2 = arr2.reduce(function(acc, item){
//console.log(Math.max(acc,item));
  return Math.max(acc, item);
}, arr2[0]);

console.log(arr2);