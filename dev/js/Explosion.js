// The Items Group
define(
    "Explosion",
    [
        "phaser"
    ],
    function(Phaser) {

        var Explosion = function(game, x, y) {
            Phaser.Sprite.call(this, game, x, y, 'explosion');
            this.game = game;

            this.anchor.setTo(0.5, 0.5);
            this.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 30, true);

            this.game.physics.arcade.enable(this, true);
            this.game.add.existing(this);
            this.explode(x,y);
        };

        Explosion.prototype = Object.create(Phaser.Sprite.prototype);
        Explosion.prototype.constructor = Explosion;

        Explosion.prototype.explode = function (x, y) {
            var explosion = this;
                explosion.x = x;
                explosion.y = y;

            this.animations.play('explode', 30, false, true);
            this.game._baddies.children.forEach(function(baddie){
                var center = explosion._frame.centerX;
                if ((baddie.x > explosion.x - center && baddie.x < explosion.x + center) &&
                    (baddie.y > explosion.y - center && baddie.y < explosion.y + center )) {
                    baddie.kill();

                }

            });

        };
        
        return Explosion;

    }
);