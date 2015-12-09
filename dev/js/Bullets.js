// The Items Group
define(
    "Bullets",
    [
        "phaser"
    ],
    function(Phaser, Item) {

        var Bullets = function(game, player) {
            Phaser.Group.call(this, game);

            this._player = player;

            game.physics.arcade.enable(this, true);

            game.add.existing(this);

            this.start();
        };

        Bullets.prototype = Object.create(Phaser.Group.prototype);
        Bullets.prototype.constructor = Bullets;

        Bullets.prototype.start = function () {

            this._bulletTime = 0;
            for (var i = 0; i < 20; i++)
            {
                var b = this.create(14, 8, 'bullet');
                b.animations.add('flyLeft', [ 7, 6, 5, 4 ]);
                b.animations.add('flyRight', [ 0, 1, 2, 3 ]);
                b.animations.add('flyUp', [ 0, 1, 2, 3 ]);
                b.name = 'bullet' + i;
                b.exists = false;
                b.visible = false;
                this.game.physics.arcade.enable(b);
                b.checkWorldBounds = true;
                b.events.onOutOfBounds.add(b.kill, b);
            }
        };

        Bullets.prototype.fire = function() {

            if (this.game.time.now > this._bulletTime) {
                this._bulletTime = this.game.time.now + 150;

                var b = this.getFirstExists(false);

                if (b) {
                    b.reset(this._player.x, this._player.y);
                    b.rotation = 0;
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // move left, play left
                        b.body.velocity.x = -300;
                        b.animations.play("flyLeft", 15, true);
                    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // move right, play right
                        b.body.velocity.x = +300;
                        b.animations.play("flyRight", 15, true);
                    } else { // shoot up
                        b.body.velocity.y = -300;
                        b.rotation = -1.6;
                        b.animations.play("flyUp", 15, true);
                    }
                }
            }

        };

        return Bullets;

    }
);