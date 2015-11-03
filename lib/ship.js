(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    this.img = new Image();
    this.img.src = "./spaceship.png";
    this.rot = (Math.PI/2);
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0,0];
    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 10;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    if(impulse === "thrust"){
      if(Asteroids.Util.norm(this.vel) < 12){
        this.vel[0] += Math.cos(this.rot) * 0.1;
        this.vel[1] += -Math.sin(this.rot) * 0.1;
      }
    } else if (impulse === "brake"){
      this.vel[0] = this.vel[0] * 0.9;
      this.vel[1] = this.vel[1] * 0.9;
    } else if (impulse === "rotateLeft"){
      this.rot += (2 * Math.PI)/64;
    } else if (impulse === "rotateRight"){
      this.rot += -(2 * Math.PI)/64;
    }
  };

  Ship.prototype.fireBullet = function () {
    var shipFront = [this.pos[0] + (5 * Math.cos(this.rot)),
                          this.pos[1] + (-5 * Math.sin(this.rot))];
    var bulletDirection = Asteroids.Util.dir(
      [(shipFront[0] - this.pos[0]), (shipFront[1] - this.pos[1])]);
    var bulletVector = Asteroids.Util.scale( bulletDirection,
                            Asteroids.Bullet.SPEED);

    this.vel[0] -= bulletDirection[0] * 0.03;
    this.vel[1] -= bulletDirection[1] * 0.03;

    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: bulletVector,
      game: this.game
    });

    var laserSound = document.getElementById("laser");
    laserSound.play();
    this.game.addBullet(bullet);
  };

  Ship.prototype.draw = function(ctx, canvas){
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.rot + (Math.PI/2));
    ctx.drawImage(this.img, -15, -12.5, 30, 25);
    ctx.restore();
  };

  Ship.prototype.move = function () {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    if (this.game.isOutOfBounds(this.pos)) {
      if(this.isWrappable){
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  Ship.prototype.collideWith = function (otherObject) {
    if ((otherObject instanceof Asteroids.Asteroid) &&
    (JSON.stringify(this.pos) != JSON.stringify(this.game.centerPosition()))) {
      this.game.lives -= 1;
    }
  };
})();
