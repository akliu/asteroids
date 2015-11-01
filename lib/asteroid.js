(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.health = options.health || 3;
    this.img = new Image();
    this.img.src = "./asteroid_02.png";
    this._index = 0;
    this.asteroidRow = Math.floor(Math.random() * 7) * 128;
    this.diameter = options.radius * 2;
    this.rotationSpeed = (Math.random() / 4) + 0.1;

    options.vel = options.vel || Asteroids.Util.randomVelocity(2);
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.pos = this.game.centerPosition();
      otherObject.vel = [0,0];
    }
  };

  Asteroid.prototype.updateIndex = function(){
    this._index += this.rotationSpeed;
    if(this._index >= 8){
      this._index = 0;
    }
  };

  Asteroid.prototype.draw = function (ctx){
    var frame = 128 * Math.floor(this._index);
    ctx.drawImage(this.img,
                  frame, this.asteroidRow,
                  128, 128,
                  this.pos[0] - 10, this.pos[1] - 10,
                  this.diameter, this.diameter);
    this.updateIndex();
  };
})();
