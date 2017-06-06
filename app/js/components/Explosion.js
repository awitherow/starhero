import Phaser from 'phaser';

export class Explosion extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'explosion');
        this.game = game;

        this.anchor.setTo(0.5, 0.5);
        this.animations.add(
            'explode',
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            30,
            true,
        );

        this.game.physics.arcade.enable(this, true);
        this.game.add.existing(this);
        this.explode(x, y);
    }
    explode(x, y) {
        const explosion = this;
        explosion.x = x;
        explosion.y = y;

        this.animations.play('explode', 30, false, true);
        this.game._baddies.children.forEach(baddie => {
            const center = explosion._frame.centerX;
            if (
                baddie.x > explosion.x - center &&
                baddie.x < explosion.x + center &&
                (baddie.y > explosion.y - center &&
                    baddie.y < explosion.y + center)
            ) {
                baddie.kill();
            }
        });
    }
}
