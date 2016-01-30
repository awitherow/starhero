import Phaser from 'phaser';

export class Bullets extends Phaser.Group {
	constructor(game, player) {
		super(player);
		this._player = player;

		game.physics.arcade.enable(this, true);

		game.add.existing(this);

		this.start();
	}
	start() {
		this._bulletTime = 0;
		for (let i = 0; i < 20; i++) {
			const b = this.create(11, 11, 'snowball');
			b.animations.add('flyLeft', [0, 1, 2, 3]);
			b.animations.add('flyRight', [0, 1, 2, 3]);
			b.animations.add('flyUp', [0, 1, 2, 3]);
			b.name = 'snowball' + i;
			b.exists = false;
			b.visible = false;
			this.game.physics.arcade.enable(b);
			b.checkWorldBounds = true;
			b.events.onOutOfBounds.add(b.kill, b);
		}
	}
	fire() {
		if (this.game.time.now > this._bulletTime) {
			this._bulletTime = this.game.time.now + 150;

			const b = this.getFirstExists(false);

			if (b) {
				b.reset(this._player.x, this._player.y);
				b.rotation = 0;
				if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // move left, play left
					b.body.velocity.x = -300;
					b.animations.play('flyLeft', 15, true);
				} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // move right, play right
					b.body.velocity.x = +300;
					b.animations.play('flyRight', 15, true);
				} else { // shoot up
					b.body.velocity.y = -300;
					b.rotation = -1.6;
					b.animations.play('flyUp', 15, true);
				}
			}
		}
	}
}
