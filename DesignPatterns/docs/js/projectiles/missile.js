import { Projectile } from "./projectile.js";
export class Missile extends Projectile {
    constructor(tank) {
        super("missile", tank);
        this.speed = 0;
    }
}
