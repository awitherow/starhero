define(
    "Game",
    [
        "phaser",
        "Player",
        "Environment",
        "ItemsGroup"
    ],
    function(Phaser, Player, Environment, ItemsGroup) {

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
                    this._background = this.game.add.sprite(0, 0, 'background'); // background

                    this._player = new Player(this.game);
                    this._items = new ItemsGroup(this.game);
                    this._environment = new Environment(this.game);
                    this._environment.setEnvironment();
                    this._items.start();

                    // UI TODO: UI.js? not sure...
                    this.healthPoints = 0;
                    this.score = 0;
                    this.killCount = 0;

                    this.healthPointsText = this.game.add.text(16,16, 'HP: 100', {
                        fontSize: '24px',
                        fill: '#000'
                    });

                    this.scoreText = this.game.add.text(16,42, 'Score: 0', {
                        fontSize: '24px',
                        fill: '#000'
                    });

                    this.killCountText = this.game.add.text(16,68, 'Kills: 0', {
                        fontSize: '24px',
                        fill: '#000'
                    });

                },
                update: function () {
                    // set collisions
                    this.game.physics.arcade.collide(this._player, this._environment);
                    this.game.physics.arcade.collide(this._items, this._environment);

                    // overlap actions
                    this.game.physics.arcade.overlap(this._player, this._items, this._player.collectItem, null, this);

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