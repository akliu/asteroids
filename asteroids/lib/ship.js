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
  Ship.RADIUS = 5;

  Ship.COLOR = "#FF0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    // debugger
    if(impulse === "thrust"){
      this.vel[0] += Math.cos(this.rot);
      this.vel[1] += -Math.sin(this.rot);
    } else if (impulse === "brake"){
      this.vel[0] = 0;
      this.vel[1] = 0;
    } else if (impulse === "rotateLeft"){
      this.rot += (2 * Math.PI)/32;
    } else if (impulse === "rotateRight"){
      this.rot += -(2 * Math.PI)/32;
    }
  };

  Ship.prototype.fireBullet = function () {
    // debugger
    var norm = Asteroids.Util.norm(this.vel);

    if (norm === 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      // color: this.color,
      game: this.game
    });

    this.game.addBullet(bullet);
  };

  Ship.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + (5 * Math.cos(this.rot)), this.pos[1] + (-5 * Math.sin(this.rot)));
    ctx.lineTo(this.pos[0] + (5 * Math.cos(this.rot +  (Math.PI/2))),
                  this.pos[1] + (-5 * Math.sin(this.rot +  (Math.PI/2))));
    ctx.lineTo(this.pos[0] + (5 * Math.cos(this.rot -  (Math.PI/2))),
                  this.pos[1] + (-5 * Math.sin(this.rot -  (Math.PI/2))));
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );a

    ctx.fill();

  };

  Ship.prototype.move = function () {

    // this.front[0] = this.front[0] + this.vel[0];
    // this.front[1] = this.front[1] + this.vel[1];
    // this.back[0] = this.back[0] + this.vel[0];
    // this.back[1] = this.back[1] + this.vel[1];

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

})();
