import { Game }         from "../game.js";
import { Tank }         from "../tank.js";
import { Vector }       from "../vector.js";
import { Projectile }   from "./projectile.js";


export class Missile extends Projectile {
    constructor(tank : Tank) {
        super("missile", tank)
        this.reload = 3000
        this.speed = 0
    }
}