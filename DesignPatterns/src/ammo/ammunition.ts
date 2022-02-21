import { GameObject }   from "../gameobject.js";
import { Vector }       from "../vector.js";

export abstract class Ammunition extends GameObject{
    constructor(type: string, position :Vector) {
        super(type)

        this.position = position
    }

    abstract onCollision(target: GameObject): void
}