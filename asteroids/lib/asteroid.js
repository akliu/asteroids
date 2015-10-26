(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#A52A2A";
  var RADIUS = 10;

  var Asteroid = Asteroids.Asteroid = function () {


    Asteroids.MovingObject.call(this,
    arguments[0].pos,
    Asteroids.Util.randomVelocity(),
    RADIUS,
    COLOR,
    arguments[0].game
  );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.pos = this.game.randomPosition();
    }
  };
})();
