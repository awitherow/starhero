import Phaser from 'phaser';
import Player from '../player/Player';
import Environment from './../env/Environment';
import ItemsGroup from './../items/ItemsGroup';
import BaddieGroup from './../baddies/BaddieGroup';

export class GamePlay extends Phaser.State {
    create() {
        // config
        this._currentLevel = 0;
        this._currentWave = 0;
        this._levelsConfig = this.game.cache.getJSON('levels');
        this._trigger = this._levelsConfig.levels[
            this._currentLevel
        ].waveTrigger;

        // import physics.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // sprites
        this._background = this.game.add.sprite(0, 0, 'background'); // background

        this._player = new Player(this.game);
        this._environment = new Environment(this.game);
        this._environment.setEnvironment(
            this._levelsConfig.levels[this._currentLevel].env,
        );
        this._items = new ItemsGroup(
            this.game,
            this._levelsConfig.levels[this._currentLevel].items,
        );
        this._baddies = new BaddieGroup(this.game);
        this.game._baddies = this._baddies;

        // UI TODO: UI.js? not sure...
        this.game.healthPoints = 100;
        this.game.score = 0;
        this.game.killCount = 0;

        this.healthPointsText = this.game.add.text(16, 16, 'HP: 100', {
            fontSize: '24px',
            fill: '#FFF',
        });

        this.scoreText = this.game.add.text(16, 42, 'Score: 0', {
            fontSize: '24px',
            fill: '#FFF',
        });

        this.killCountText = this.game.add.text(16, 68, 'Kills: 0', {
            fontSize: '24px',
            fill: '#FFF',
        });
    }
    update() {
        // set collisions
        this.game.physics.arcade.collide(this._player, this._environment);
        this.game.physics.arcade.collide(this._items, this._environment);
        this.game.physics.arcade.collide(this._baddies, this._environment);
        this.game.physics.arcade.collide(
            this._player._bombs,
            this._environment,
        );

        // overlap actions
        this.game.physics.arcade.overlap(
            this._player,
            this._items,
            this.collectItem,
            null,
            this,
        );
        this.game.physics.arcade.overlap(
            this._baddies,
            this._player,
            this.damagePlayer,
            null,
            this,
        );
        this.game.physics.arcade.overlap(
            this._player._bullets,
            this._baddies,
            this.killBaddie,
            null,
            this,
        );
        this.game.physics.arcade.overlap(
            this._player._bombs,
            this._baddies,
            this._player._bombs.createExplosion,
            null,
            this,
        );

        // updates scores, health points & kills
        this.scoreText.text = 'Score: ' + this.game.score;
        this.healthPointsText.text = 'HP: ' + this.game.healthPoints;
        this.killCountText.text = 'Kills: ' + this.game.killCount;
    }
    collectItem(player, item) {
        const itemType = item._itemType;

        this.game.score += itemType.score || 0;
        this.game.healthPoints += itemType.health || 0;

        if (itemType.type === this._trigger.type && !this._waveTriggered) {
            this.startWave();
            this._waveTriggered = true;
        }

        item.destroy();
    }
    startWave() {
        const waves = this._levelsConfig.levels[this._currentLevel].wave;
        const wave = waves[this._currentWave];

        if (!wave) {
            return;
        }
        wave.baddies.forEach(baddieConf => {
            console.log(baddieConf);
            this._baddies.spawnBaddies(baddieConf.amount, baddieConf);
        });
        this._currentWave++;
    }
    damagePlayer(player, baddie) {
        const baddieType = baddie._baddieType;

        // set the timer, so that the player not always
        if (!baddie._damageTimer) {
            baddie._damageTimer = 0;
        }

        if (baddie._damageTimer + 200 > this.game.time.now) {
            return;
        }

        this.game.healthPoints -= baddieType.attack;

        if (this.game.healthPoints <= 0) {
            this._player.destroy();
            this.game.state.start('gameover', true, false, this.game.score);
        }
        baddie._damageTimer = this.game.time.now;
    }
    killBaddie(bullet, baddie) {
        this.game.killCount += 1;
        baddie.destroy();
        bullet.kill();
    }
}
