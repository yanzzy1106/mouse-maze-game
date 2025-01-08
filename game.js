// Phaser 游戏配置
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cheese;
var maze;
var game = new Phaser.Game(config);

function preload() {
    // 预加载图片资源
    this.load.image('mouse', 'images/mouse.png');
    this.load.image('cheese', 'images/cheeses.png');
    this.load.image('wall', 'images/wall.png');
}

function create() {
    // 迷宫定义
    maze = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', ' ', ' ', 'wall', ' ', ' ', 'wall'],
        ['wall', ' ', 'wall', 'wall', 'wall', ' ', 'wall'],
        ['wall', ' ', ' ', ' ', 'wall', ' ', 'wall'],
        ['wall', 'wall', 'wall', ' ', 'wall', 'cheese', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ];
    
    // 显示墙壁和奶酪
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 'wall') {
                this.add.image(x * 100 + 50, y * 100 + 50, 'wall').setOrigin(0.5, 0.5);
            } else if (maze[y][x] === 'cheese') {
                cheese = this.add.image(x * 100 + 50, y * 100 + 50, 'cheese').setOrigin(0.5, 0.5);
            }
        }
    }

    // 创建小老鼠
    player = this.add.image(150, 150, 'mouse').setOrigin(0.5, 0.5);

    // 添加触摸控制
    this.input.on('pointerdown', (pointer) => {
        var x = Math.floor(pointer.x / 100);
        var y = Math.floor(pointer.y / 100);
        movePlayer(x, y);
    });

    // 设置初始位置
}

function update() {
    // 可以在这里加入其他游戏逻辑，例如碰撞检测等
}

// 移动小老鼠
function movePlayer(x, y) {
    var targetX = x * 100 + 50;
    var targetY = y * 100 + 50;

    // 检查目标是否是墙壁
    if (maze[y][x] !== 'wall') {
        player.x = targetX;
        player.y = targetY;

        // 检查是否找到奶酪
        if (player.x === cheese.x && player.y === cheese.y) {
            alert("恭喜，你成功找到了奶酪！");
            resetGame();
        }
    }
}

// 游戏重置
function resetGame() {
    player.x = 150;
    player.y = 150;
}
