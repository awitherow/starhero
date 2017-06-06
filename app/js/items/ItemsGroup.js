import Phaser from 'phaser';
import Item from './Item';

export class ItemsGroup extends Phaser.Group {
    constructor(game, itemsConfig) {
        super(game);
        game.physics.arcade.enable(this, true);
        game.add.existing(this);

        this._itemsConfig = itemsConfig;
        // build ranges for random numbers
        let startNum = 0;
        this._itemsConfig.forEach((type, idx) => {
            let lowerBound = startNum;
            if (lowerBound > 0) {
                lowerBound += 1 / 1000;
            }
            let upperBound = startNum + type.chance;
            if (upperBound > 1) {
                upperBound = 1;
            }
            type.randomRange = [lowerBound, upperBound];
            startNum = upperBound;
            // the last must always have the upperBound == 1
            if (idx === itemsConfig.length - 1) {
                type.randomRange[1] = 1;
            }
        });
    }
    update() {
        if (this.children.length < 12) {
            this.spawnItem();
        }
    }
    spawnItem() {
        const locX = Math.floor(Math.random() * this.game.world.bounds.width);
        const locY = Math.floor(
            Math.random() * this.game.world.bounds.height / 3,
        );
        const randomNum = Math.random();
        let itemType;

        this._itemsConfig.forEach(type => {
            if (
                type.randomRange[0] <= randomNum &&
                randomNum <= type.randomRange[1]
            ) {
                itemType = type;
            }
        });

        const item = new Item(this.game, locX, locY, itemType);
        this.add(item);
    }
}
