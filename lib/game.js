(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  //
  // var DIM_X = 700;
  // var DIM_Y = 700;
  var NUM_ASTEROIDS = 1;

  // var Game = Asteroids.Game = function (xDim, yDim) {
  var Game = Asteroids.Game = function (canvas) {
    this.canvas = canvas;
    this.xDim = window.innerWidth;
    this.yDim = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // this.asteroids = this.addAsteroids();
    this.asteroids = [];
    this.bullets = [];
    // this.ship = this.addShip( );
    this.ships = [];
    this.lives = 3;
    this.sprites = [];
    // this.sprite = new Asteroids.Sprite({pos: [10,10], size: 15, speed: 1,
    //                   url: "./GrenadeExplosion.png", frames: [0,1,2,3,4,5,6,7]});

    this.addAsteroids();


  };

  Game.prototype.addSprite = function (sprite){
    this.sprites.push(sprite);
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.centerPosition(),
      game: this
    });

    this.ships.push(ship);
    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  Game.prototype.randomPosition = function () {
    return [this.xDim * Math.random(), this.yDim * Math.random()];
  };

  Game.prototype.centerPosition = function () {
    return [this.xDim / 2 , this.yDim / 2];
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  };

  // Game.prototype.addShip = function () {
  //   var ship = new Asteroids.Ship( this.randomPosition(), this);
  //
  //   this.ship = ship;
  //
  //   return ship;
  // };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid({
        pos: this.randomPosition(),
        radius: 23 + Math.floor(Math.random() * 25),
        game: this
      }));
    }
  };

  Game.prototype.drawIntro = function(ctx){
    ctx.font = '48px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText('Asteroids!', (this.xDim / 2) - 100, (this.yDim / 2) - 50);
    ctx.font = '24px Helvetica Neue';
    ctx.fillText('Press enter to start!', (this.xDim / 2) - 100, (this.yDim / 2));
  };

  Game.prototype.drawOver = function(ctx, img){
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    ctx.drawImage(img, 0, 0);
    ctx.font = '48px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText('You lose!', (this.xDim / 2) - 100, (this.yDim / 2) - 50);
    ctx.font = '24px Helvetica Neue';
    ctx.fillText('Press enter to play again', (this.xDim / 2) - 120, this.yDim / 2);
  };

  Game.prototype.draw = function (ctx, img) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    ctx.drawImage(img, 0, 0);

    ctx.textAlign = 'left';
    ctx.font = '20px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText("Lives Remaining: " + this.lives, 40, this.yDim - 130);
    ctx.fillText("Right/Left to Rotate", 40, this.yDim - 100);
    ctx.fillText("Up/Down to Move", 40, this.yDim - 70);
    ctx.fillText("Spacebar to Shoot", 40, this.yDim - 40);


    this.sprites.forEach(function(sprite){
      sprite.render(ctx);
      sprite.update();
    }.bind(this));
    // this.sprite.render(ctx);
    // this.sprite.update();

    this.allObjects().forEach(function(object) {
      object.draw(ctx, this.canvas);
    }.bind(this));
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    var curX = pos[0];
    var curY = pos[1];
    var wrappedPos = [curX, curY];



    if (curX < 0) {
      wrappedPos[0] = curX + this.xDim;
    }

    if (curX > this.xDim) {
      wrappedPos[0] = curX - this.xDim;
    }

    if (curY < 0) {
      wrappedPos[1] = curY + this.yDim;
    }

    if (curY > this.yDim) {
      wrappedPos[1] = curY - this.yDim;
    }

    return wrappedPos;
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      var result = [];
      for (var i = 0; i < this.asteroids.length; i++) {
        var xPos = object.pos[0];
        var yPos = object.pos[1];
        if (this.asteroids[i].pos[0] !== xPos && this.asteroids[i].pos[1] !== yPos) {
          result.push(this.asteroids[i]);
        }
      }
      this.asteroids = result;
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Sprite){
      this.sprites.splice(this.sprites.indexOf(object), 1);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > this.xDim) || (pos[1] > this.yDim);
  };

})();
