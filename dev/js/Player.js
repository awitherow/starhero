// The Player Sprite
define(
    "Player",
    [
        "phaser"
    ],
    function(Phaser, Bullet) {

        var Player = function(game) {
            Phaser.Sprite.call(this, game, 32, game.world.height -150, 'dude');

            // player physics & properties
            game.physics.arcade.enable(player);
            this.body.bounce.y = 0.1;
            this.body.gravity.y = 400;
            this.body.collideWorldBounds = true; // if off screen, collide against boundaries

            // player animations
            this.animations.add('left', [0,1,2,3], 10, true);
            this.animations.add('right', [5,6,7,8], 10, true);

            game.add.existing(this);
        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function() {

        };

       return Player;

    }
);