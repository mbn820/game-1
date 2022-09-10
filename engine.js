class CircularList {
  constructor(list) {
    this.list = list;
    this.maxIndex = list.length - 1;
    this.currentIndex = 0;
  }

  debug() {
    console.log(this);
  }

  next() {
    if (++this.currentIndex > this.maxIndex) {
      this.currentIndex = 0;
    }
    return this.list[this.currentIndex];
  }
}

const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
};

class Sprite {
  constructor({
    image,
    position,
    scale = 1,
    speed = 1,
    velocity = { dx: 0, dy: 0 },
  }) {
    this.scale = scale;
    this.dimension = {
      width: 0,
      height: 0,
    };
    this.setImage(image);
    this.position = position;
    this.speed = speed;
    this.velocity = velocity;
  }

  setImage(image) {
    if (image) {
      this.image = image;
      this.dimension = {
        width: image.width * this.scale,
        height: image.height * this.scale,
      };
    }
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  }

  update() {
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }

  updateThenDraw() {
    this.update();
    this.draw();
  }

  panLeft() {
    this.velocity.dx = this.speed;
    this.velocity.dy = 0;
  }

  panRight() {
    this.velocity.dx = -this.speed;
    this.velocity.dy = 0;
  }

  panUp() {
    this.velocity.dx = 0;
    this.velocity.dy = this.speed;
  }

  panDown() {
    this.velocity.dx = 0;
    this.velocity.dy = -this.speed;
  }

  stop() {
    this.velocity.dx = 0;
    this.velocity.dy = 0;
  }
}

class PlayerSprite extends Sprite {
  constructor(props) {
    super(props);
    this.upFrames = new CircularList(props.upFrames);
    this.downFrames = new CircularList(props.downFrames);
    this.leftFrames = new CircularList(props.leftFrames);
    this.rightFrames = new CircularList(props.rightFrames);
    this.setImage(props.image);
  }

  walkUp() {
    this.image = this.upFrames.next();
  }

  walkDown() {
    this.image = this.downFrames.next();
  }

  walkLeft() {
    this.image = this.leftFrames.next();
  }

  walkRight() {
    this.image = this.rightFrames.next();
  }

  stop() {
    this.image = this.image;
  }
}
