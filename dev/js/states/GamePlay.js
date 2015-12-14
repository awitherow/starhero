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
            
        };

        GamePlay.prototype.create = function () {
            // import physics.
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // sprites
            this._background = this.game.add.sprite(0, 0, 'background'); // background

            this._player = new Player(this.game);
            this._environment = new Environment(this.game);
            this._environment.setEnvironment();
            this._items = new ItemsGroup(this.game);
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

            var itemsMap = [
                {
                    key: 'star',
                    points: 10,
                    healthPoints: 0,
                    spawn: 1,
                    spawnType: ''
                },

                {
                    key: 'pie',
                    points: 0,
                    healthPoints: 50,
                    spawn: 1,
                    spawnType: null
                },

                {
                    key: 'diamond',
                    points: 60,
                    healthPoints: 0,
                    spawn: 1,
                    spawnType: 'baddie'
                }
            ];

            var bla;

            itemsMap.forEach(function(obj) {
                if (obj.key == item.key) {
                    bla = obj;
                }
            });

            this.game.score += bla.points;
            this.game.healthPoints += bla.healthPoints;

            item.destroy(); // use destroy in case of items, otherwise piggy memory oink oink.

            if ( bla.key === "diamond" ) {
                this._baddies.spawnBaddies(this.game.killCount || 1);
            } else {
                this._items.spawnItems(1); // spawn item 
            }

        };

        GamePlay.prototype.damagePlayer = function (player, baddie) {

            this.game.healthPoints -= 2.5;

            if ( this.game.healthPoints <= 0 ) {
                this._player.destroy();
                this.game.state.start("gameover", true, false, this.game.score);
            }

        };

        GamePlay.prototype.killBaddie = function (bullet, baddie) {
            this.game.killCount += 1;

            this._items.spawnItems(1); // spawn item 

            baddie.destroy();
            bullet.kill();
        };

        return GamePlay;
    }
);