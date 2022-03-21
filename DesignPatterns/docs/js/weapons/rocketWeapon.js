import { Rocket } from "../projectiles/rocket.js";
export class RocketWeapon {
    constructor(tank, game) {
        this.reload = 2000;
        console.log('Created RocketWeapon');
        this.tank = tank;
        this.game = game;
    }
    fire() {
        console.log('Fire rocket');
        this.game.gameObjects.push(new Rocket(this.tank));
    }
}
