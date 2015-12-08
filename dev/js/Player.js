// The Player Sprite
define(
    "Player",
    [
        "phaser",
        "Bullets"
    ],
    function(Phaser, Bullets) {

        var Player = function(game) {
            Phaser.Sprite.call(this, game, 32, game.world.height -150, 'dude');

            // player physics & properties
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.body.gravity.y = 400;
            this.body.collideWorldBounds = true; // if off screen, collide against boundaries

            // player animations
            this.animations.add('left', [0,1,2,3], 10, true);
            this.animations.add('right', [5,6,7,8], 10, true);

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

        Player.prototype.collectItem = function (player, item) {

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

            var bla;

            itemsMap.forEach(function(obj) {
                if (obj.key == item.key) {
                    bla = obj;
                }
            });

            this.game.score += bla.points;
            this.game.healthPoints += bla.healthPoints;

            item.destroy(); // use destroy in case of items, otherwise piggy memory oink oink.

        };

        return Player;

    }
);