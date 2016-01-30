import Phaser from 'phaser';
import Terrain from './Terrain';

export default class Environment extends Phaser.Group {
	constructor(game) {
		super(game);
		game.physics.arcade.enable(this, true);

		game.add.existing(this);
	}
	setEnvironment(envMap) {
		envMap.forEach(obj => {
			const terrain = new Terrain(this.game, obj.x, obj.y, obj.type);
			terrain.body.immovable = true;
			terrain.enableBody = true;
			this.add(terrain);
		});
	}
}
