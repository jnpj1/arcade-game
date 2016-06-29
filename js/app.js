// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 0;
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.giveProperties = function () {
    var giveNewSpeed = function() {
        var speedAssigner = Math.random();
        var newSpeed = 0;
        if (speedAssigner < 0.21) {
            newSpeed = 100;
        } else if (speedAssigner < 0.51) {
            newSpeed = 200;
        } else {
            newSpeed = 300;
        }
        return newSpeed;
    };
    this.speed = giveNewSpeed();

    var giveNewPosition = function() {
        var positionAssigner = Math.random();
        var newPosition = 0;
        if (positionAssigner < 0.34) {
            newPosition = 60;
        } else if (positionAssigner < 0.67) {
            newPosition = 145;
        } else {
            newPosition = 230;
        }
        return newPosition;
    };
    this.y = giveNewPosition();
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
        this.x += dt * this.speed;
    }
    else {
        this.x = -100;
        this.giveProperties();
    }

    var xCollisionDetection = Math.abs(this.x - player.x);
    var yCollisionDetection = Math.abs(this.y - player.y);
    if ((xCollisionDetection < 50) && (yCollisionDetection < 21)) {
        player.x = 200;
        player.y = 400;
        token.x = -100;
        token.y = -100;
        player.collisionCounter += 1;
        player.lives -= 1;
        if (player.collisionCounter === 1) {
            player.sprite = 'images/char-horn-girl.png';
        } else if (player.collisionCounter === 2) {
            player.sprite = 'images/char-pink-girl.png';
        } else if (player.collisionCounter === 3) {
            player.sprite = 'images/char-princess-girl.png';
        } else {
            player.sprite = 'images/char-cat-girl.png';
            player.collisionCounter = 0;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.collisionCounter = 0;
    this.visualDelayCounter = 0;
    this.points = 0;
    this.lives = 5;
};

/*Player.prototype.update = function() {
 Add functionality to return player to grass when water is reached.
 Add collision functionality, if needed here also.
};*/

Player.prototype.update = function() {
    var backToGrass = 0;
    if (this.y === 0) {
        if (this.visualDelayCounter < 20) {
            this.visualDelayCounter++;
        }
    }
    if ((this.y === 0) && (this.visualDelayCounter === 20)) {
        backToGrass = 400;
        this.visualDelayCounter = 0;
        this.points += 10;
        token.giveProperties();
    }
    this.y += backToGrass;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var xMovement = 0;
    var yMovement = 0;
    if ((key === "up") && (this.y > 0)) {
        yMovement = -80;
    } else if ((key === "down") && (this.y < 400)) {
        yMovement = 80;
    } else if ((key === "right") && (this.x < 400)) {
        xMovement = 100;
    } else if ((key === "left") && (this.x > 0)) {
        xMovement = -100;
    }
    this.x += xMovement;
    this.y += yMovement;
};

var SpecialToken = function() {
    this.sprite = "images/Heart.png";
    this.x = -100;
    this.y = -100;
    this.pointValue = 0;
    this.lifeValue = 0;
}

SpecialToken.prototype.giveProperties = function() {
    var tokenSelector = Math.random();
    var xCoordinate = Math.random();
    var yCoordinate = Math.random();
    if (tokenSelector < 0.16) {
        this.sprite = "images/Heart.png";
        this.lifeValue = 1;
        this.pointValue = 0;
    } else if (tokenSelector < 0.26) {
        this.sprite = "images/Gem-Blue.png";
        this.lifeValue = 0;
        this.pointValue = 40;
    } else if (tokenSelector < 0.51) {
        this.sprite = "images/Gem-Green.png";
        this.lifeValue = 0;
        this.pointValue = 30;
    } else {
        this.sprite = "images/Gem-Orange.png";
        this.lifeValue = 0;
        this.pointValue = 20;
    }
    console.log(this.sprite);

    if (xCoordinate < 0.21) {
        this.x = 0;
    } else if (xCoordinate < 0.41) {
        this.x = 100;
    } else if (xCoordinate < 0.61) {
        this.x = 200;
    } else if (xCoordinate < 0.81) {
        this.x = 300;
    } else {
        this.x = 400;
    }

    if (yCoordinate < 0.34) {
        this.y = 80;
    } else if (yCoordinate < 0.67) {
        this.y = 160;
    } else {
        this.y = 240;
    }
    console.log(this.x + " " + this.y);
};

SpecialToken.prototype.update = function() {
    var xCollisionDetection = Math.abs(this.x - player.x);
    var yCollisionDetection = Math.abs(this.y - player.y);
    if ((xCollisionDetection < 50) && (yCollisionDetection < 21)) {
        this.x = -100;
        this.y = -100;
        player.lives += this.lifeValue;
        player.points += this.pointValue;
    }
}

SpecialToken.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
enemy1.giveProperties();
var enemy2 = new Enemy();
enemy2.giveProperties();
var enemy3 = new Enemy();
enemy3.giveProperties();
var enemy4 = new Enemy();
enemy4.giveProperties();
var enemy5 = new Enemy();
enemy5.giveProperties();



var allEnemies = [];

allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

var player = new Player();

var token = new SpecialToken();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.lives > 0) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

document.addEventListener('keydown', function(n) {
    if ((player.lives === 0) && (n.keyCode === 78)) {
        player.lives = 5;
        player.points = 0;
    }
});
