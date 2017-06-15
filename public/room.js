/**
 * Created by abdalah on 6/4/17.
 */

var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', {preload:preload, create: create, update:update});

var colton;
var platforms;
var comp;
var music;

function preload() {
    game.load.image('colton', 'sprites/mushroom2.png');
    game.load.image('wall', 'sprites/platform.png');
    game.load.image('comp', 'sprites/atari1200xl.png');
    game.load.audio('song', 'music/weather.mp3');
}

function create() {

    game.stage.backgroundColor = '#000000';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    game.physics.enable(platforms, Phaser.Physics.ARCADE);
    platforms.enableBody = true;


    var wall1 = platforms.create(100, game.world.height - 100, 'wall');
    wall1.scale.setTo(2, .5);
    wall1.body.immovable = true;

    var wall2 = platforms.create(100, 100, 'wall');
    wall2.scale.setTo(2, .5);
    wall2.body.immovable = true;

    var wall3 = platforms.create(100, 100, 'wall');
    wall3.scale.setTo(.04, 13);
    wall3.body.immovable = true;

    var wall4 = platforms.create(game.world.width - 100, 100, 'wall');
    wall4.scale.setTo(.04, 13);
    wall4.body.immovable = true;

    colton = game.add.sprite(200, 200, 'colton');
    game.physics.arcade.enable(colton, Phaser.Physics.ARCADE);
    colton.body.collideWorldBounds = true;

    comp = game.add.sprite(game.world.width/2, 80, 'comp');
    comp.scale.setTo(.25, .25)
    game.physics.arcade.enable(comp, Phaser.Physics.ARCADE);
    comp.body.immovable = true

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    music = game.add.audio('song');

    colton.body.onCollide = new Phaser.Signal();
    colton.body.onCollide.add(hitSprite, this);

}

function hitSprite(){
    if(music.paused === true){
        music.resume();
    }
    else{
        music.play();
    }
}

function update() {

    game.physics.arcade.collide(colton, platforms);
    game.physics.arcade.collide(colton, comp);
    game.physics.arcade.collide(colton, comp, music.play);

    //  Reset the coltons velocity (movement)
    colton.body.velocity.x = 0;
    colton.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        colton.body.velocity.x = -150;
        music.pause();
    }
    if (cursors.right.isDown)
    {
        //  Move to the left
        colton.body.velocity.x = 150;
        music.pause();
    }
    if (cursors.up.isDown)
    {
        //  Move to the left
        colton.body.velocity.y = -150;
        music.pause();
    }
    if (cursors.down.isDown)
    {
        //  Move to the left
        colton.body.velocity.y = 150;
        music.pause();
    }

}

function playSong(colton, comp) {
    music.play();
}