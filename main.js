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
        this.health = 100;
        this.attack = 10;
        this.attackCooldown = 0;
        this.moveTarget = null;
        this.attackTarget = null;
    }
    // unit's movement to target
    update() {
        // movement
        if (this.moveTarget){
            let dx = this.moveTarget.x - this.x;
            let dy = this.moveTarget.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > this.size){
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
        }
        // attack
        if (this.attackTarget){
            let dx = this.moveTarget.x - this.x;
            let dy = this.moveTarget.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= this.size){
                if (this.attackCooldown <= 0) {
                    this.attackTarget.health -= this.attack;
                    this.attackCooldown = 30;
                }
            }
        }
        if (this.attackCooldown > 0) this.attackCooldown--;
    }
    // makes this unit square
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        // health bar
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y - 10, this.size, 5);

        // health amount
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 10, this.size * (this.health / 100), 5);
    }
}
//unit's starting location and color
const red = new Corps(100, 200, "red");
const blue = new Corps(600, 400, "blue");

function gameLoop() {
    ctx.clearRect (0,0, canvas.width, canvas.height);

    if (red.health > 0 && blue.health > 0) {
        red.moveTarget = blue;
        red.attackTarget = blue;

        blue.moveTarget = red;
        blue.attackTarget = red;

        red.update(blue);
        blue.update(red);
    }
    // alive units
    if (red.health > 0) red.draw();
    if (blue.health > 0) blue.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();