// The Individual Item
define(
    "Item",
    [
        "phaser"
    ],
    function(Phaser) {

        var Item = function(game, x, y) {

            Phaser.Sprite.call(this, game, x, y, "star");

            game.physics.arcade.enable(this, true);

            this.body.gravity.y = (0.7 + Math.random()) * 15;
            this.body.bounce.y = 0.7 + Math.random() * 0.2;

            this.body.collideWorldBounds = true; // if off screen, collide against boundaries
            
            game.add.existing(this);

        };

        Item.prototype = Object.create(Phaser.Sprite.prototype);
        Item.prototype.constructor = Item;

        Item.prototype.update = function() {

        };

        return Item;

    }
);