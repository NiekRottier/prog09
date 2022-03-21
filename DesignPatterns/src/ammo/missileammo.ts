import { Game }             from "../game.js";
import { GameObject }       from "../gameobject.js";
import { Tank }             from "../tank.js";
import { Vector }           from "../vector.js";
import { MissileWeapon }    from "../weapons/missileWeapon.js";
import { Ammunition }       from "./ammunition.js";

export class MissileAmmo extends Ammunition {
    constructor(position: Vector, game: Game) {
        super("ammo-missile", position, game)
    }

    public onCollision(target: GameObject): void {
        if (target instanceof Tank) {
            target.Weapon = new MissileWeapon(target, this.game)
            
        }
    }
}