import { GameObject }       from "../gameobject.js";
import { Vector }           from "../vector.js";
import { Ammunition }       from "./ammunition.js";

export class MissileAmmo extends Ammunition {
    constructor(position: Vector) {
        super("ammo-missile", position)
    }

    public onCollision(target: GameObject): void {
        
    }
}