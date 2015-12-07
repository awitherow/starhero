// The Individual Item
define(
    "Item",
    [
        "phaser"
    ],
    function(Phaser) {

        var Item = function(game) {
            Phaser.Group.call(this, game);

            this.game.physics.arcade.enable(this, true);

            this.start();

            game.add.existing(this);
            
        };

        Item.prototype = Object.create(Phaser.Sprite.prototype);
        Item.prototype.constructor = Item;

        Item.prototype.start = function () {
        };

        Item.prototype.update = function() {

        };

       return Item;

    }
);