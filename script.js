const canvas = document.getElementById("canvas");
const score = document.getElementsByClassName("score");
const alert = document.getElementById("alert");
const ctx = canvas.getContext("2d");
const bgColor = "black";
const snakeTailColor = "green";
const snakeHeadColor = "rgb(1, 100, 1)";
const appleColor = "red";
let apple = getAnApple();
//Draw bg-------------------------------------------------------------------------//
function drawField() {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//---------------------------------------------------------------------------------//
let snakeHead = { x: 105, y: 105 };
let snakeTail = [];
function drawSnake() {
  //Reset field
  drawField();

  let { x, y } = apple;
  ctx.fillStyle = appleColor;
  ctx.fillRect(x, y, 5, 5);
  //Check if apple has been eaten
  if (snakeHead.x === apple.x && snakeHead.y == apple.y) {
    apple = getAnApple();
    snakeTail.unshift({});
    for (let item of score) {
      item.innerText = `Score: ${snakeTail.length}`;
    }
  }

  //Draw a snake
  if (snakeHead.x >= 300) snakeHead = { ...snakeHead, x: 0 };
  if (snakeHead.x < 0) snakeHead = { ...snakeHead, x: 300 };

  if (snakeHead.y < 0) snakeHead = { ...snakeHead, y: 145 };
  if (snakeHead.y > 145) snakeHead = { ...snakeHead, y: 0 };

  ctx.fillStyle = snakeHeadColor;
  ctx.fillRect(snakeHead.x, snakeHead.y, 5, 5);
  for (const index in snakeTail) {
    let { x, y } = snakeTail[index];
    //Change color of snake body depends of index of element
    if (index % 2 == 1) {
      ctx.fillStyle = snakeHeadColor;
    } else {
      ctx.fillStyle = snakeTailColor;
    }
    ctx.fillRect(x, y, 5, 5);
  }
}

//----------------------------------------------------------------------------------//
function getRandomNumberEndingIn5(n) {
  let randomNumber = Math.floor(Math.random() * n);
  while (randomNumber % 10 !== 5) {
    randomNumber += 1;
  }
  return randomNumber;
}
function getAnApple() {
  let y = getRandomNumberEndingIn5(canvas.height);
  let x = getRandomNumberEndingIn5(canvas.width);
  return { x, y };
}

//----------------------------------------------------------------------------------//
let direction = "d";
document.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      direction = key;
      break;
    case "a":
      direction = key;
      break;
    case "s":
      direction = key;
      break;
    case "d":
      direction = key;
      break;
    default:
      break;
  }
});
function updateTail(oldHead) {
  let temp;
  for (let index = 0; index < snakeTail.length; index++) {
    temp = snakeTail[index];
    snakeTail[index] = oldHead;
    oldHead = temp;
  }
}
function ifLose() {
  let isLose = snakeTail.some(
    ({ x, y }) => x == snakeHead.x && y == snakeHead.y
  );
  if (isLose) {
    snakeTail = [];
    alert.style.display = "flex";
    clearInterval(intervalID);
  }
}
alert.addEventListener("click", () => {
  alert.style.display = "none";
  for (let item of score) {
    item.innerText = `Score: 0`;
  }
  intervalID = setInterval(moveSnake, 150);
  drawSnake();
});

function moveSnake() {
  let temp = { ...snakeHead };
  ifLose();
  switch (direction) {
    case "w":
      snakeHead = { ...snakeHead, y: snakeHead.y - 5 };
      updateTail(temp);
      break;
    case "a":
      snakeHead = { ...snakeHead, x: snakeHead.x - 5 };
      updateTail(temp);
      break;
    case "s":
      snakeHead = { ...snakeHead, y: snakeHead.y + 5 };
      updateTail(temp);
      break;
    case "d":
      snakeHead = { ...snakeHead, x: snakeHead.x + 5 };
      updateTail(temp);
      break;

    default:
      break;
  }
  drawSnake();
}

let intervalID = setInterval(moveSnake, 150);
drawField();
drawSnake();
