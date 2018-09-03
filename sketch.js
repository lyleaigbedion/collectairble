// declare an array to store our objects
var collectibles = [];



// also make a singular player object
var player;

// need this variable so that if the player scores enough points
// the game is over and we can stop drawing it
var gameOver = false;

// how many collectibles should we start with?
var collectibleCount = 20;

function setup() {

  createCanvas(windowWidth, windowHeight);

  // since there is only one single player object
  // we initialize it like this
  player = new Player();

  // and as a basic example, we can simply spawn
  // 20 collectibles to begin with
  for (var i = 0; i < collectibleCount; i++) {
    collectibles.push(new Collectible());
  }

}

function draw() {

  background(155);

  
  
  if(!gameOver) {

  	// cycle thru every object in our array and
    // call their method(s)
  	for(var i = 0; i < collectibles.length; i++) {
  		collectibles[i].update();

      // check for collisions between player and collectibles
      // how far apart is this collectible from player?
      var distanceToPlayer = dist(collectibles[i].x, collectibles[i].y, player.x, player.y);
      
	  // can only collect in a certain part of the screen
	  if (mouseY <= height/1.5 ){
		if(distanceToPlayer < player.diameter/2) {
			// close enough, player collects
			// delete collectible
			collectibles.splice(i, 1);

			// increase score
			player.score++;
		}
  	}
}
	//map player movement to mouse.
	player.x = mouseX;
	player.y = mouseY;

    // and since there is only one single player object
    // no need for a for loop
    player.display();
	fill(0,0,255);
	rect(0,height/1.5,width, height);
    // is it game over?
    if(player.score >= collectibleCount) {
      gameOver = true;
    }

  } else {

    // game is apparently over, so display something
    background(50);
	fill(0,0,125);
    text("Game over!", width/2, height/2);
    //
  }

}

//        --- COLLECTIBLE CLASS ---
function Collectible() {

	// internal variables
	this.x = random(width);
	this.y = random(height);
	this.diameter = 20;

	// internal function for object
	this.update = function() {
		// do stuff
		this.x += random(-2,2);
		this.y += random(-10,5);
		
		// wrap collectible rather than constraining, to mix things up
		// has collecti. gone off the right side of the screen?
		if(this.x > width) {
			this.x = 0;
		}
		// has collectible gone off the left side of the screen?
		if(this.x < 0) {
			this.x = width;
		}
		// has collectible gone off the bottom of the screen?
		if(this.y > height) {
			this.y = 0;
		}

		// has collectible gone off the top of the screen?
		if(this.y < 0) {
			this.y = height;
		}
    // for example, draw to screen
    fill(255);
    stroke(0,0,120);
    ellipse(this.x, this.y, this.diameter, this.diameter);

	}

}

//        --- PLAYER CLASS ---
function Player() {

  this.x = width/2;
  this.y = height/2;
  this.diameter = 40;
  this.score = 0;

  this.display = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);

    // also show score
    fill(0,0,120);
    text("Air: " + this.score, 10, 20);
  }

}