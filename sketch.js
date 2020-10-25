var tower,towerImage;
var door, doorImage,doorsGroup;
var climber, climberImage,climbersGroup;
var ghost,ghostImage;
var gameSound;
var gameState = 1;
var invisibleBlock,invisibleBlockGroup;

function preload(){
 // loading some images
 towerImage = loadImage("tower.png");
 doorImage = loadImage("door.png");
 climberImage = loadImage("climber.png");
 ghostImage = loadImage("ghost-standing.png");
 
  // loading some sound
 gameSound = loadSound("spooky.wav");
  
}

function setup(){
 createCanvas(600,600);
 
  // adding sound to game
 gameSound.loop();
  
 // creating tower
 tower = createSprite(300,300,100,100);
 tower.addImage("background",towerImage);
 tower.scale = 1;
 tower.velocityY = 2;
 
   // creating ghost
 ghost = createSprite(200,200,50,50);
 ghost.scale = 0.2
 ghost.addImage("ghost",ghostImage);
  
 // creating some groups
 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlockGroup = new Group();
}

function draw(){
 background("white");
 
 
 if(gameState == 1){
   // making ghost controled by arrow keys and space
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
      }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
      }
    if(keyDown("space")){
      ghost.velocityY = ghost.velocityY - 2.5;
      }
     ghost.velocityY = ghost.velocityY + 0.8;
   
    // creating endless background
   if(tower.y > 400){
    tower.y = 300
   }
   
    spawnDoors();
   
    // making climber touch with ghost so ghost could stop
    if(climbersGroup.isTouching(ghost)){
       ghost.velocityY = 0;
       }
   //making ghost stop
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = 0;
   }
 }
  
 drawSprites();
  
 if(gameState == 0){
   fill("red");
   textSize(40);
   stroke("red");
   text("Game Over",250,300);
 }
}

function spawnDoors(){
  if(frameCount % 200 === 0){
   door = createSprite(200,-50);
   door.addImage("door",doorImage);
   door.x = Math.round(random(100,400));
   door.velocityY = 1;
   door.lifetime = 575;
   ghost.depth = door.depth;
   ghost.depth += 1;
    
   doorsGroup.add(door);
   

   climber = createSprite(200,10);
   climber.addImage("climber",climberImage);
   climber.x = Math.round(random(100,400));
   climber.velocityY = 1;
   climber.lifetime = 575;
   climber.x = door.x
   
   climbersGroup.add(climber);
    
   invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.velocityY = 1;
   invisibleBlock.height = 2.5;
   invisibleBlock.lifetime = 575;
   invisibleBlock.x = door.x;
   invisibleBlock.visible = false;
   
   invisibleBlockGroup.add(invisibleBlock);
  }
}

