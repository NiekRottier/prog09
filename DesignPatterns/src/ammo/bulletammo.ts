import { GameObject }       from "../gameobject.js";
import { Vector }           from "../vector.js";
import { Ammunition }       from "./ammunition.js";

export class BulletAmmo extends Ammunition {
    constructor(position: Vector) {
        super("ammo-bullet", position)
    }

    public onCollision(target: GameObject): void {
        
    }
}