// The Items Group
define(
    "Bombs",
    [
        "phaser",
        "Explosion"
    ],
    function (Phaser, Explosion) {

        var Bombs = function (game, player) {
            Phaser.Group.call(this, game);

            this._player = player;
            this.game = game;
            game.physics.arcade.enable(this, true);
            game.add.existing(this);

            this.start();
        };

        Bombs.prototype = Object.create(Phaser.Group.prototype);
        Bombs.prototype.constructor = Bombs;

        Bombs.prototype.start = function () {

            this._bombTime = 0;
            for (var i = 0; i < 100; i++) {
                var h = this.create(14, 8, 'bomb');
                h.name = 'bomb' + i;
                h.exists = false;
                h.visible = false;
                this.game.physics.arcade.enable(h);
                h.checkWorldBounds = true;
                h.events.onOutOfBounds.add(h.kill, h);
                h.anchor.setTo(0.5, 0.5);
            }
        };

        Bombs.prototype.fire = function () {

            if (this.game.time.now > this._bombTime) {
                var bomb = this.getFirstExists(false);

                if (bomb) {
                    bomb.reset(this._player.x, this._player.y);

                    console.log('dump');
                    bomb.body.velocity.y = +300;
                    this._bombTime = this.game.time.now + 150;

                }
            }

        };

        Bombs.prototype.createExplosion = function (bomb) {
            this.game.killCount += 1;
            bomb.kill();
            this._explosion = new Explosion(this.game, bomb.x, bomb.y - 30);
        };

        return Bombs;

    }
);