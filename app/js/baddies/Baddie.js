import Phaser from 'phaser';

export default class Baddie extends Phaser.Sprite {
	constructor(game, x, y, type) {
		super(game, x, y, type);
		this.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this, true);

		this.enableBody = true;
		this.body.gravity.y = 200;

		this.body.collideWorldBounds = true; // if off screen, collide against boundaries

		game.add.existing(this);
	}
	movements = {
		leftPounce: entity => {
			if (entity.x > (0 + entity._frame.centerX)) {
				entity.x -= 2;
				return entity;
			}

			entity.x = 0;
			entity.move = 'rightPounce';
			// baddie animation
			entity.animations.stop(null, true); // stop all animation
			const rightPounce = entity.animations.add('rightPounce', [2, 3]);
			rightPounce.play(10, true);
		},
		rightPounce: entity => {
			if (entity.x < (768 - entity._frame.centerX)) {
				entity.x += 2;
				return entity;
			}

			entity.x = 768;
			entity.move = 'leftPounce';

			// baddie animation
			entity.animations.stop(null, true); // stop all animations
			const leftPounce = entity.animations.add('leftPounce', [1, 0]);
			leftPounce.play(10, true);
		}
	};
	update() {
		this.handleMovement();
	}
	handleMovement() {
		if (this.move in Baddie.movements) {
			return Baddie.movements[this.move](this);
		}
	}
}
