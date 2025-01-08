var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'game-container',
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);

// 迷宫布局：1表示墙，0表示空白区域，奶酪和老鼠位置用特殊符号表示
var maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // 不再需要预加载图片，直接使用几何图形
    }

    create() {
        this.playerX = 1;
        this.playerY = 1;
        this.targetX = 8;
        this.targetY = 8;

        this.score = 0;  // 玩家得分

        // 显示得分
        this.scoreText = this.add.text(10, 580, '得分: 0', { fontSize: '24px', fill: '#000' });

        // 初始化迷宫
        this.drawMaze();

        // 设置玩家的初始位置
        this.player = this.add.circle(this.playerX * 50 + 25, this.playerY * 50 + 25, 20, 0xff0000);

        // 设置奶酪位置
        this.cheese = this.add.triangle(this.targetX * 50 + 25, this.targetY * 50 + 25, 
                                        0, -20, 20, 20, -20, 20, 
                                        0xffff00);

        // 控制玩家移动
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === "ArrowUp" && this.canMove(this.playerX, this.playerY - 1)) {
                this.movePlayer(0, -1);
            } else if (event.key === "ArrowDown" && this.canMove(this.playerX, this.playerY + 1)) {
                this.movePlayer(0, 1);
            } else if (event.key === "ArrowLeft" && this.canMove(this.playerX - 1, this.playerY)) {
                this.movePlayer(-1, 0);
            } else if (event.key === "ArrowRight" && this.canMove(this.playerX + 1, this.playerY)) {
                this.movePlayer(1, 0);
            }
        });
    }

    update() {
        // 判断玩家是否到达奶酪
        if (this.playerX === this.targetX && this.playerY === this.targetY) {
            this.score++;
            this.scoreText.setText('得分: ' + this.score);
            this.resetGame();
        }
    }

    drawMaze() {
        // 绘制迷宫的墙壁
        for (var i = 0; i < maze.length; i++) {
            for (var j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === 1) {
                    this.add.line(j * 50 + 25, i * 50 + 25, 0, 0, 50, 50, 0x000000, 1).setLineWidth(5);
                }
            }
        }
    }

    movePlayer(dx, dy) {
        this.playerX += dx;
        this.playerY += dy;
        this.player.setPosition(this.playerX * 50 + 25, this.playerY * 50 + 25);
    }

    canMove(x, y) {
        // 检查玩家是否可以移动到指定位置
        return maze[y] && maze[y][x] === 0;  // 只有0表示可以走的路
    }

    resetGame() {
        // 重置游戏状态
        this.playerX = 1;
        this.playerY = 1;
        this.player.setPosition(this.playerX * 50 + 25, this.playerY * 50 + 25);
        this.cheese.setPosition(this.targetX * 50 + 25, this.targetY * 50 + 25);
    }
}
