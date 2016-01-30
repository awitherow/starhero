import Phaser from 'phaser';

export default class Item extends Phaser.Sprite {
	constructor(game, x, y, itemType) {
		super(game, x, y, itemType.type);

		this._itemType = itemType;

		game.physics.arcade.enable(this, true);

		this.body.velocity.y = 20;
		this.body.gravity.y = (0.7 + Math.random()) * 20;
		this.body.bounce.y = 0.7 + Math.random() * 0.2;

		this.body.collideWorldBounds = true;

		game.add.existing(this);
	}
	update() {}
}
