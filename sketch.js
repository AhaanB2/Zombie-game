var canvas, backgroundImage;

var players
var gameState = 0;
var playerCount;
var allPlayers;
//var distance = 0;
var database;
var Zombiegroup,Gungroup 
var form, player, game;
var bullet
var baselife = 50
var players1, players2, players3, players4
var ivnvisprite
//var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  //track = loadImage("../images/track.jpg");
  //car1_img = loadImage("../images/car1.png");
  //car2_img = loadImage("../images/car2.png");
  //car3_img = loadImage("../images/car3.png");
  //car4_img = loadImage("../images/car4.png");
  ground = loadImage("images/ground.png");
  playerimg = loadImage("images/player.png")
  zombieimg = loadImage("images/Zombie.png")
  bulletimg = loadImage("images/Bullet.png")
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
Zombiegroup = createGroup()
Gungroup = createGroup()

}


function draw(){
  
  
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  
  }
  /*if(gameState === 2){
    game.end();
  }
*/
}
