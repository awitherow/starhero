// Require.js configuration
require.config({
    "baseUrl": "js",
    "paths": {
        phaser: "libs/phaser-official/build/phaser",
        underscore: "libs/underscore/underscore"
    },
    "shim": {
        "phaser": {
            exports: "Phaser"
        }
    }
});

// Main entry point
require(
    [
        "Game"
    ],
    function (Game) {
        var game = new Game();
        game.start();
    }

);
