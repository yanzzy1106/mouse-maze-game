// Phaser 游戏配置
var config = {
    type: Phaser.AUTO,
    width: 480,  // 设置画布尺寸
    height: 640, // 设置画布尺寸
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT, // 适配手机屏幕
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var player;
var cheese;
var maze;
var game = new Phaser.Game(config);

function preload() {
    // 预加载图片资源，并调整为适合手机屏幕的尺寸
    this.load.image('mouse', 'images/mouse.png');
    this.load.image('cheese', 'images/cheeses.png');
    this.load.image('wall', 'images/wall.png');
}

function create() {
    // 创建迷宫
    maze = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', ' ', ' ', 'wall', ' ', ' ', ' ', 'wall', ' ', 'wall'],
        ['wall', ' ', 'wall', 'wall', 'wall', ' ', 'wall', 'wall', ' ', 'wall'],
        ['wall', ' ', ' ', ' ', 'wall', ' ', ' ', ' ', ' ', 'wall'],
        ['wall', 'wall', 'wall', ' ', 'wall', ' ', 'wall', 'wall', ' ', 'wall'],
        ['wall', ' ', ' ', ' ', 'wall', ' ', ' ', ' ', ' ', 'wall'],
        ['wall', 'wall', 'wall', ' ', 'wall', 'wall', 'wall', 'wall', ' ', 'wall'],
        ['wall', ' ', ' ', ' ', ' ', ' ', 'wall', ' ', ' ', 'wall'],
        ['wall', 'wall', 'wall', 'wall', ' ', 'wall', 'wall', ' ', 'cheese', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ];

    // 在迷宫中显示墙壁和奶酪
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 'wall') {
                this.add.image(x * 48 + 24, y * 48 + 24, 'wall').setOrigin(0.5, 0.5).setScale(0.5); // 墙壁缩小
            } else if (maze[y][x] === 'cheese') {
                cheese = this.add.image(x * 48 + 24, y * 48 + 24, 'cheese').setOrigin(0.5, 0.5).setScale(0.5); // 奶酪缩小
            }
        }
    }

    // 创建小老鼠
    player = this.add.image(96, 96, 'mouse').setOrigin(0.5, 0.5).setScale(0.5); // 小老鼠缩小

    // 设置初始位置
    player.x = 96;
    player.y = 96;

    // 添加触摸控制
    this.input.on('pointerdown', (pointer) => {
        var x = Math.floor(pointer.x / 48); // 每个单元格宽度为 48px
        var y = Math.floor(pointer.y / 48); // 每个单元格高度为 48px
        movePlayer(x, y);
    });
}

function update() {
    // 游戏更新逻辑
}

// 移动小老鼠
function movePlayer(x, y) {
    var targetX = x * 48 + 24;
    var targetY = y * 48 + 24;

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
    player.x = 96;
    player.y = 96;
    alert("游戏重新开始！");
}
