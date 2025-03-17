let canvas = document.querySelector("canvas");
let gameOverBox = document.querySelector(".gameOver");
let scoreElem = document.querySelector(".scoreElem");
let tryAgain = document.querySelector(".tryAgain");
let birdImage = document.querySelector(".birdImage");
let wall_1 = document.querySelector(".wall_1");
let wall_2 = document.querySelector(".wall_2");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let ctx = canvas.getContext("2d");

let scoreIncrease;
let score = 0;
let gravity = 0.6;
let powerJump = -10;
let gameOver = false;

let bird = {
  x: 100,
  r: 25,
  y: canvas.height / 2,
  speedY: 0,
};

let wall = {
  x: canvas.width + 50,
  y: 0,
  w: 70,
  h: Math.floor((Math.random() * canvas.height) / 1.5),
  speedWall: 9,
};

function moveBird() {
  if (bird.y - bird.r < 0) {
    bird.y = bird.r;
    bird.speedY = 0;
  }

  if (bird.y + bird.r > canvas.height) {
    bird.y = canvas.height - bird.r;
    bird.speedY = 0;
    gameOver = true;
  }

  bird.speedY += gravity;
  bird.y += bird.speedY;
}

function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.r, 0, 2 * Math.PI);
  ctx.fill();
}

function drawWall() {
  ctx.beginPath();
  wall.x -= wall.speedWall;
  ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  ctx.fillRect(wall.x, wall.h + 160, wall.w, canvas.height);
}

function gameOverF() {
  if (
    bird.x + bird.r > wall.x &&
    bird.x - bird.r < wall.x + wall.w &&
    (bird.y - bird.r < wall.h || bird.y + bird.r > wall.h + 160)
  ) {
    gameOver = true;
  }
}

function increaser() {
  clearInterval(scoreIncrease);
  scoreIncrease = setInterval(() => {
    if (!gameOver) {
      score++;
      scoreElem.innerHTML = score;
    }
  }, 500);
}

function resetGame() {
  gameOver = false;
  score = 0;
  bird.y = canvas.height / 2;
  bird.speedY = 0;
  wall.x = canvas.width + 50;
  wall.h = Math.floor((Math.random() * canvas.height) / 1.5);

  gameOverBox.style.display = "none";
  increaser();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "15px Arial";
  ctx.fillText(`your score : ${score}`, 15, 15);
  if (!gameOver) {
    drawBird();
    moveBird();
    gameOverF();
    drawWall();

    if (wall.x + wall.w < 0) {
      wall.x = canvas.width;
      wall.h = Math.floor((Math.random() * canvas.height) / 1.5);
    }
  } else {
    clearInterval(scoreIncrease);
    gameOverBox.style.display = "flex";
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    bird.speedY = powerJump;
  }
});

document.addEventListener("touchstart", () => {
  bird.speedY = powerJump;
});

increaser();
update();
tryAgain.addEventListener("click", resetGame);
