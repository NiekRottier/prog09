import { Game }             from "../game.js";
import { GameObject }       from "../gameobject.js";
import { Tank }             from "../tank.js";
import { Vector }           from "../vector.js";
import { RocketWeapon }     from "../weapons/rocketWeapon.js";
import { Ammunition }       from "./ammunition.js";

export class RocketAmmo extends Ammunition {
    constructor(position: Vector, game: Game) {
        super("ammo-rocket", position, game)
    }

    public onCollision(target: GameObject): void {
        if (target instanceof Tank) {
            target.Weapon = new RocketWeapon(target, this.game)
            
        }
    }
}