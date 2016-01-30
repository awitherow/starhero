import Phaser from 'phaser';
import Boot from './states/Boot';
import StartMenu from './States/StartMenu';
import GamePlay from './States/GamePlay';
import GameOver from './States/Gameover';

export default class Game extends Phaser.Game {
	constructor() {
		super(
			800,
			600,
			Phaser.AUTO, // renderer
			'', // parent html element
			null, // state
			false, // transparent
			true, // antialias
			Phaser.Physics.ARCADE // physics
		);

		this.state.add('boot', Boot);
		this.state.add('startmenu', StartMenu);
		this.state.add('play', GamePlay);
		this.state.add('gameover', GameOver);
	}

	boot() {
		this.state.start('boot');
	}
}
