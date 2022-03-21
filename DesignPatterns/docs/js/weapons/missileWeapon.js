import { Missile } from "../projectiles/missile.js";
export class MissileWeapon {
    constructor(tank, game) {
        this.reload = 3000;
        console.log('Created MissileWeapon');
        this.tank = tank;
        this.game = game;
    }
    fire() {
        console.log('Fire missile');
        this.game.gameObjects.push(new Missile(this.tank));
    }
}
