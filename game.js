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

// 迷宫的初始布局
function preload() {
    // 预加载图片资源，并调整为适合手机屏幕的尺寸
    this.load.image('mouse', 'images/mouse.png');
    this.load.image('cheese', 'images/cheeses.png');
    this.load.image('wall', 'images/wall.png');
}

function create() {
    // 创建迷宫布局
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
                this.add.image(x * 32 + 16, y * 32 + 16, 'wall').setOrigin(0.5, 0.5).setScale(0.4); // 墙壁缩小
            } else if (maze[y][x] === 'cheese') {
                cheese = this.add.image(x * 32 + 16, y * 32 + 16, 'cheese').setOrigin(0.5, 0.5).setScale(0.4); // 奶酪缩小
            }
        }
    }

    // 设置小老鼠出生位置为左上角的空格
    player = this.add.image(16, 16, 'mouse').setOrigin(0.5, 0.5).setScale(0.4); // 小老鼠缩小
    maze[1][1] = 'mouse'; // 确保小老鼠位置不是墙
    player.x = 16;
    player.y = 16;

    // 监听键盘输入，控制小老鼠的移动
    this.input.keyboard.on('keydown', (event) => {
        if (event.key === "ArrowUp") {
            movePlayer(0, -1); // 向上
        } else if (event.key === "ArrowDown") {
            movePlayer(0, 1); // 向下
        } else if (event.key === "ArrowLeft") {
            movePlayer(-1, 0); // 向左
        } else if (event.key === "ArrowRight") {
            movePlayer(1, 0); // 向右
        }
    });

    // 确保小老鼠和奶酪之间存在一条路径
    if (!isPathAvailable()) {
        alert('没有路径通向奶酪，重置游戏！');
        resetGame();
    }
}

function update() {
    // 游戏更新逻辑
}

// 移动小老鼠
function movePlayer(dx, dy) {
    var playerX = (player.x - 16) / 32; // 计算小老鼠当前的格子位置
    var playerY = (player.y - 16) / 32;

    var targetX = playerX + dx;
    var targetY = playerY + dy;

    // 确保目标位置在迷宫内，并且不是墙壁
    if (targetX >= 0 && targetX < maze[0].length && targetY >= 0 && targetY < maze.length) {
        if (maze[targetY][targetX] !== 'wall') {
            player.x = targetX * 32 + 16; // 更新小老鼠的位置
            player.y = targetY * 32 + 16;
        }
    }

    // 检查是否找到奶酪
    if (player.x === cheese.x && player.y === cheese.y) {
        alert("恭喜，你成功找到了奶酪！");
        resetGame();
    }
}

// 游戏重置
function resetGame() {
    player.x = 16; // 重新设置小老鼠的初始位置
    player.y = 16;
    alert("游戏重新开始！");
}

// 检查是否存在从小老鼠到奶酪的路径
function isPathAvailable() {
    // 这里可以使用广度优先搜索或深度优先搜索来检查是否存在路径
    // 这里简化为一个假设条件，实际可以用路径搜索算法实现
    // 假设此处为简单的路径检查示例
    var visited = [];
    for (let y = 0; y < maze.length; y++) {
        visited[y] = [];
        for (let x = 0; x < maze[y].length; x++) {
            visited[y][x] = false;
        }
    }

    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= maze[0].length || y >= maze.length || visited[y][x] || maze[y][x] === 'wall') {
            return false;
        }
        visited[y][x] = true;
        if (maze[y][x] === 'cheese') {
            return true;
        }
        return dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1);
    }

    return dfs(1, 1); // 从小老鼠的位置 (1,1) 开始搜索
}
