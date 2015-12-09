define(
    "Game",
    [
        "phaser",
        "states/GamePlay"
    ],
    function(Phaser, GamePlay) {

        var Game = function() {
            Phaser.Game.call(this,
                800,
                600,
                Phaser.AUTO, //renderer
                "", //parent(htmlelement)
                null, //state
                false, //transparent
                true, //antialias
                Phaser.Physics.ARCADE //physics
            );
            this.state.add("play", GamePlay);
        };

        Game.prototype = Object.create(Phaser.Game.prototype);
        Game.prototype.constructor = Game;

        Game.prototype.start = function() {
            this.state.start("play");
        };

        return Game;

    }
)