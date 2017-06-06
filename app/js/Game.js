import Phaser from 'phaser';
import Boot from './states/Boot';
import StartMenu from './States/StartMenu';
import GamePlay from './States/GamePlay';
import GameOver from './States/Gameover';

export class Game extends Phaser.Game {
    constructor() {
        super(
            800,
            600,
            Phaser.AUTO,
            '',
            null,
            false,
            true,
            Phaser.Physics.ARCADE,
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
