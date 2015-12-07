define(
    "Game",
    [
        "phaser"
    ],
    function(Phaser) {

        var PlayState = function() {
            return {
                preload: function () {
                    // terrain
                    this.game.load.image('background', 'assets/background.png');
                    this.game.load.image('ground', 'assets/platform.png');
                    this.game.load.image('ledge', 'assets/ledge.png');
                    // powerups
                    this.game.load.image('star', 'assets/star.png');
                    this.game.load.image('diamond', 'assets/diamond.png');
                    this.game.load.image('firstaid', 'assets/firstaid.png');
                    // characters
                    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
                    this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
                    this.game.load.spritesheet('bullet', 'assets/bullet.png', 14, 8);
                },
                create: function () {
                    // import physics.
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);

                    // sprites
                    this._background = game.add.sprite(0, 0, 'background'); // background

                    this._player = new Player(this.game);
                    this._items = new ItemsGroup(this.game);
                    this._items.start();

                },
                update: function () {
                }
            };
        };

        var Game = function() {
            Phaser.Game.call(this,
                800,
                600,
                Phaser.AUTO, //renderer
                "", //parent(htmlelement)
                null, //state
                false, //transparent
                false, //antialias
                Phaser.Physics.ARCADE //physics
            );
            this.state.add("play", PlayState);
        };

        Game.prototype = Object.create(Phaser.Game.prototype);
        Game.prototype.constructor = Game;

        Game.prototype.start = function() {
            this.state.start("play");
        };

        return Game;

    }
)