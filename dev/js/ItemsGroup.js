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

            game.physics.arcade.enable(this, true);

            game.add.existing(this);

        };

        ItemsGroup.prototype = Object.create(Phaser.Group.prototype);
        ItemsGroup.prototype.constructor = ItemsGroup;

        ItemsGroup.prototype.start = function () {
            this.spawnItems(12);
        };

        ItemsGroup.prototype.update = function() {

        };

        ItemsGroup.prototype.spawnItems = function (amount, type) {

            for ( var i = 0; i < amount; i++ ) {
                var locX = Math.floor(Math.random() * this.game.world.bounds.width);
                var locY = Math.floor(Math.random() * this.game.world.bounds.width / 2);

                var item = new Item(this.game, locX, locY, type);
                this.add(item);
            }

        };

        return ItemsGroup;

    }
);