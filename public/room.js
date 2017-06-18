/**
 * Created by abdalah on 6/4/17.
 */

var game = new Phaser.Game(900, 600, Phaser.AUTO, '', {preload:preload, create: create, update:update});

var colton;
var comp;
var music;
var walls;
var floor;

function preload() {
    game.load.image('colton', 'sprites/mushroom2.png');
    game.load.image('wall', 'sprites/platform.png');
    game.load.image('comp', 'sprites/atari1200xl.png');
    game.load.audio('song', 'music/weather.mp3');
}

function create() {

    game.stage.backgroundColor = '#5572a5';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    floor = game.add.graphics(0, 0);
    floor.beginFill(0x55a558);
    floor.drawRect(50, 50, 815, 515);
    floor.endFill();

    walls = game.add.graphics(0, 0);
    walls.beginFill(0xa58855);
    walls.drawRect(50, game.world.height - 50, 815, 15);
    walls.drawRect(50, 50, 815, 15);
    walls.drawRect(game.world.width - 50, 50, 15, 500);
    walls.drawRect(50, 50, 15, 500);
    walls.endFill();


    comp = game.add.sprite(game.world.width/2, 65, 'comp');
    comp.scale.setTo(.25, .25);
    comp.y -= comp.height;
    game.physics.arcade.enable(comp, Phaser.Physics.ARCADE);
    comp.body.immovable = true;

    colton = game.add.sprite(200, 200, 'colton');
    game.physics.arcade.enable(colton, Phaser.Physics.ARCADE);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    music = game.add.audio('song');

    game.input.addPointer();

}

function update() {

    //  Reset the coltons velocity (movement)
    colton.body.velocity.x = 0;
    colton.body.velocity.y = 0;

    if(colton.y < 67 && colton.x < game.width/2+comp.width+1 && colton.x+colton.width > game.width/2-1){
        music.resume();
    }
    else{
        music.pause();
    }

    if ((cursors.left.isDown || game.input.pointer1.x < game.width/3 & game.input.pointer1.active) && colton.x > 65)
    {
        //  Move to the left
        colton.body.velocity.x = -150;
        //music.pause();
    }
    else if ((cursors.right.isDown || game.input.pointer1.x > 2*game.width/3 & game.input.pointer1.active) && colton.x+colton.width < game.width-50)
    {
        //  Move to the left
        colton.body.velocity.x = 150;
        //music.pause();
    }
    if ((cursors.up.isDown || game.input.pointer1.y < game.height/3 & game.input.pointer1.active) && colton.y > 65)
    {
        //  Move to the left
        colton.body.velocity.y = -150;
        //music.pause();
    }
    else if ((cursors.down.isDown || game.input.pointer1.y > 2*game.height/3 & game.input.pointer1.active) && colton.y+colton.height < game.height-50)
    {
        //  Move to the left
        colton.body.velocity.y = 150;
        //music.pause();
    }

}