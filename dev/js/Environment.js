// The Items Group
define(
    "Environment",
    [
        "phaser",
        "underscore",
        "Terrain"
    ],
    function(Phaser, _, Terrain) {

        var Environment = function(game) {
            Phaser.Group.call(this, game);

            game.physics.arcade.enable(this, true);

            game.add.existing(this);

        };

        Environment.prototype = Object.create(Phaser.Group.prototype);
        Environment.prototype.constructor = Environment;

        Environment.prototype.setEnvironment = function () {

            var envMap = {
                first: {
                    x: 0,
                    y: 732,
                    type: 'ground'
                },
                first: {
                    x: 300,
                    y: 450,
                    type: 'ledge'
                },
                second: {
                    x: 0,
                    y: 375,
                    type: 'ledge'
                },
                third: {
                    x: 725,
                    y: 365,
                    type: 'ledge'
                },
                fourth: {
                    x: 500,
                    y: 300,
                    type: 'ledge'
                },
            };

            _.each(envMap, function (obj) {
                var terrain = new Terrain(this.game, obj.x, obj.y, obj.type);
                terrain.body.immovable = true;
                if (obj.type === "ground") {
                    terrain.scale.setTo(2,2); // scales to fit, original file is 400x32 pixels.
                }
                this.add(terrain);
            }, this);

        };

        return Environment;

    }
);