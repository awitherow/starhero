// The Items Group
define(
    "Environment",
    [
        "phaser",
        "Terrain"
    ],
    function(Phaser, Terrain) {

        var Environment = function(game) {
            Phaser.Group.call(this, game);

            game.physics.arcade.enable(this, true);

            game.add.existing(this);

        };

        Environment.prototype = Object.create(Phaser.Group.prototype);
        Environment.prototype.constructor = Environment;

        Environment.prototype.start = function () {
            this.setGround();
            this.setLedges();
        };

        Environment.prototype.update = function() {

        };

        Environment.prototype.setGround = function () {

        };

        Environment.prototype.setLedges = function () {

        };

        return Environment;

    }
);