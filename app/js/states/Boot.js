import Phaser from 'phaser';

export default class Boot from Phaser.State {
	preload() {
		this.game.load.image('loading', 'assets/states/loading.png');
		this.loadingBar = this.add.sprite(this.game.world.centerX, 400, 'loading');
		this.loadingBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.loadingBar);

		// config
		this.game.load.json('levels', 'conf/levels.json');

		// start menu
		this.game.load.image('start.mainGraphic', 'assets/states/gametitle.png');
		this.game.load.image('play', 'assets/states/play.png');

		// terrain
		this.game.load.image('background', 'assets/env/background.png');
		this.game.load.image('ground', 'assets/env/platform.png');
		this.game.load.image('ledge', 'assets/env/ledge-festive.png');
		this.game.load.image('ledge-wide', 'assets/env/ledge-wide-festive.png');
		this.game.load.image('ground-festive', 'assets/env/ground-wide-festive.png');

		// powerups
		this.game.load.image('star', 'assets/items/star.png');
		this.game.load.image('diamond', 'assets/items/diamond.png');
		this.game.load.image('firstaid', 'assets/items/firstaid.png');
		this.game.load.image('pie', 'assets/items/pie.png');

		// characters
		this.game.load.spritesheet('dude', 'assets/char/player/dude.png', 32, 48);
		this.game.load.spritesheet('guy-festive', 'assets/char/player/guy-festive.png', 44, 44);
		this.game.load.spritesheet('baddie', 'assets/char/baddies/baddie.png', 32, 32);

		// weapons
		this.game.load.spritesheet('bullet', 'assets/weapons/bullet.png', 14, 8);
		this.game.load.spritesheet('snowball', 'assets/weapons/snowball.png', 11, 11);
		this.game.load.spritesheet('bomb', 'assets/weapons/hankies_rotate.png', 24, 24);
		this.game.load.spritesheet('explosion', 'assets/weapons/explode.png', 128, 128);
	}
	create() {
		this.game.state.start('StartMenu');
	}
}
