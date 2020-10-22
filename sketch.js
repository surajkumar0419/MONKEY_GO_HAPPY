var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score,survivalTime=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime=0
}

function draw() {
  
 background("white");
  
  if(gameState===PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y >= 170) {
      monkey.velocityY = -12;
      }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  survivalTime = Math.ceil(frameCount/frameRate());
    
  spawnBanana();
  spawnObstacle();
  }
  
  if(gameState===END){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("black");
    textSize(20);
    text("GAME OVER!",250,150);
    text("press 'r' to start again",225,200);
    
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survivalTime=0;
    
    if(keyDown("r")){
      gameState=PLAY;
    }
  }
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime:"+survivalTime,100,50);
  
  drawSprites();

}

function spawnBanana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(600,315);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -6;
    banana.lifetime = 100;
    
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    bananaGroup.add(banana);
    }       
  }

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,315);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 105;
    obstacleGroup.add(obstacle);
    }       
  }