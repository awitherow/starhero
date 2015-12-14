// The Items Group
define(
    "ItemsGroup",
    [
        "phaser",
        "Item"
    ],
    function(Phaser, Item) {

        var ItemsGroup = function(game, itemsConfig) {
            Phaser.Group.call(this, game);
            game.physics.arcade.enable(this, true);
            game.add.existing(this);

            this._itemsConfig = itemsConfig;
            // build ranges for random numbers
            var startNum = 0;
            this._itemsConfig.forEach(function(type, idx) {
                var lowerBound = startNum;
                if (lowerBound > 0) {
                    lowerBound += 1/1000;
                }
                var upperBound = startNum + type.chance;
                if (upperBound > 1) {
                    upperBound = 1;
                }
                type.randomRange = [ lowerBound, upperBound ];
                startNum = upperBound;
                // the last must always have the upperBound == 1
                if (idx == itemsConfig.length - 1) {
                    type.randomRange[1] = 1;
                }
            });

            this.start();
        };

        ItemsGroup.prototype = Object.create(Phaser.Group.prototype);
        ItemsGroup.prototype.constructor = ItemsGroup;

        ItemsGroup.prototype.start = function () {
            this.spawnItems(12);
        };

        ItemsGroup.prototype.spawnItems = function (amount, type) {

            for ( var i = 0; i < amount; i++ ) {
                var locX = Math.floor(Math.random() * this.game.world.bounds.width);
                var locY = Math.floor(Math.random() * this.game.world.bounds.height / 3);

                var randomNum = Math.random();
                var itemType;
                this._itemsConfig.forEach(function(type) {
                    if (type.randomRange[0] <= randomNum && randomNum <= type.randomRange[1]) {
                        itemType = type;
                    }
                });

                var item = new Item(this.game, locX, locY, itemType.type);
                this.add(item);
            }

        };

        return ItemsGroup;

    }
);