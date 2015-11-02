( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.recharge = 0;
    this.img = new Image();

    this.img.onload = function(){
      this.ctx.drawImage(this.img, 0, 0);
    }.bind(this);
    this.img.src = "./space-stars.jpg";
  };


  GameView.prototype.preventScrolling = function() {
    window.addEventListener("keydown", function(e) {
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
      if (this.recharge === 0){
        this.ship.fireBullet();
        this.recharge = 3;
      }
    }
  };

  GameView.prototype.intro = function () {
    var that = this;
    var listenForSpace = setInterval(function(){
      that.game.drawIntro(that.ctx, that.img);
      if (key.isPressed('enter')){
        that.start();
        clearInterval(listenForSpace);
      }
    }, 20);
  };

  GameView.prototype.adjustRecharge = function() {
    if(this.recharge > 0){
      this.recharge -= 1;
    }
  };

  GameView.prototype.start = function () {
    var that = this;
    var won = false;

    setInterval(function() {
      if((that.game.lives >= 0) && (!won)){
        that.adjustRecharge();
        that.keyInput();
        that.game.step();
        that.game.draw(that.ctx, that.img);
        won = that.game.won();
      }else {
        if(won){
          that.game.drawWon(that.ctx, that.img);
        }else {
          that.game.drawLost(that.ctx, that.img);
        }
        if(key.isPressed('enter')){
          won = false;
          that.game = new Asteroids.Game(document.getElementById("game-canvas"));
          that.ship = that.game.addShip();
        }
      }
    }, 20);

     this.preventScrolling();
  };
})();
