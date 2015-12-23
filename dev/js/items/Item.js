define(
    "items/Item",
    [
        "phaser"
    ],
    function(Phaser) {

        var Item = function(game, x, y, itemType) {

            Phaser.Sprite.call(this, game, x, y, itemType.type);

            this._itemType = itemType;

            game.physics.arcade.enable(this, true);

            this.body.velocity.y = 20; //start velocity
            this.body.gravity.y = (0.7 + Math.random()) * 20;
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
