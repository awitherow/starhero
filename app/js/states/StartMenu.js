import Phaser from 'phaser';

export class StartMenu extends Phaser.State {
    preload() {
        this.StartMenu = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY - 50,
            'start.mainGraphic',
        );
        this.StartMenu.anchor.setTo(0.5, 0.5);
        this.playButton = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY + 100,
            'play',
            this.play,
            this,
        );
        this.playButton.anchor.setTo(0.5, 0.5);
    }
    play() {
        this.game.state.start('play');
    }
}
