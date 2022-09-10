// Screen Setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

// Game State
const mapSprite = new Sprite({
  image: map1,
  position: { x: 0, y: -1300 },
  scale: 1.25,
  speed: 5,
});

const initialPlayerSprite = playerImages.DOWN[0];
const playerSprite = new PlayerSprite({
  image: initialPlayerSprite,
  position: {
    x: canvas.width / 2 - initialPlayerSprite.width / 2,
    y: canvas.height / 2 - initialPlayerSprite.height / 2,
  },
  upFrames: playerImages.UP,
  downFrames: playerImages.DOWN,
  leftFrames: playerImages.LEFT,
  rightFrames: playerImages.RIGHT,
});

let direction = Direction.NONE;

let playerAnimationInterval = setInterval(() => {
  switch (direction) {
    case Direction.UP:
      playerSprite.walkUp();
      break;
    case Direction.DOWN:
      playerSprite.walkDown();
      break;
    case Direction.LEFT:
      playerSprite.walkLeft();
      break;
    case Direction.RIGHT:
      playerSprite.walkRight();
      break;
    default:
      playerSprite.stop();
  }
}, 50);

// Scenes
function drawOverworldScene() {
  mapSprite.updateThenDraw();
  playerSprite.draw();
}

// Game Loop
function animate() {
  c.fillRect(0, 0, canvas.width, canvas.height);
  drawOverworldScene();
  requestAnimationFrame(animate);
}
animate();

// Listeners
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "w":
    case "W":
    case "ArrowUp":
      direction = Direction.UP;
      mapSprite.panUp();
      break;
    case "a":
    case "A":
    case "ArrowLeft":
      direction = Direction.LEFT;
      mapSprite.panLeft();
      break;
    case "s":
    case "S":
    case "ArrowDown":
      direction = Direction.DOWN;
      mapSprite.panDown();
      break;
    case "d":
    case "D":
    case "ArrowRight":
      direction = Direction.RIGHT;
      mapSprite.panRight();
      break;
  }
});

window.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "w":
    case "W":
    case "ArrowUp":
      direction = Direction.NONE;
      mapSprite.stop();
      break;
    case "a":
    case "A":
    case "ArrowLeft":
      direction = Direction.NONE;
      mapSprite.stop();
      break;
    case "s":
    case "S":
    case "ArrowRight":
      direction = Direction.NONE;
      mapSprite.stop();
      break;
    case "d":
    case "D":
    case "ArrowDown":
      direction = Direction.NONE;
      mapSprite.stop();
      break;
  }
});
