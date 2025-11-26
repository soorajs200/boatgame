const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 10,
    dx: 0
};

// Obstacles
const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 20;
const obstacleSpeed = 5;

let score = 0;

function drawPlayer() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function movePlayer() {
    player.x += player.dx;

    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });

    // Remove obstacles that are off-screen
    if (obstacles.length > 0 && obstacles[0].y > canvas.height) {
        obstacles.shift();
        score++;
    }
}

function createObstacle() {
    const x = Math.random() * (canvas.width - obstacleWidth);
    const y = -obstacleHeight;
    obstacles.push({ x, y, width: obstacleWidth, height: obstacleHeight });
}

function detectCollision() {
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            // Game over
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clear();

    drawPlayer();
    drawObstacles();
    drawScore();

    movePlayer();
    moveObstacles();

    detectCollision();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        player.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

setInterval(createObstacle, 1000);
update();
