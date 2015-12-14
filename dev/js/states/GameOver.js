define(
    "states/GameOver",
    [
        "phaser"
    ],
    function(Phaser) {

        var Boot = function (game) {
            Phaser.State.call(this, game);
        };

        Boot.prototype = Object.create(Phaser.State.prototype);
        Boot.prototype.constructor = Boot;

        Boot.prototype.init = function () {
        	alert("You suck, but your score was still: " + this.game.score);
        };

        Boot.prototype.create = function () {
        	this.gameOver = this.game.add.sprite(800,600,"gametitle");
        	this.gameOver.anchor.setTo(0.5,0.5);
        	this.playButton = this.game.add.button(350,150,"play",this.play, this);
        	this.playButton.anchor.setTo(0.5,0.5);
        };

        Boot.prototype.play = function () {
        	this.game.state.start("play");
        };

        return Boot;
    }
);