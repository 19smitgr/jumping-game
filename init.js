var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}