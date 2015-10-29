( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();



  };

  GameView.MOVES = {
    "up": "thrust",
    "left": "rotateLeft",
    "down": "brake",
    "right": "rotateRight",
  };


  // GameView.prototype.bindKeyHandlers = function () {
  //   var ship = this.ship;
  //
  //   Object.keys(GameView.MOVES).forEach(function (k) {
  //     debugger
  //     var move = GameView.MOVES[k];
  //     key(k, function () {
  //       ship.power(move);
  //     });
  //   });
  //
  //   key("space", function () {
  //     ship.fireBullet();
  //   });
  //
  // };

  GameView.prototype.preventScrolling = function() {
  window.addEventListener("keydown", function(e) {
    // space and arrow keys

    if(e.keyIdentifier === "Up" || e.keyIdentifier === "Down" ||
        e.keyIdentifier === "Left" || e.keyIdentifier === "Right"){
          e.preventDefault();
        }
      });
  };

  GameView.prototype.keyInput = function () {
    if (key.isPressed('up')) {
      this.ship.power("thrust");
    }
    if (key.isPressed('down')) {
      this.ship.power("brake");
    }
    if (key.isPressed('left')) {
      this.ship.power("rotateLeft");
    }
    if (key.isPressed('right')) {
      this.ship.power("rotateRight");
    }
    if (key.isPressed('space')) {
      this.ship.fireBullet();
    }
  };

  GameView.prototype.start = function () {
    var that = this;
    var img = new Image();
    img.onload = function(){
      this.ctx.drawImage(img, 0, 0);
    }.bind(this);
    img.src = "./space-stars.jpg";
    setInterval(function() {
      if(that.game.lives >= 0){
        that.keyInput();
        that.game.step();
        that.game.draw(that.ctx, img);
      }else {
        that.game.drawOver(that.ctx, img);
      }
    }, 20);

     this.preventScrolling();
  };
})();
