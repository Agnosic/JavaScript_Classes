var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brickCount = Math.floor(Math.random()*11)+10;
var brickSide = canvas.height*0.05;
var score = 0;
var gameTime = 180;
var level = 1;
var decrTime = 1000;
var name;
var scale = ctx.canvas.width/1853;
var players = []
console.log(scale);


class Brick{
    constructor(){
        this.x = Math.floor(Math.random()*(canvas.width-brickSide));
        this.y = Math.floor(Math.random()*(canvas.height-brickSide));
        this.value = 20;
        this.lifeCount = 20 + Math.floor(Math.random()*31);
        this.lifeCurrent = 0;
    }
}

class Ball{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.vx = 0;
        this.vy = 0;
        this.r = canvas.height*0.025;
        this.speed = scale*2;
    }
}

class Player{
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

var ball = new Ball();
console.log(ball.speed);


var bricks = [];
for(var i=0; i<brickCount + 30; i++) {
  bricks[i] = new Brick();
  for(j = 0; j < i; j++){
      var b = bricks[j];
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
window.addEventListener('resize', resizeCanvas, false);

function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "ArrowUp"){
        upPressed = true;
    }
    else if(e.key == "ArrowDown"){
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "ArrowUp"){
        upPressed = false;
    }
    else if(e.key == "ArrowDown"){
        downPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = ball.x - (e.clientX - canvas.offsetLeft);
    var relativeY = ball.y - (e.clientY + canvas.offsetTop);
    var rad = Math.sqrt(Math.abs(relativeX)*Math.abs(relativeX) + Math.abs(relativeY) * Math.abs(relativeY));
    ball.vx = (relativeX/rad)*ball.speed * (-3);
    ball.vy = (relativeY/rad)*ball.speed * (-3);
}

function collisionDetection() {
  for(var i=0; i<brickCount; i++) {
    var b = bricks[i];
    if(ball.x > b.x - ball.r && ball.x < b.x+brickSide+ ball.r && ball.y > b.y - ball.r && ball.y < b.y+brickSide + ball.r) {
        score += b.value;
        bricks[i] = new Brick();
        //document.location.reload();
        
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var i=0; i<brickCount; i++) {
    ctx.beginPath();
    if(bricks[i].value >=0){
        ctx.fillStyle = "#00cc00";
    }
    else{
        ctx.fillStyle = "#ff0000";
    }
    ctx.rect(bricks[i].x, bricks[i].y, brickSide, brickSide);
    ctx.fill();
    ctx.closePath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(bricks[i].value, bricks[i].x, bricks[i].y+brickSide-7);
  }
}
function showScore() {
    document.getElementById("score").textContent = score;

}

function showTime(){
    document.getElementById("time").textContent = gameTime
    document.getElementById("level").textContent = level
}
function showPlayers(){
    var playersRow = document.getElementById("players").getElementsByTagName("tr");
    for(var i =0; i < players.length; i++){
        col = playersRow[i+1].getElementsByTagName("td")
        col[0].textContent = players[i].name;
        col[1].textContent = players[i].score;
    }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  showScore();
  showTime();
  collisionDetection();
  showPlayers();

  ball.x += ball.vx;
  ball.y += ball.vy;
  if(rightPressed) {
    ball.vx = ball.speed * 3;
    ball.vy = 0;
  }
  else if(leftPressed) {
    ball.vx = ball.speed * (-3);
    ball.vy = 0;
  }
  if(downPressed) {
    ball.vy = ball.speed * 3;
    ball.vx = 0;
  }
  else if(upPressed) {
    ball.vy = ball.speed * (-3);
    ball.vx = 0;
  }
  if(ball.x < 0) ball.x = ctx.canvas.width;
  if(ball.x > ctx.canvas.width) ball.x = 0;
  if(ball.y < 0) ball.y = ctx.canvas.height;
  if(ball.y > ctx.canvas.height) ball.y = 0;

  requestAnimationFrame(draw);
}
var requestID;
var intervalID;
var intervalID2;

function timerUpdate(){

    gameTime--;
    if(gameTime == 0){
        window.clearInterval(intervalID);
        window.clearInterval(intervalID2);
        window.cancelAnimationFrame(requestID);
        player = new Player(name, score);
        players.push(player);
        players.sort(comparePlayers);
        ball = new Ball();
        reset();
        return;
    }
    if(gameTime % 60 == 0 && gameTime !== 0){
        level++;
        decrTime = decrTime/2;
        window.clearInterval(intervalID2);
        intervalID2 = setInterval(decrUpdate, decrTime, (1));
        ball.r += 10
        brickCount += 10;
        ball.speed += 2*scale;
    }
}

function comparePlayers(a, b){
    if(a.score < b.score) return 1;
    if(a.score > b.score) return -1;
    return 0;
}

function game(){
    name = window.prompt("Enter your name", "Player");
    requestID = requestAnimationFrame(draw);
    intervalID = setInterval(timerUpdate, 1000, (0));
    intervalID2 = setInterval(decrUpdate, decrTime, (1));

}
function decrUpdate(){
    for(var i = 0; i < brickCount; i++){
        bricks[i].value--;;
        bricks[i].lifeCurrent++;
        if(bricks[i].lifeCurrent >= bricks[i].lifeCount){
            bricks[i] = new Brick();
        } 
    }
}

function reset(){
    brickCount = Math.floor(Math.random()*11)+10;
    brickSide = canvas.height*0.05;
    score = 0;
    gameTime = 179;
    level = 1;
    decrTime = 1000;
    valueDecr = 1;
    game();
}

function resizeCanvas(){
    ctx.canvas.width = innerWidth;
    ctx.canvas.height = innerHeight;
    scale = ctx.canvas.width/1853;
}

game();

