define(
    "states/GameTitle",
    [
        "phaser"
    ],
    function(Phaser) {

        var GameTitle = function (game) {
            Phaser.State.call(this, game);
        };

        GameTitle.prototype = Object.create(Phaser.State.prototype);
        GameTitle.prototype.constructor = GameTitle;

        GameTitle.prototype.preload = function () {
        	this.gameTitle = this.game.add.sprite(800,600, 'gametitle');
        	this.gameTitle.anchor.setTo(0.5,0.5);
        	this.playButton = this.game.add.button(350,150, "play", this.play, this);
        };

        GameTitle.prototype.play = function () {
        	this.game.state.start("play");
        };

        return GameTitle;
    }
);