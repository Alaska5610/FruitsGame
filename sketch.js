var knife , sword;

var fruit1 , fruit2 , fruit3 , fruit4;
var monster1 , monster2;

var fruit;

var game0ver;

var PLAY = 0;
var END = 1;
var gameState = 0;

var score;

var knifeSwooshSound;
var game0verSound;

function preload(){
sword = loadImage("sword.png");

fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
  
monster1 = loadImage("alien1.png");
monster2 = loadImage("alien2.png");
 
game0ver = loadImage("gameover.png");
  
knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
game0verSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400,400);
  
  knife = createSprite(200,200,20,20);
  knife.addImage("sword",sword);
  knife.scale = 0.6;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
}

function draw(){
background("cyan");
fill("black");
textSize(13)
text("Score:"+ score,345,15);

  
if(gameState === PLAY){
  if(fruitGroup.isTouching(knife)){
  fruitGroup.destroyEach();
  knifeSwooshSound.play();
  score = score + 2;
}

  knife.y = World.mouseY;
knife.x = World.mouseX;
  
if(knife.isTouching(enemyGroup)){
    gameState = END;
   }

}
  
else if(gameState === END){
  fruitGroup.velocityX = 0;
  enemyGroup.velocityX = 0;
  
  display();
  game0verSound.play();
  
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
}

  
fruit();
enemy();
  

  
drawSprites();
}


function fruit(){
if (frameCount % 30 === 0 ){
  fruits = createSprite(400,200,20,20);
  fruits.scale = 0.2;
  
  rand = Math.round(random(1,4))
  if (rand === 1){
    fruits.addImage("fruit",fruit1);
  }else if (rand === 2){
    fruits.addImage("fruit",fruit2);
  }else if (rand === 3){
    fruits.addImage("fruit",fruit3);
  }else{
    fruits.addImage("fruit",fruit4);
  }
  
  fruits.y = Math.round(random(50,340));
  
  fruits.velocityX = -6;
  fruits.lifetime = 55;
  
  positions = Math.round(random(1,2));
  if(positions === 1){
    fruits.x = 400;
    fruits.velocityX = -(7+(score/4))
  }
  else{
    if( positions === 2){
      fruits.x = 0;
      fruits.velocityX = (7+(score/4));
    }
  }
  
  fruitGroup.add(fruits);
}
}

function enemy(){

if (frameCount % 90 === 0){
  enimies = createSprite(400,20,20,20);
  enimies.scale = 0.9;
  
  r = Math.round(random(2,9))
  if(r === 2 || r === 4 || r === 6 || r === 8){
    enimies.addImage("monster", monster2);
  }
  else{
    enimies.addImage("monster", monster1);
  }
  
  enimies.y = Math.round(random(50,350));
  
  enimies.velocityX = -(8+(score/100));
  enimies.lifetime = 55;

  
  enemyGroup.add(enimies);
}
  
}

function display(){
gameOver = createSprite(200,200,20,20);
gameOver.addImage("game0ver", game0ver);
}

