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

        Environment.prototype.setEnvironment = function () {

            var that = this;

            var envMap = [
                {
                    x: 0,
                    y: this.game.world.height - 64,
                    type: 'ground'
                },
                {
                    x: 300,
                    y: 450,
                    type: 'ledge'
                },
                {
                    x: 0,
                    y: 375,
                    type: 'ledge'
                },
                {
                    x: 725,
                    y: 365,
                    type: 'ledge'
                },
                {
                    x: 500,
                    y: 300,
                    type: 'ledge'
                },
            ];

            envMap.forEach(function(obj) {
                var terrain = new Terrain(that.game, obj.x, obj.y, obj.type);
                terrain.body.immovable = true;
                terrain.enableBody = true;
                if (obj.type === "ground") {
                    terrain.scale.setTo(2,2); // scales to fit, original file is 400x32 pixels.
                }
                that.add(terrain);
            });

        };

        return Environment;

    }
);