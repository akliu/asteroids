(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVelocity();
    options.radius = Asteroid.RADIUS;
    options.color = Asteroid.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#A52A2A";
  Asteroid.RADIUS = 10;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.pos = this.game.randomPosition();
    }
  };
})();
