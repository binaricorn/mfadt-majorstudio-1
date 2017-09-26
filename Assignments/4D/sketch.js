//Moving sprites
var ghost, circle;
var direction = 90; //circle initial direction moving down

function setup() {
  createCanvas(800,600);
  frameRate(30);
  
  //create the sprites
  ghost = createSprite(600, 200, 50, 100);
  ghost.addAnimation('normal', 'assets/asterisk_circle0000.png', 'assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
  
}

function draw() {
  background(255, 255, 255);  
  
  //aside of setting the velocity directly you can move a sprite
  //by providing a speed and an angle
  direction += 2;
  //speed, angle
  // circle.setSpeed(3, direction);
  
  //or by applying a force toward a point
  //force (acceleration), pointx, pointy
  ghost.attractionPoint(.2, mouseX, mouseY);
  //since the force keeps incrementing the speed you can 
  //set a limit to it with maxSpeed
  ghost.maxSpeed = 5;
  
  //draw the sprite
  drawSprites();
}
