// The Items Group
define(
    "ItemsGroup",
    [
        "phaser",
        "Item"
    ],
    function(Phaser, Item) {

        var ItemsGroup = function(game) {
            Phaser.Group.call(this, game);

            this.game.physics.arcade.enable(this, true);

            this.start();

            game.add.existing(this);
            
        };

        ItemsGroup.prototype = Object.create(Phaser.Sprite.prototype);
        ItemsGroup.prototype.constructor = ItemsGroup;

        ItemsGroup.prototype.start = function () {
            this.spawnItems(12);

        };

        ItemsGroup.prototype.update = function() {

        };

        ItemsGroup.prototype.spawnItems = function (amount, type) {
            for ( var i = 0; i < amount; i++ ) {
                var item = new Item(this.game, type);
                this.add(item);
            }

        };

       return ItemsGroup;

    }
);