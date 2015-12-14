// The Baddies Group
define(
    "BaddieGroup",
    [
        "phaser",
        "Baddie"
    ],
    function(Phaser, Baddie) {

        var BaddieGroup = function(game) {
            Phaser.Group.call(this, game);

            game.physics.arcade.enable(this, true);

            game.add.existing(this);
        };

        BaddieGroup.prototype = Object.create(Phaser.Group.prototype);
        BaddieGroup.prototype.constructor = BaddieGroup;

        BaddieGroup.prototype.spawnBaddies = function (amount, baddieType) {

            for ( var i = 0; i < amount; i++ ) {
                var locX = Math.floor(Math.random() * this.game.world.bounds.width);
                var locY = Math.floor(Math.random() * this.game.world.bounds.width / 2);

                var baddie = new Baddie(this.game, locX, locY, baddieType.type);
                baddie._baddieType = baddieType;
                baddie.move = "left_pounce";

                var left_pounce = baddie.animations.add('left_pounce', [1,0]); // create left pounce
                left_pounce.play(10, true);
                this.add(baddie);
            }

        };

        return BaddieGroup;

    }
);