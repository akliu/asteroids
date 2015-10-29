(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


    var Sprite = Asteroids.Sprite = function(options) {
        this.pos = options.pos;
        this.size = options.size;
        this.speed = typeof options.speed === 'number' ? options.speed : 0;
        this.frames = options.frames;
        this._index = 0;
        this.url = options.url;
        this.dir = options.dir || 'horizontal';
        this.once = options.once;
        this.img = new Image();
        this.img.src = this.url;
    };

    Sprite.prototype = {
        update: function() {
            this._index += 1;
        },

        render: function(ctx) {
            // var frame;
            //
            // if(this.speed > 0) {
            //     var max = this.frames.length;
            //     var idx = Math.floor(this._index);
            //     frame = this.frames[idx % max];
            //
            //     if(this.once && idx >= max) {
            //         this.done = true;
            //         return;
            //     }
            // }
            // else {
            //     frame = 0;
            // }
            //
            //
            // var x = this.pos[0];
            // var y = this.pos[1];
            //
            // if(this.dir == 'vertical') {
            //     y += frame * this.size[1];
            // }
            // else {
            //     x += frame * this.size[0];
            // }

            var image = 50 * this._index;

            ctx.drawImage(this.img,
                          image, 0,
                          50, 100,
                          this.pos[0] - 25, this.pos[1] - 50,
                          50, 100);
        }
    };
})();
