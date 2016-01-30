import Phaser from 'phaser';
import Explosion from './Explosion';

export class Bombs extends Phaser.Group {
	constructor(game, player) {
		super(game);

		this._player = player;
		this.game = game;
		game.physics.arcade.enable(this, true);
		game.add.existing(this);

		this.start();
	}
	start() {
		this._bombTime = 0;
		for (let i = 0; i < 100; i++) {
			const h = this.create(14, 8, 'bomb');
			h.name = 'bomb' + i;
			h.exists = false;
			h.visible = false;
			this.game.physics.arcade.enable(h);
			h.checkWorldBounds = true;
			h.events.onOutOfBounds.add(h.kill, h);
			h.anchor.setTo(0.5, 0.5);
		}
	}
	fire() {
		if (this.game.time.now > this._bombTime) {
			const bomb = this.getFirstExists(false);

			if (bomb) {
				bomb.reset(this._player.x, this._player.y);
				bomb.body.velocity.y = +300;
				this._bombTime = this.game.time.now + 150;
			}
		}
	}
	createExplosion(bomb) {
		this.game.killCount += 1;
		bomb.kill();
		this._explosion = new Explosion(this.game, bomb.x, bomb.y - 30);
	}
}
