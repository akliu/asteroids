var inherits = function (child, parent) {
  function Surrogate () {}
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate ();
  child.prototype.constructor = child;
};

function MovingObject (mass) {
  this.mass = mass;
}

function Ship (mass) {
  MovingObject.call(this, mass);
}
inherits(Ship, MovingObject);
Ship.prototype.shipfly = function () {
  console.log("Ship flies.");
};

function Asteroid (mass) {
  MovingObject.call(this, mass);
}
inherits(Asteroid, MovingObject);
Asteroid.prototype.fly = function () {
  console.log("Asteroid flies.");
};

var ship = new Ship(1);
var asteroid = new Asteroid(2);

// ship.shipfly();
// console.log(asteroid.shipfly());
console.log(ship.mass);

// console.log(ship.fly());
// console.log(asteroid.fly());
console.log(asteroid.mass);
