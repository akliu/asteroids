(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (options) {
    options.radius = options.radius || 25;
    this.health = options.health || 3;
    this.img = new Image();
    this._index = 0;
    this.asteroidRow = Math.floor(Math.random() * 7) * 128;
    this.img.src = "./asteroid_02.png";
    this.diameter = options.radius * 2;

    options.vel = options.vel || Asteroids.Util.randomVelocity(2);
    options.color = Asteroid.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#F4A460";
  // Asteroid.RADIUS = 15;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.pos = this.game.centerPosition();
      otherObject.vel = [0,0];
    }
  };

  Asteroid.prototype.draw = function (ctx){

    var frame = 128 * this._index;
    ctx.drawImage(this.img,
                  frame, this.asteroidRow,
                  128, 128,
                  this.pos[0] - 10, this.pos[1] - 10,
                  this.diameter, this.diameter);

    if((Math.random() * 10) < 1.5 ){
      this._index++;
    }
    if(this._index === 8){
      this._index = 0;
    }
  };
})();
