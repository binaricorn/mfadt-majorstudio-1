
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
var numSegments = 10;
var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake
var diff = 10;

var xCor = [];
var yCor = [];

var xFruit1 = 0;
var yFruit1 = 0;

var xFruit2 = 0;
var yFruit2 = 0;

var xFruit3 = 0;
var yFruit3 = 0;

var xFruit4 = 0;
var yFruit4 = 0;

var xf = 0;
var yf = 0;

function setup() {
  
  createCanvas(800, 600);
  frameRate(15);
  stroke(255);

  for (var i = 0; i < numSegments; i++) {
    xCor.push(xStart + (i * diff));
    yCor.push(yStart);
  }
  
  xFruit1 = floor(random(10, (width - 100) / 10)) * 10;
  yFruit1 = floor(random(10, (height - 100) / 10)) * 10;
  xFruit2 = floor(random(10, (width - 100) / 10)) * 10;
  yFruit2 = floor(random(10, (height - 100) / 10)) * 10;
  xFruit3 = floor(random(10, (width - 100) / 10)) * 10;
  yFruit3 = floor(random(10, (height - 100) / 10)) * 10;
  xFruit4 = floor(random(10, (width - 100) / 10)) * 10;
  yFruit4 = floor(random(10, (height - 100) / 10)) * 10;
  
  updateFruitCoordinates(xFruit1, yFruit1);
  updateFruitCoordinates(xFruit2, yFruit2);
  updateFruitCoordinates(xFruit3, yFruit3);
  updateFruitCoordinates(xFruit4, yFruit4);
}

function draw() {
  background(0);
  fill(255);
  strokeWeight(0);
  var m = millis();
  text("Seconds running: \t" + int(m/1000), 40, 40);
  text("Number of segments: \t" + numSegments, 40, 60);
  strokeWeight(10);
  
  checkGameStatus();
  stroke(random(255), random(255), random(255));
  checkForFruit(xFruit1, yFruit1);
  stroke(random(255), random(255), random(255));
  checkForFruit(xFruit2, yFruit2);
  stroke(random(255), random(255), random(255));
  checkForFruit(xFruit3, yFruit3);
  stroke(random(255), random(255), random(255));
  checkForFruit(xFruit4, yFruit4);
  
  stroke(255, 255, 255);
  for (var i = 1; i < numSegments - 1; i++) {
    if ((xCor[i+1] - xCor[i])*(xCor[i] - xCor[i-1]) < 0 || (yCor[i+1] - yCor[i])*(yCor[i] - yCor[i-1]) < 0) {
       //do nothing
    } else {
      line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
  }
  
  updateSnakeCoordinates();
}

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  
  for (var i = 0; i < numSegments - 1; i++) {
      if (xCor[i] >= 0) {
        	xCor[i] = xCor[i + 1] % width;
      } else {
	        xCor[i] = xCor[i + 1] % width + width;
      }

      if (yCor[i] >= 0) {
  	      yCor[i] = yCor[i + 1] % height;
      } else {
    	    yCor[i] = yCor[i + 1] % height + height;
      }
  }
  
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (checkSnakeCollision()) {
    noLoop();
    var scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  var snakeHeadX = xCor[xCor.length - 1];
  var snakeHeadY = yCor[yCor.length - 1];
  for (var i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit(xf, yf) {
  point(xf, yf);
  if (xCor[xCor.length - 1] === xf && yCor[yCor.length - 1] === yf) {
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    stroke(random(255), random(255), random(255));
    updateFruitCoordinates(xf, yf);
  }
  // stroke(255,255,255);
}

function updateFruitCoordinates(xf,  yf) {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */
  
  xf = floor(random(10, (width - 100) / 10)) * 10;
  yf = floor(random(10, (height - 100) / 10)) * 10;
  
  // xFruit1 = floor(random(10, (width - 100) / 10)) * 10;
  // yFruit1 = floor(random(10, (height - 100) / 10)) * 10;
  // xFruit2 = floor(random(10, (width - 100) / 10)) * 10;
  // yFruit2 = floor(random(10, (height - 100) / 10)) * 10;
  // xFruit3 = floor(random(10, (width - 100) / 10)) * 10;
  // yFruit3 = floor(random(10, (height - 100) / 10)) * 10;
  // xFruit4 = floor(random(10, (width - 100) / 10)) * 10;
  // yFruit4 = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (direction != 'right') {
        direction = 'left';
      }
      break;
    case RIGHT_ARROW:
      if (direction != 'left') {
        direction = 'right';
      }
      break;
    case UP_ARROW:
      if (direction != 'down') {
        direction = 'up';
      }
      break;
    case DOWN_ARROW:
      if (direction != 'up') {
        direction = 'down';
      }
      break;
  }
}
