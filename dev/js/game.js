define(
    "Game",
    [
        "phaser",
        "Player",
        "ItemsGroup"
    ],
    function(Phaser, Player, ItemsGroup) {

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

                    // PlayState Background
                    this._background = this.game.add.sprite(0, 0, 'background'); // background

                    // add new player, items, and start items falling from sky :)
                    this._player = new Player(this.game);

                    // spawn static environment TODO: random generated.
                    this._platforms = this.game.add.group();
                    this._platforms.enableBody = true;
                    // ground
                    var ground = this._platforms.create(0, this.game.world.height - 64, 'ground'); // add ground.
                    ground.scale.setTo(2,2); // scales to fit, original file is 400x32 pixels.
                    ground.body.immovable = true; // doesn't fall away when touched as default.

                    // ledges
                    var ledge = this._platforms.create(300, 400, 'ledge'); // 'ground' loads the asset.
                    ledge.body.immovable = true;
                    ledge = this._platforms.create(0, 325, 'ledge');
                    ledge.body.immovable = true;
                    ledge = this._platforms.create(715, 315, 'ledge');
                    ledge.body.immovable = true;
                    ledge = this._platforms.create(500, 250, 'ledge');
                    ledge.body.immovable = true;

                    this._items = new ItemsGroup(this.game);
                    this._items.start();

                },
                update: function () {
                    // set collisions against terrain
                    this.game.physics.arcade.collide(this._player, this._platforms);
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