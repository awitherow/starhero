define(
    "Game",
    [
        "phaser",
        "states/Boot",
        "states/Preload",
        "states/StartMenu",
        "states/GamePlay",
        "states/GameOver"
    ],
    function(Phaser, Boot, Preload, StartMenu, GamePlay, GameOver) {

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

            // TODO: update phaser menu system https://github.com/MattMcFarland/phaser-menu-system
            
            this.state.add("boot", Boot);
            this.state.add("preload", Preload);
            this.state.add("startmenu", StartMenu);
            this.state.add("play", GamePlay);
            this.state.add("gameover", GameOver);
        };

        Game.prototype = Object.create(Phaser.Game.prototype);
        Game.prototype.constructor = Game;

        Game.prototype.start = function() {
            this.state.start("boot");
        };

        return Game;

    }
)