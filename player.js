function Player() {
    return {
        radius: 10,
        x: canvas.width / 2,
        y: -50,
        vx: 5,
        vy: 0,
        gravity: 1,
        jumpVelocity: 30,
        jumping: false,
        keyBinds: { // keyCodes of the arrow keys
            left: 37,
            right: 39,
            jump: 38
        },
        keysDown: [],
        colliding: false,
        color: "red",
        colorfulStream: [],
        maxColorfulStreamLength: 50,
        createEventListeners() {
            // so we can reference this in the event listeners
            var playerObject = this;

            // if keys are pushed down, they are put into keysDown
            window.addEventListener('keydown', function(e) {

                // only add if keyCode isn't already in array
                if (playerObject.keysDown.indexOf(e.keyCode) == -1) {
                    playerObject.keysDown.push(e.keyCode);
                }
            });

            // once keys are released, they are removed from keysDown
            window.addEventListener('keyup', function(e) {
                var index = playerObject.keysDown.indexOf(e.keyCode);
                playerObject.keysDown.splice(index, 1);
            });
        },
        updatePosition() {
            // if keysDown has something in it
            if (this.keysDown.length > 0) {

                // if left is being pushed down
                if (this.keysDown.indexOf(this.keyBinds.left) != -1) {
                    this.x -= this.vx;
                }

                if (this.keysDown.indexOf(this.keyBinds.right) != -1) {
                    this.x += this.vx;
                }

                if (this.keysDown.indexOf(this.keyBinds.jump) != -1 && !this.jumping) {
                    this.vy = -this.jumpVelocity;
                    this.jumping = true;
                }
            }
            
            // only apply gravity if player is above ground
            if (this.y <= canvas.height) {
                this.vy += this.gravity;
            } else {
                this.vy = 0;
                this.y = canvas.height;
                this.jumping = false;
            }

            // make sure player won't get stuck in rect if moves to next position
            var willCollide = this.willCollide(platforms, this.x, this.y + this.vy);
            if (willCollide) {
                var isFalling = this.vy > 0;
                if (isFalling) this.jumping = false;

                this.vy = getPlatform().velocity;
            }

            this.y += this.vy;
        },
        draw() { // draws a circle representing our player
            this.updatePosition();
            this.updateColorfulStream();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        },
        willCollide(platforms, x, y) {
            var willCollide = false;
            // yes I know a for loop is basically the worst way to detect collision
            // Even simple optimizations would go a long way, but QuadTree would probably be best
            for (var i = 0; i < platforms.length; i++) {
                var platform = platforms[i];
                var pastLeftSide = x + this.radius >= platform.x;
                var belowTop = y + this.radius >= platform.y;
                var beforeRightSide = x - this.radius < platform.x + platform.width;
                var aboveBottom = y - this.radius  < platform.y + platform.height;

                // if any of these conditions are false, this.colliding will be false
                willCollide = pastLeftSide && belowTop && beforeRightSide && aboveBottom;

                if (willCollide) {
                    break;
                }
            }

            return willCollide;
        },
        updateColorfulStream() {
            if (this.colorfulStream.length == this.maxColorfulStreamLength) this.colorfulStream.splice(0, 1);

            this.colorfulStream.push(getColorfulDot(this.x, this.y, platforms[0].velocity));
            console.log(this.colorfulStream)

            for (var i = 0; i < this.colorfulStream.length; i++) {
                this.colorfulStream[i].draw();
            }
        }
    }
}
