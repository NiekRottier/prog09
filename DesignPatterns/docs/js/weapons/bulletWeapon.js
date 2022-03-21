import { Bullet } from "../projectiles/bullet.js";
export class BulletWeapon {
    constructor(tank, game) {
        this.reload = 500;
        console.log('Created BulletWeapon');
        this.tank = tank;
        this.game = game;
    }
    fire() {
        console.log('Fire bullet');
        this.game.gameObjects.push(new Bullet(this.tank));
    }
}
