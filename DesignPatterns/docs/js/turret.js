import { GameObject } from "./gameobject.js";
import { Vector } from "./vector.js";
export class Turret extends GameObject {
    constructor(tank) {
        super("tank-turret");
        this.speed = new Vector(0, 0);
        this.tank = tank;
    }
    update() {
        this.position = new Vector(this.tank.Position.x, this.tank.Position.y);
        this.speed = this.tank.Speed;
        this.rotation = this.tank.Rotation;
        super.update();
    }
    onCollision(target) {
        throw new Error("Method not implemented.");
    }
}
