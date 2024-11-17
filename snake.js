//Game Canvas
const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
//Constant Variables
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const width = canvas.width;
const height = canvas.height;
const boardBackground = "black";
const snakeColor = "#1eff00";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
//Let Variables
let running = false;
let xVelocity = unitSize; //unitSize = move right -unitSize =  move left
let yVelocity = 0; // unitSize = move down -unitSize = move up
let foodX;
let foodY;
let score = 0;
let canMove = true;
let snake = [
  { x: unitSize * 4, y: 0 }, //Tail
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }, //Head
];
//Event Listeners
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
//Functions
function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
      allowMove();
    }, 100 - score * 2);
  } else {
    displayGameOver();
  }
}
function allowMove() {
  canMove = true;
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, width, height);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, width - unitSize);
  foodY = randomFood(0, width - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  //if food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  const key = event.key;
  console.log(key);
  const LEFT = "ArrowLeft";
  const RIGHT = "ArrowRight";
  const UP = "ArrowUp";
  const DOWN = "ArrowDown";

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;
  const goingRight = xVelocity == unitSize;

  switch (true) {
    case key == LEFT && !goingRight && canMove:
      xVelocity = -unitSize;
      yVelocity = 0;
      canMove = false;
      break;
    case key == RIGHT && !goingLeft && canMove:
      xVelocity = unitSize;
      yVelocity = 0;
      canMove = false;
      break;
    case key == UP && !goingDown && canMove:
      xVelocity = 0;
      yVelocity = -unitSize;
      canMove = false;
      break;
    case key == DOWN && !goingUp && canMove:
      xVelocity = 0;
      yVelocity = unitSize;
      canMove = false;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    //Check Snake in gameScreen
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= width:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= height:
      running = false;
      break;
  }
  //Checks if snake body and head are in same location and ends game
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", width / 2, height / 2);
  running = false;
}
function resetGame() {
  xVelocity = unitSize; //unitSize = move right -unitSize =  move left
  yVelocity = 0; // unitSize = move down -unitSize = move up
  foodX;
  foodY;
  score = 0;

  snake = [
    { x: unitSize * 4, y: 0 }, //Tail
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }, //Head
  ];
  gameStart();
}
//Game Start
gameStart();
