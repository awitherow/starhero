import Phaser from 'phaser';
import Baddie from './Baddie';

export default class BaddieGroup extends Phaser.Group {
	constructor(game) {
		super(game);
		game.physics.arcade.enable(this, true);

		game.add.existing(this);
	}
	spawnBaddies(amount, type) {
		for (let i = 0; i < amount; i++) {
			const locX = Math.floor(Math.random() * this.game.world.bounds.width);
			const locY = Math.floor(Math.random() * this.game.world.bounds.width / 2);

			const baddie = new Baddie(this.game, locX, locY, type.type);
			baddie._type = type;
			baddie.move = 'leftPounce';

			const leftPounce = baddie.animations.add('leftPounce', [1, 0]);
			leftPounce.play(10, true);
			this.add(baddie);
		}
	}
}
