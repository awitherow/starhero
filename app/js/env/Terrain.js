import Phaser from 'phaser';

export class Terrain extends Phaser.Sprite {
	constructor(game, x, y, type) {
		super(game, x, y, type);

		game.physics.arcade.enable(this, true);

		game.add.existing(this);
	}
}
