(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function () {
    Asteroids.MovingObject.call(this,
      arguments[0],
      [0,0],
      Ship.RADIUS,
      Ship.COLOR,
      arguments[1]
    );
  };
  Ship.RADIUS = 5;

  Ship.COLOR = "#FF0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);



})();
