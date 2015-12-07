// The Items Group
define(
    "Terrain",
    [
        "phaser"
    ],
    function(Phaser) {

        var Terrain = function(game, x, y, type) {
            
            Phaser.Sprite.call(this, game, x, y, type);

            game.physics.arcade.enable(this, true);

            this.enableBody = true;

            game.add.existing(this);

        };

        Terrain.prototype = Object.create(Phaser.Sprite.prototype);
        Terrain.prototype.constructor = Terrain;

        return Terrain;

    }
);