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

    colton = game.add.sprite(200, 200, 'colton');
    game.physics.arcade.enable(colton, Phaser.Physics.ARCADE);

    floor = game.add.graphics(0, 0);
    floor.beginFill(0xdac292);
    floor.drawRect(colton.width, colton.width, game.width-colton.width*2, game.height-colton.width*2);
    floor.endFill();

    walls = game.add.graphics(0, 0);
    walls.beginFill(0xb9936c);
    walls.drawRect(colton.width, game.world.height - colton.width - 15, game.width-colton.width*2, 15);
    walls.drawRect(colton.width, colton.width, game.world.width - colton.width*2, 15);
    walls.drawRect(game.world.width - colton.width-15, colton.width, 15, game.height-colton.width*2);
    walls.drawRect(colton.width, colton.width, 15, game.height-colton.width*2);
    walls.endFill();


    comp = game.add.sprite(game.world.width/2, colton.width+15, 'comp');
    comp.scale.setTo(.25, .25);
    comp.y -= comp.height;
    game.physics.arcade.enable(comp, Phaser.Physics.ARCADE);
    comp.body.immovable = true;

    colton = game.add.sprite(200, 200, 'colton');
    game.physics.arcade.enable(colton, Phaser.Physics.ARCADE);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    music = game.add.audio('song');
    music.play();

    game.input.addPointer();
    game.input.addPointer();

}

function update() {

    //  Reset the coltons velocity (movement)
    colton.body.velocity.x = 0;
    colton.body.velocity.y = 0;

    if(colton.y < colton.width+16 && colton.x < game.width/2+comp.width+1 && colton.x+colton.width > game.width/2-1){
        music.resume();
    }
    else{
        music.pause();
    }

    if(game.input.pointer1.active && !game.input.pointer2.active){
        if (game.input.pointer1.x < game.width/3 && colton.x > colton.width-15)
        {
            colton.body.velocity.x = -150;
        }
        else if (game.input.pointer1.x > 2*game.width/3 && colton.x+colton.width < game.width-colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.x = 150;
        }
        if (game.input.pointer1.y < game.height/3 && colton.y > colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.y = -150;
        }
        else if (game.input.pointer1.y > 2*game.height/3 && colton.y+colton.height < game.height-colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.y = 150;
        }
    }
    else if(!game.input.pointer1.active && game.input.pointer2.active){
        if (game.input.pointer2.x < game.width/3 && colton.x > colton.width+15)
        {
            colton.body.velocity.x = -150;
        }
        else if (game.input.pointer2.x > 2*game.width/3 && colton.x+colton.width < game.width-colton.width-15)
        {
            //  Move to the left
            colton.body.velocity.x = 150;
        }
        if (game.input.pointer2.y < game.height/3 && colton.y > colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.y = -150;
        }
        else if (game.input.pointer2.y > 2*game.height/3 && colton.y+colton.height < game.height-colton.width-15)
        {
            //  Move to the left
            colton.body.velocity.y = 150;
        }
    }
    else{
        if (cursors.left.isDown && colton.x > colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.x = -150;
        }
        else if (cursors.right.isDown && colton.x+colton.width < game.width-colton.width-15)
        {
            //  Move to the left
            colton.body.velocity.x = 150;
        }
        if (cursors.up.isDown && colton.y > colton.width+15)
        {
            //  Move to the left
            colton.body.velocity.y = -150;
        }
        else if (cursors.down.isDown && colton.y+colton.height < game.height-colton.width-15)
        {
            //  Move to the left
            colton.body.velocity.y = 150;
        }
    }
}