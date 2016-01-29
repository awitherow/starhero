define(
    "states/GameOver",
    [
        "phaser"
    ],
    function(Phaser) {

        var GameOver = function (game) {
            Phaser.State.call(this, game);
        };

        GameOver.prototype = Object.create(Phaser.State.prototype);
        GameOver.prototype.constructor = GameOver;

        GameOver.prototype.init = function () {
        	console.log("You suck, but your score was still: " + this.game.score);
        };

        GameOver.prototype.create = function () {
            // header graphic
            this.gameTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'start.mainGraphic');
            this.gameTitle.anchor.setTo(0.5,0.5);

            // play button
            this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "play", this.play, this);
            this.playButton.anchor.setTo(0.5,0.5);

            // play button
            this.mainMenuButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "play", this.navToMainMenu, this);
            this.playButton.anchor.setTo(0.5,0.5);
        };

        GameOver.prototype.play = function () {
            this.game.state.start("play");
        };

        GameOver.prototype.navToMainMenu = function () {
            this.game.state.start("startmenu");
        };

        return GameOver;
    }
);