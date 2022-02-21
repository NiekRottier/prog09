import { Tank }         from "../tank.js";
import { Projectile }   from "./projectile.js";


export class Rocket extends Projectile {
    constructor(tank : Tank) {
        super("rocket", tank)
    }
}