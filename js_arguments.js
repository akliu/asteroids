var sum = function(){
  var sum = 0;


  for (var i = 0; i < arguments.length; i++){
    sum += arguments[i];
  }

  return sum;
};
//
//
// console.log(sum(1,2,3,4, 5));
//
//
// Object.prototype.myBind = function(){
//   var fn = this;
//   var args = Array.prototype.slice.call(arguments);
//   var bindObject = args[0];
//   // var argumentsCopy = arguments.slice();
//   var argsRest = args.slice(1);
//
//
//   return function(){
//     var args2 = Array.prototype.slice.call(arguments);
//     fn.apply(bindObject,argsRest.concat(args2));
//   };
//
// };
//
//
// function Cat(name) {
//   this.name = name;
// };
//
// Cat.prototype.says = function (sound) {
//   console.log(this.name + " says " + sound + "!");
// }
//
// markov = new Cat("Markov");
// breakfast = new Cat("Breakfast");
//
// markov.says("meow");
// // Markov says meow!
//
// markov.says.myBind(breakfast, "meow")();
// // Breakfast says meow!
//
// markov.says.myBind(breakfast)("meow");
// // Breakfast says meow!
//
// var notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow");
// // Breakfast says meow!
var curriedSum = function (numArgs) {
  var numbers = [];

  var sum = function(){
    var sum = 0;

    console.log(arguments);

    for (var i = 0; i < arguments['0'].length; i++){
      sum = sum + parseInt(arguments['0'][i]);
    }

    return sum;
  };


  var _curriedSum = function (number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      return sum(numbers);
    } else{
      return _curriedSum;
   }

  };

  return _curriedSum;

};


// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56


Function.prototype.curry = function (numArgs) {
  var numbers = [];

  var that = this;
  var _curriedSum = function (number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      return that.apply(null, numbers);
    } else{
      return _curriedSum;
   }

  };

  return _curriedSum;

};


var fn = function(){
  var sum = 0;


  for (var i = 0; i < arguments.length; i++){
    sum += arguments[i] * 2;
  }

  return sum;
};


console.log(fn.curry(3)(3)(4)(5));
