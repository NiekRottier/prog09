import { Projectile } from "./projectile.js";
export class Rocket extends Projectile {
    constructor(tank) {
        super("rocket", tank);
    }
}
