const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Sprite {
    constructor({ image, position, scale = 1, speed = 1 }) {
        this.image = image;
        this.scale = scale;
        this.dimension = {
            width: this.image.width * scale,
            height: this.image.height * scale
        };
        this.dimension.height = image.height * scale;
        this.position = position;
        this.speed = speed;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    }

    move({ dx, dy }) {
        this.position.x += dx;
        this.position.y += dy;
    }

    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }

    moveUp() {
        this.position.y += this.speed;
    }

    moveDown() {
        this.position.y -= this.speed;
    }
}

const speed = 5;
const velocity = {
    dx: 0,
    dy: 0
}

const map1 = document.getElementById("map_1");
const mapSprite = new Sprite({
    image: map1,
    position: {x: 0, y: -300},
    scale: 1.5
});

const playerUp1 = document.getElementById("player_up_1");
const playerSprite = new Sprite({
    image: playerUp1,
    position: {x: canvas.width / 2, y: canvas.height / 2}
});

function animate() {
    mapSprite.move(velocity);
    mapSprite.draw();
    playerSprite.draw();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            velocity.dx = 0;
            velocity.dy = speed;       
            break;  
        case 'a':
        case 'A':
        case 'ArrowLeft':
            velocity.dx = speed;
            velocity.dy = 0;
            break;    
        case 's':
        case 'S':
        case 'ArrowDown':
            velocity.dx = 0;
            velocity.dy = -speed;      
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            velocity.dx = -speed;
            velocity.dy = 0;       
            break;          
    }
});

window.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp': 
        case 'a':
        case 'A':
        case 'ArrowLeft':  
        case 's':
        case 'S':
        case 'ArrowRight':
        case 'd':
        case 'D':
        case 'ArrowDown':
            velocity.dx = 0;
            velocity.dy = 0;     
            break;          
    }
});