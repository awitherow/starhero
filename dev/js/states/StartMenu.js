define(
    "states/StartMenu",
    [
        "phaser"
    ],
    function(Phaser) {

        var StartMenu = function (game) {
            Phaser.State.call(this, game);
        };

        StartMenu.prototype = Object.create(Phaser.State.prototype);
        StartMenu.prototype.constructor = StartMenu;

        StartMenu.prototype.preload = function () {
        	this.StartMenu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'start.mainGraphic');
        	this.StartMenu.anchor.setTo(0.5,0.5);
        	this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "play", this.play, this);
            this.playButton.anchor.setTo(0.5,0.5);
        };

        StartMenu.prototype.play = function () {
        	this.game.state.start("play");
        };

        return StartMenu;
    }
);