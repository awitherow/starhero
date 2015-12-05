var game = new Phaser.Game( 800, 600, Phaser.AUTO, '', 
    {
        preload: preload, 
        create: create, 
        update: update 
    });

var player,
    baddies,
    stars,
    diamonds,   
    healthKits,
    platforms, // create platforms var for use in create()
    cursors,
    score = 0,
    scoreText,
    healthPoints = 100,
    healthPointsText;

function preload() {

    // terrain
    game.load.image('background', 'assets/background.png');
    game.load.image('ground', 'assets/platform.png');
    // powerups
    game.load.image('star', 'assets/star.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('firstaid', 'assets/firstaid.png');
    // characters
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

}

function create() {

    // import physics.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // sprites
    game.add.sprite(0, 0, 'background'); // background

    // platforms, parent of ground & ledges.
    platforms = game.add.group(); // groups ledges & ground.
    platforms.enableBody = true; // enables physics for group bodies.

    // ground
    var ground = platforms.create(0, game.world.height - 64, 'ground'); // add ground.
    ground.scale.setTo(2,2); // scales to fit, original file is 400x32 pixels.
    ground.body.immovable = true; // doesn't fall away when touched as default.

    // ledges
    var ledge = platforms.create(400, 400, 'ground'); // 'ground' loads the asset.
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 275, 'ground');
    ledge.body.immovable = true;

    // player one ready!
    player = game.add.sprite(32, game.world.height -150, 'dude');

    // player physics & properties
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true; // if off screen, collide against boundaries

    // player animations
    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);

    // stars creation
    stars = game.add.group();
    stars.enableBody = true;

    // diamond
    diamonds = game.add.group();
    diamonds.enableBody = true;

    // healthKits
    healthKits = game.add.group();
    healthKits.enableBody = true;

    // baddie
    baddies = game.add.group();
    baddies.enableBody = true;

    deployEntities(12);

    // cursors
    cursors = game.input.keyboard.createCursorKeys();

    // create HP
    healthPointsText = game.add.text(16,16, 'HP: 100', {
        fontSize: '32px',
        fill: '#FFF'
    });

    // create ScoreText
    scoreText = game.add.text(16,46, 'Score: 0', {
        fontSize: '32px',
        fill: '#FFF'
    });
}

function update() {

    // set collisions against platform(s)
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(diamonds, platforms);
    game.physics.arcade.collide(healthKits, platforms);
    game.physics.arcade.collide(baddies, platforms);

    // check for overlap with player
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
    game.physics.arcade.overlap(player, healthKits, collectHealthPoints, null, this);
    game.physics.arcade.overlap(player, baddies, damagePlayer, null, this);

    // manage player movement
    player.body.velocity.x = 0; //reset velocity

    // left, right, standing still directional movement,
    // x-axis.

    if (cursors.left.isDown) { // move left, play left
        player.body.velocity.x = -150;
        player.animations.play('left');

    } else if (cursors.right.isDown) { // move right, play right
        player.body.velocity.x = 150;
        player.animations.play('right');

    } else { // stand still
        player.animations.stop();
        player.frame = 4;
    }

    baddies.forEach(moveEntity, this, true);

    // vertical movement,
    // y-axis.

    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350;
    }

}

function deployEntities(amount, type) {

    var diamondX = Math.floor(Math.random() * (12 - 0) + 0);
    var healthCareX = Math.floor(Math.random() * (12 - 0) + 0);

    while ( diamondX === healthCareX ) {
        healthCareX = Math.floor(Math.random() * (12 - 0) + 0);
    }

    for (var i = 0; i < amount; i++) {

        var locX = Math.floor(Math.random() * (770 - 0) + 0);
        var locY = Math.floor(Math.random() * (568 - 300) + 0);

        if ( i === diamondX ) { // TODO: deploy diamond
            var diamond = diamonds.create(locX, locY, 'diamond');
            diamond.body.gravity.y = 9;
            diamond.body.bounce.y = 0.7 + Math.random() * 0.2;

        } else if ( i === healthCareX ) { // TODO: deploy health care
            var firstAid = healthKits.create(locX, locY, 'firstaid');
            firstAid.body.gravity.y = 9;
            firstAid.body.bounce.y = 0.7 + Math.random() * 0.2;

        } else if ( type === "baddie" ) {
            var baddie = baddies.create(locX, locY, 'baddie');
            baddie.body.gravity.y = 200;
            baddie.movementDirection = "L";
            // baddie animation
            var anim = baddie.animations.add('pounce', [1,0]);
            anim.play(10, true);
        } else {
            var star = stars.create(locX, locY, 'star');
            star.body.gravity.y = 9;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;

        }
    }

}

function moveEntity(entity) {
    if (entity.movementDirection == "L") {
        entity.x -= 2;
        if (entity.x <= 0) {
            entity.x = 0;
            entity.movementDirection = "R";
        }
    } else {
        entity.x += 2;
        if (entity.x >= 768) {
            entity.x = 768;
            entity.movementDirection = "L";
        }
    }
}


function collectStar(player, star) {
    // removes star from screen
    star.kill();

    // add & update score
    score+= 10;
    scoreText.text = 'Score: ' + score;

    deployEntities(1);

}

function collectHealthPoints(player, firstAid) {
    // removes star from screen
    firstAid.kill();

    // add & update score
    healthPoints += 50;
    healthPointsText.text = 'HP: ' + healthPoints;

    deployEntities(1);
}

function collectDiamond(player, diamond) {
    // removes star from screen
    diamond.kill();

    // add & update score
    score+= 50;
    scoreText.text = 'Score: ' + score;

    deployEntities(1, "baddie");
}

function damagePlayer() {

    healthPoints -= 2.5;
    healthPointsText.text = "HP: " + healthPoints;

    if ( healthPoints <= 0 ) {
        killPlayer();
    }

}

function killPlayer() {
    player.kill();
    // TODO: enable restart
}

function restartGame() {
    
} 