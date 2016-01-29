import Phaser from 'phaser';

export default class GameOver extends Phaser.State {
	init() {
		console.log('You suck, but your score was still: ' + this.game.score);
	}
	create() {
		// header graphic
		this.gameTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'start.mainGraphic');
		this.gameTitle.anchor.setTo(0.5, 0.5);

		// play button
		this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, 'play', this.play, this);
		this.playButton.anchor.setTo(0.5, 0.5);

		// play button
		this.mainMenuButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, 'play', this.navToMainMenu, this);
		this.playButton.anchor.setTo(0.5, 0.5);
	}
	play(){
		this.game.state.start('play');
	}
	navToMainMenu() {
		this.game.state.start('play');
	}
}
