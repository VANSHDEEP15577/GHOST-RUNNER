var ghost,ghostimage,ghostjump;
var tower,towerimage;
var doorGroup,doorImage,door;
var climbersGroup,climberImage,climber;
var invisibleBlockGroup,invisibleBlock;
var gameState="play"



function preload()  {
  ghostimage=loadImage("ghost-standing.png");
  ghostjump=loadAnimation("ghost-standing.png","ghost-jumping.png");
  towerimage=loadImage("tower.png");
  doorimage=loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookysound=loadSound("spooky.wav");
}

function setup()  {
  createCanvas(600,600);
  
  spookysound.loop();
  
  tower=createSprite(300,300,350,600);
  tower.addAnimation("towerimage",towerimage);
  tower.velocityY=1;
  
  ghost=createSprite(200,250,50,50);
  ghost.addAnimation("standing",ghostimage)
  ghost.scale=0.3;
  
  doorGroup=new Group();
   climberGroup=new Group();
   invisibleBlockGroup=new Group();
}

function draw()   {
  background("black ");
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.changeAnimation("moving",ghostjump)
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
   spawnDoors();

    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)   {
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("yellow");
    textSize(35);
    text("Game Over", 230,250)
  }

}

function spawnDoors()   {
  
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
  
    invisibleBlock.debug=true;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  
  }
}




