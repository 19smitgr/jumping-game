function getPlatform() {
    return {
        draw() {
            ctx.beginPath();
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        width: 100,
        height: 10,
        x: 0,
        y: 0,
        velocity: 2,
        randomizeX() {
            this.x = getRandInt(0, canvas.width - platform.width);
        }
    }
}

var platforms = [];
var numPlatforms = 2;
var numRows = 4;
var heightBetweenRows = 200;

for (var j = 0; j < numRows; j++) {
    for (var i = 0; i < numPlatforms; i++) {
        var platform = getPlatform();

        if (i == 0 ** j == 0) {
            var middleOfScreen = canvas.width / 2;
            platform.x = middleOfScreen - platform.width / 2;
        } else {
            platform.randomizeX();
        }
        platform.y = 0 - j * heightBetweenRows;
        platforms.push(platform);
    }
}

var player1 = new Player();
player1.createEventListeners();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // loop through all platforms
    for (var i = 0; i < platforms.length; i++) {
        
        platform = platforms[i];
        if (platform.y >= canvas.height) {
            platform.y = 0;
            platform.randomizeX();
        }

        platform.draw();
        platform.y += platform.velocity;

        platform.velocity += .001;
    }

    player1.draw();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();