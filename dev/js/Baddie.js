// The Baddie
define(
    "Baddie",
    [
        "phaser"
    ],
    function(Phaser) {

        var Baddie = function(game, x, y, type) {

            Phaser.Sprite.call(this, game, x, y, type);
            this.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(this, true);

            this.enableBody = true;
            this.body.gravity.y = 200;

            this.body.collideWorldBounds = true; // if off screen, collide against boundaries
            
            game.add.existing(this);

        };

        Baddie.prototype = Object.create(Phaser.Sprite.prototype);
        Baddie.prototype.constructor = Baddie;

        Baddie.movements = {
            "left_pounce": function(entity){ // 
                if (entity.x > (0 + entity._frame.centerX) ) {
                    entity.x -= 2;
                    return entity;

                }

                entity.x = 0;
                entity.move = "right_pounce";
                // baddie animation
                entity.animations.stop(null, true); // stop all animation
                var right_pounce = entity.animations.add('right_pounce', [2,3]);
                right_pounce.play(10, true);

            },
            "right_pounce": function (entity){
                if (entity.x < (768 - entity._frame.centerX)) {
                    entity.x += 2;
                    return entity;
                }

                entity.x = 768;
                entity.move = "left_pounce";

                // baddie animation
                entity.animations.stop(null, true); // stop all animations
                var left_pounce = entity.animations.add('left_pounce', [1,0]); // create left pounce
                left_pounce.play(10, true);
            }
        };

        Baddie.prototype.update = function() {
            this.handleMovement();
        };

        Baddie.prototype.handleMovement = function () {
            if (this.move in Baddie.movements) {
                return Baddie.movements[this.move](this);
            }
        };

        return Baddie;

    }
);