// The Player Sprite
define(
    "Player",
    [
        "phaser",
        "Bullets"
    ],
    function(Phaser, Bullets) {

        var Player = function(game) {
            Phaser.Sprite.call(this, game, 32, game.world.height -150, 'guy');

            // player physics & properties
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.body.gravity.y = 400;
            this.body.collideWorldBounds = true; // if off screen, collide against boundaries

            // player animations
            this.animations.add('left', [0,1,2,3], 10, true);
            this.animations.add('right', [20,21,22,23], 10, true);

            this._bullets = new Bullets(this.game, this);

            game.add.existing(this);

        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function() {
            this.handleMovement(); // handle all directional movement
        };

        /**
         * handleMovement
         * handles x & y axis movements and related animations.
         */

        Player.prototype.handleMovement = function () {
            this.body.velocity.x = 0; //reset movement

            // left, right, standing still directional movement
            if ( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) { // move left, play left
                this.body.velocity.x = -150;
                this.animations.play('left');

            } else if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) { // move right, play right
                this.body.velocity.x = 150;
                this.animations.play('right');

            } else { // stand still
                this.animations.stop();
                this.frame = 4;
            }

            // jump
            if ( this.game.input.keyboard.isDown(Phaser.Keyboard.UP ) && this.body.touching.down ){
                this.body.velocity.y = -350;
            }

            if ( this.game.input.keyboard.isDown(Phaser.Keyboard.Q) ) {
                this._bullets.fire();
            }

        };

        return Player;

    }
);
