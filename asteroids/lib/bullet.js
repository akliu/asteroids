(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options){
    options.radius = Bullet.RADIUS;
    options.color = "#FF0000";

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith  = function (otherObject) {

    if (otherObject instanceof Asteroids.Asteroid){
      var sprite = new Asteroids.Sprite({pos: this.pos, game: this.game,
                        url: "./GrenadeExplosion.png", frames: 20});
      this.game.addSprite(sprite);
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
