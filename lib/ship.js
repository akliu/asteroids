(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function (options) {
    // this.front = this.front || [50,50];
    // this.back = this.back || [50,60];

    this.rot = (Math.PI/2);
    options.radius = Ship.RADIUS;
    options.color = options.color || Ship.COLOR;
    options.vel = options.vel || [0,0];

    Asteroids.MovingObject.call(this, options);
  };
  Ship.RADIUS = 10;

  Ship.COLOR = "#FF0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    // debugger
    if(impulse === "thrust"){
      this.vel[0] += Math.cos(this.rot) * 0.1;
      this.vel[1] += -Math.sin(this.rot) * 0.1;
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
      [(shipFront[0] - this.pos[0]), (shipFront[1] - this.pos[1])]
    );
    var bulletVector = Asteroids.Util.scale(
      bulletDirection,
      Asteroids.Bullet.SPEED
    );

    this.vel[0] -= bulletDirection[0] * 0.03;
    this.vel[1] -= bulletDirection[1] * 0.03;

    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: bulletVector,
      // color: this.color,
      game: this.game
    });

    this.game.addBullet(bullet);
  };

  Ship.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + (Ship.RADIUS * Math.cos(this.rot)), this.pos[1] + (-Ship.RADIUS * Math.sin(this.rot)));
    ctx.lineTo(this.pos[0] + (Ship.RADIUS * Math.cos(this.rot +  ( 1.5 * Math.PI/2))),
                  this.pos[1] + (-Ship.RADIUS * Math.sin(this.rot +  ( 1.5 * Math.PI/2))));
    ctx.lineTo(this.pos[0] + (Ship.RADIUS * Math.cos(this.rot -  ( 1.5 * Math.PI/2))),
                  this.pos[1] + (-Ship.RADIUS * Math.sin(this.rot - ( 1.5 * Math.PI/2))));

    ctx.fill();

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
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.lives -= 1;
    }
    console.log(this.game.damage);
  };

})();
