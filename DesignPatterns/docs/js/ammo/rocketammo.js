import { Tank } from "../tank.js";
import { RocketWeapon } from "../weapons/rocketWeapon.js";
import { Ammunition } from "./ammunition.js";
export class RocketAmmo extends Ammunition {
    constructor(position, game) {
        super("ammo-rocket", position, game);
    }
    onCollision(target) {
        if (target instanceof Tank) {
            target.Weapon = new RocketWeapon(target, this.game);
        }
    }
}
