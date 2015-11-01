(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Sprite = Asteroids.Sprite = function(options) {
      this.game = options.game;
      this.pos = options.pos;
      this.frames = options.frames;
      this._index = 0;
      this.url = options.url;
      this.img = new Image();
      this.img.src = this.url;
  };

  Sprite.prototype = {
      update: function() {
          this._index += 1;
          if(this._index > this.frames){
            this.game.remove(this);
          }
      },

      draw: function(ctx) {
          var image = 50 * this._index;
          ctx.drawImage(this.img,
                        image, 0,
                        50, 100,
                        this.pos[0] - 25, this.pos[1] - 50,
                        50, 100);
          this.update();
      }
  };
})();
