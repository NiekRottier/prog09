import { Game } from "../game.js";
import { GameObject }       from "../gameobject.js";
import { Tank }             from "../tank.js";
import { Vector }           from "../vector.js";
import { BulletWeapon }     from "../weapons/bulletWeapon.js";
import { Ammunition }       from "./ammunition.js";

export class BulletAmmo extends Ammunition {

    constructor(position: Vector, game: Game) {
        super("ammo-bullet", position, game)
    }

    public onCollision(target: GameObject): void {
        if (target instanceof Tank) {
            target.Weapon = new BulletWeapon(target, this.game)
            
        }
    }
}