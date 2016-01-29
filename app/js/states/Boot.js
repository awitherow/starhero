define(
    "states/Boot",
    [
        "phaser"
    ],
    function(Phaser) {

        var Boot = function (game) {
            Phaser.State.call(this, game);
        };

        Boot.prototype = Object.create(Phaser.State.prototype);
        Boot.prototype.constructor = Boot;

        Boot.prototype.preload = function () {
        	this.game.load.image('loading', 'assets/states/loading.png');
        };

        Boot.prototype.create = function () {
        	this.game.state.start("preload");
        };

        return Boot;
    }
);