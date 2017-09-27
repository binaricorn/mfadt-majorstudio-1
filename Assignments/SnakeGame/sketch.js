
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
var numSegments = 10;
var direction = 'right';

var xStart = 0; //starting x coordinate for snake
var yStart = 250; //starting y coordinate for snake
var diff = 10;

var xCor = [];
var yCor = [];

var xFruit = [];
var yFruit = [];
var count = [];

var xf = 0;
var yf = 0;

// var scoreElem;

var status = 1;

function setup() {
  // scoreElem = createDiv('Score = 0');
  // scoreElem.position(width/2, height/2);
  // scoreElem.id = 'score';
  // scoreElem.style('color', 'white');
  
  createCanvas(800, 600);
  frameRate(15);
  stroke(255);

  for (var i = 0; i < numSegments; i++) {
    xCor.push(xStart + (i * diff));
    yCor.push(yStart);
  }
  
  //generate fruit initial position
  for (var i = 0; i < 4; i++) {
    xFruit[i] = floor(random(10, (width - 100) / 10)) * 10;
    yFruit[i] = floor(random(10, (height - 100) / 10)) * 10;
    count[i] = 0;
  }
  
}

function draw() {
  background(0);
  fill(255);
  strokeWeight(0);
  var m = millis();
  text("Seconds running: \t" + int(m/1000), 40, 40);
  text("Number of segments: \t" + numSegments, 40, 60);
  text("Red: \t" + count[0], 40, 80);
  text("Yellow: \t" + count[1], 40, 100);
  text("Blue: \t" + count[2], 40, 120);
  text("Green: \t" + count[3], 40, 140);
  strokeWeight(10);
  
  checkGameStatus();
  //red
  stroke(239, 75, 60);
  checkForFruit(xFruit[0], yFruit[0]);
  //yellow
  stroke(242, 198, 14);
  checkForFruit(xFruit[1], yFruit[1]);
  //blue
  stroke(45, 150, 223);
  checkForFruit(xFruit[2], yFruit[2]);
  //green
  stroke(6, 188, 154);
  checkForFruit(xFruit[3], yFruit[3]);
  
  if (status) {
    stroke(255, 255, 255);
  }
  
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
    // var scoreVal = parseInt(scoreElem.html().substring(8));
    // scoreElem.html('Game ended! Your score was : ' + scoreVal);
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
  if (xCor[xCor.length - 1] === xf && yCor[yCor.length - 1] === yf) {
    for (var i = 0; i < 4; i++) {
      if (xf === xFruit[i]) {
        if (i === 0) {
          for (var n = 0; n < numSegments; n++) {
            xCor[n]+=100;
            yCor[n]+=100;
          }
        }
        
        if (i === 1) {
          xCor.unshift(xCor[0]);
          yCor.unshift(yCor[0]);
          numSegments++;
        }
        
        if (i === 2) {
          xCor.pop();
          yCor.pop();
          numSegments--;
        }
      }
    }
    stroke(random(255), random(255), random(255));
    updateFruitCoordinates(xf, yf);
    point(xf, yf);
  } else {
    point(xf, yf);
  }
}

function updateFruitCoordinates(xf,  yf) {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */
  for (var i = 0; i < 4; i++) {
    if (xf === xFruit[i]) {
      xFruit[i] = floor(random(10, (width - 100) / 10)) * 10;
      yFruit[i] = floor(random(10, (height - 100) / 10)) * 10;
      count[i]++;
    }
  }
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
