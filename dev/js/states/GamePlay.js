define(
    "states/GamePlay",
    [
        "phaser",
        "Player",
        "Environment",
        "ItemsGroup",
        "BaddieGroup"
    ],
    function(Phaser, Player, Environment, ItemsGroup, BaddieGroup) {

        var GamePlay = function (game) {
            Phaser.State.call(this, game);
        };

        GamePlay.prototype = Object.create(Phaser.State.prototype);
        GamePlay.prototype.constructor = GamePlay;

        GamePlay.prototype.preload = function () {
            // config
            this.game.load.json("levels", "conf/levels.json");

            // terrain
            this.game.load.image('background', 'assets/env/background.png');
            this.game.load.image('ground', 'assets/env/platform.png');
            this.game.load.image('ledge', 'assets/env/ledge-festive.png');
            this.game.load.image('ledge-wide', 'assets/env/ledge-wide-festive.png');
            this.game.load.image('ground-festive', 'assets/env/ground-wide-festive.png');

            // powerups
            this.game.load.image('star', 'assets/items/star.png');
            this.game.load.image('diamond', 'assets/items/diamond.png');
            this.game.load.image('firstaid', 'assets/items/firstaid.png');
            this.game.load.image('pie', 'assets/items/pie.png');

            // characters
            this.game.load.spritesheet('dude', 'assets/char/player/dude.png', 32, 48);
            this.game.load.spritesheet('guy-festive', 'assets/char/player/guy-festive.png', 44, 44);
            this.game.load.spritesheet('baddie', 'assets/char/baddies/baddie.png', 32, 32);

            // weapons
            this.game.load.spritesheet('bullet', 'assets/weapons/bullet.png', 14, 8);
            this.game.load.spritesheet('snowball', 'assets/weapons/snowball.png', 11, 11);
+           this.game.load.spritesheet('bomb', 'assets/weapons/hankies_rotate.png', 24, 24);
+           this.game.load.spritesheet('explosion', 'assets/weapons/explode.png', 128, 128);
        };

        GamePlay.prototype.create = function () {
            // config
            this._currentLevel = 0;
            this._currentWave = 0;
            this._levelsConfig = this.game.cache.getJSON("levels");

            // import physics.
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // sprites
            this._background = this.game.add.sprite(0, 0, 'background'); // background

            this._player = new Player(this.game);
            this._environment = new Environment(this.game);
            this._environment.setEnvironment();
            this._items = new ItemsGroup(this.game, this._levelsConfig.levels[this._currentLevel].items);
            this._baddies = new BaddieGroup(this.game);
            this.game._baddies = this._baddies;

             // UI TODO: UI.js? not sure...
            this.game.healthPoints = 100;
            this.game.score = 0;
            this.game.killCount = 0;

            this.healthPointsText = this.game.add.text(16,16, 'HP: 100', {
                fontSize: '24px',
                fill: '#FFF'
            });

            this.scoreText = this.game.add.text(16,42, 'Score: 0', {
                fontSize: '24px',
                fill: '#FFF'
            });

            this.killCountText = this.game.add.text(16,68, 'Kills: 0', {
                fontSize: '24px',
                fill: '#FFF'
            });

        };

        GamePlay.prototype.update = function () {
            // set collisions
            this.game.physics.arcade.collide(this._player, this._environment);
            this.game.physics.arcade.collide(this._items, this._environment);
            this.game.physics.arcade.collide(this._baddies, this._environment);
            this.game.physics.arcade.collide(this._player._bombs, this._environment);
           
            // overlap actions
            this.game.physics.arcade.overlap(this._player, this._items, this.collectItem, null, this);
            this.game.physics.arcade.overlap(this._baddies, this._player, this.damagePlayer, null, this);
            this.game.physics.arcade.overlap(this._player._bullets, this._baddies, this.killBaddie, null, this);
            this.game.physics.arcade.overlap(this._player._bombs, this._baddies, this._player._bombs.createExplosion, null, this);

            // updates scores, health points & kills
            this.scoreText.text = "Score: " + this.game.score;
            this.healthPointsText.text = "HP: " + this.game.healthPoints;
            this.killCountText.text = "Kills: " + this.game.killCount;

        };

        GamePlay.prototype.collectItem = function (player, item) {

            var itemType = item._itemType;

            this.game.score += itemType.score || 0;
            this.game.healthPoints += itemType.health || 0;

            if (itemType.triggerWave) {
                this.startWave();
            }

            item.destroy(); // use destroy in case of items, otherwise piggy memory oink oink.

        };

        GamePlay.prototype.startWave = function() {
            var that = this;
            var wave = this._levelsConfig.levels[this._currentLevel].waves[this._currentWave];
            if (!wave) {
                return;
            }
            wave.baddies.forEach(function(baddieConf) {
                that._baddies.spawnBaddies(baddieConf.amount, baddieConf);
            });
            this._currentWave++;
        };

        GamePlay.prototype.damagePlayer = function (player, baddie) {
            var baddieType = baddie._baddieType;

            // set the timer, so that the player not always
            if (!baddie._damageTimer) {
                baddie._damageTimer = 0;
            }
            if (baddie._damageTimer + 200 > this.game.time.now) {
                return;
            }

            this.game.healthPoints -= baddieType.attack;

            if ( this.game.healthPoints <= 0 ) {
                this._player.destroy();
            }
            baddie._damageTimer = this.game.time.now;

        };

        GamePlay.prototype.killBaddie = function (bullet, baddie) {
            this.game.killCount += 1;

            baddie.destroy();
            bullet.kill();
        };

        return GamePlay;
    }
);