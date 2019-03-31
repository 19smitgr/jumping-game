// copied from https://css-tricks.com/snippets/javascript/random-hex-color/
function getRandColor() {
    var color = Math.floor(Math.random()*16777215).toString(16);
    return "#"+color
}

function getColorfulDot(x, y, velocity) {
    return {
        radius: 3,
        x: x,
        y: y,
        updatePos() {
            this.y += velocity;
        },
        draw() {
            this.updatePos();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = getRandColor();
            ctx.fill();
        }
    }
}