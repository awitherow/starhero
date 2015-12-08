// The Player Sprite
define(
    "Player",
    [
        "phaser"
    ],
    function(Phaser, Bullet) {

        var Player = function(game) {
            this.game = game;
            Phaser.Sprite.call(this, game, 32, game.world.height -150, 'dude');

            // player physics & properties
            game.physics.arcade.enable(this);
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
        };

        Player.prototype.collectItem = function (player, item) {
            var that = this;

            var itemsMap = [
                {
                    key: 'star',
                    points: 10,
                    healthPoints: 0,
                    spawn: 1,
                    spawnType: ''
                },

                {
                    key: 'firstaid',
                    points: 0,
                    healthPoints: 50,
                    spawn: 1,
                    spawnType: null
                },

                {
                    key: 'diamond',
                    points: 60,
                    healthPoints: 0,
                    spawn: 1,
                    spawnType: 'baddie'
                }
            ];

            itemsMap.forEach(function(obj) {
                if ( obj.key === "diamond" ){ // on collecting diamonds
                    // game.score += 50;

                } else if ( obj.key === "firstaid" ) { // on collecting firstaid
                    // game.healthPoints += 50;

                } else { // on collecting stars
                    // game.score += 10;
                }

            });

            item.destroy(); // use destroy in case of items, otherwise piggy memory oink oink.

        };

        return Player;

    }
);