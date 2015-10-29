(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (options) {
    this.health = 3;
    options.vel = Asteroids.Util.randomVelocity(2);
    options.radius = Asteroid.RADIUS;
    options.color = Asteroid.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#F4A460";
  Asteroid.RADIUS = 15;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.pos = this.game.randomPosition();
    }
  };
})();
