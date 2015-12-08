define(
    "states/GamePlay",
    [
        "phaser",
        "Player",
        "Environment",
        "ItemsGroup"
    ],
    function(Phaser, Player, Environment, ItemsGroup) {

        var GamePlay = function (game) {
            Phaser.State.call(this, game);
        };

        GamePlay.prototype = Object.create(Phaser.State.prototype);
        GamePlay.prototype.constructor = GamePlay;

        GamePlay.prototype.preload = function () {
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
        };

        GamePlay.prototype.create = function () {
            // import physics.
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // sprites
            this._background = this.game.add.sprite(0, 0, 'background'); // background

            this._player = new Player(this.game);
            this._items = new ItemsGroup(this.game);
            this._environment = new Environment(this.game);
            this._environment.setEnvironment();
            this._items.start();

        };

        GamePlay.prototype.update = function () {
            // set collisions
            this.game.physics.arcade.collide(this._player, this._environment);
            this.game.physics.arcade.collide(this._items, this._environment);
        };

        return GamePlay;
    }
);