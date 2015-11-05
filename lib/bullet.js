(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options){
    // this.explosionSound = document.getElementById("explosion");
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
      if (otherObject.health === 0) {
        this.game.points += 100;
        // var explosionSound = document.getElementById("explosion");
        // this.explosionSound.play();
        var sprite = new Asteroids.Sprite({pos: this.pos, game: this.game,
                          url: "./GrenadeExplosion.png", frames: 20});
        this.game.addSprite(sprite);


        if (otherObject.radius > 23) {
          this.game.points += 400;
          var numNewAsteroids = Math.floor(Math.random() * 3) + 2;

          for(var i = 0; i < numNewAsteroids; i++){
            var newAsteroid = new Asteroids.Asteroid({pos: this.pos.slice(),
                  vel: Asteroids.Util.randomVelocity(8),
                  radius: Math.floor(Math.random() * 10) + 8,
                  health: 2,
                  game: this.game});

            this.game.addAsteroid(newAsteroid);
          }
        }
        this.game.remove(otherObject);
        this.game.remove(this);
      } else {
        this.game.remove(this);
        otherObject.health -= 1;
      }
    }
  };
})();
