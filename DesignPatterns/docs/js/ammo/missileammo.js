import { Tank } from "../tank.js";
import { MissileWeapon } from "../weapons/missileWeapon.js";
import { Ammunition } from "./ammunition.js";
export class MissileAmmo extends Ammunition {
    constructor(position, game) {
        super("ammo-missile", position, game);
    }
    onCollision(target) {
        if (target instanceof Tank) {
            target.Weapon = new MissileWeapon(target, this.game);
        }
    }
}
