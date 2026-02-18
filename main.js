const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//the unit values
class Corps {
    constructor(x,y, color){
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = color;
        this.speed = 1;
    }
    // unit's movement to target
    update(target) {
        let dx = target.x - this.x;
        let dy = target.y - this.y;

        // diagonal movements
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.x += (dx / distance);
            this.y += (dy / distance);
        }
    }
    // makes this unit square
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
//unit's starting location and color
const red = new Corps(100, 200, "red");
const blue = new Corps(600, 400, "blue");

function gameLoop() {
    ctx.clearRect (0,0, canvas.width, canvas.height);

    // movement
    red.update(blue);
    blue.update(red);

    // puts them into their position
    red.draw();
    blue.draw();

    requestAnimationFrame(gameLoop);
}
// 
gameLoop();