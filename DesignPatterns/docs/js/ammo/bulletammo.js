import { Tank } from "../tank.js";
import { BulletWeapon } from "../weapons/bulletWeapon.js";
import { Ammunition } from "./ammunition.js";
export class BulletAmmo extends Ammunition {
    constructor(position, game) {
        super("ammo-bullet", position, game);
    }
    onCollision(target) {
        if (target instanceof Tank) {
            target.Weapon = new BulletWeapon(target, this.game);
        }
    }
}
