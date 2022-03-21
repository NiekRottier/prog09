import { Enemy } from "./enemy.js";
import { Tank } from "./tank.js";
import { Vector } from "./vector.js";
import { BulletAmmo } from "./ammo/bulletammo.js";
import { RocketAmmo } from "./ammo/rocketammo.js";
import { MissileAmmo } from "./ammo/missileammo.js";
export class Game {
    constructor() {
        this.gameObjects = [];
        let tank = new Tank(this);
        this.gameObjects.push(tank);
        this.gameObjects.push(new Enemy(this, "enemy-light", new Vector(50, 50), tank));
        this.gameObjects.push(new Enemy(this, "enemy-medium", new Vector(visualViewport.width - 50, visualViewport.height - 50), tank));
        this.gameObjects.push(new Enemy(this, "enemy-heavy", new Vector(0, visualViewport.height - 50), tank));
        this.gameObjects.push(new BulletAmmo(new Vector(800, 200), this));
        this.gameObjects.push(new RocketAmmo(new Vector(500, 200), this));
        this.gameObjects.push(new MissileAmmo(new Vector(500, 500), this));
        this.gameLoop();
    }
    gameLoop() {
        for (const gameObject of this.gameObjects) {
            gameObject.update();
            this.checkCollision(gameObject);
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision(gameObject1) {
        for (const gameobject2 of this.gameObjects) {
            if (gameObject1 != gameobject2 && gameObject1.hasCollision(gameobject2)) {
                gameObject1.onCollision(gameobject2);
            }
        }
    }
}
window.addEventListener("DOMContentLoaded", () => new Game());
