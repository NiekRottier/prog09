import { GameObject } from "./gameobject.js";
import { Turret } from "./turret.js";
import { Vector } from "./vector.js";
import { BulletWeapon } from "./weapons/bulletWeapon.js";
export class Tank extends GameObject {
    constructor(game) {
        super("tank-body");
        this.FRICTION = 0.3;
        this.ACCELERATION = 0.2;
        this.turnLeft = false;
        this.turnRight = false;
        this.accelerate = false;
        this.canFire = false;
        this.previousState = false;
        this.rotationSpeed = 2;
        this.speed = new Vector(0, 0);
        this.game = game;
        this.position.x = visualViewport.width / 2;
        this.position.y = visualViewport.height / 2;
        this.speed = new Vector(0, 0);
        this.rotation = 0;
        this.turret = new Turret(this);
        this.weapon = new BulletWeapon(this, this.game);
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }
    get Speed() { return this.speed; }
    get Turret() { return this.turret; }
    set Weapon(weapon) { this.weapon = weapon; }
    update() {
        this.turret.update();
        if (this.turnLeft)
            this.rotation -= this.rotationSpeed;
        else if (this.turnRight)
            this.rotation += this.rotationSpeed;
        if (this.accelerate) {
            if (this.speed.x < 5)
                this.speed.x += this.ACCELERATION;
            if (this.speed.y < 5)
                this.speed.y += this.ACCELERATION;
        }
        else {
            if (this.speed.x > 0)
                this.speed.x -= this.FRICTION;
            if (this.speed.y > 0)
                this.speed.y -= this.FRICTION;
        }
        if (this.speed.x < 0)
            this.speed.x = 0;
        if (this.speed.y < 0)
            this.speed.y = 0;
        this.position.x += Math.cos(this.degToRad(this.rotation)) * this.speed.x;
        this.position.y += Math.sin(this.degToRad(this.rotation)) * this.speed.y;
        this.keepInWindow();
        if (this.canFire && !this.previousState) {
            this.weapon.fire();
            this.previousState = true;
            setTimeout(() => {
                this.previousState = false;
            }, this.weapon.reload);
        }
        super.update();
    }
    handleKeyDown(e) {
        if (e.key == "ArrowLeft")
            this.turnLeft = true;
        else if (e.key == "ArrowRight")
            this.turnRight = true;
        if (e.key == "ArrowUp")
            this.accelerate = true;
        if (e.key == " ")
            this.canFire = true;
    }
    handleKeyUp(e) {
        if (e.key == "ArrowLeft")
            this.turnLeft = false;
        else if (e.key == "ArrowRight")
            this.turnRight = false;
        if (e.key == "ArrowUp")
            this.accelerate = false;
        if (e.key == " ") {
            this.canFire = false;
        }
    }
    onCollision(target) {
    }
    keepInWindow() {
        if (this.position.x + this.width < 0)
            this.position.x = window.innerWidth;
        if (this.position.y + this.height < 0)
            this.position.y = window.innerHeight;
        if (this.position.x > window.innerWidth)
            this.position.x = -this.width;
        if (this.position.y > window.innerHeight)
            this.position.y = -this.height;
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
}
