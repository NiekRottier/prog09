import { GameObject } from "../gameobject.js";
import { Vector } from "../vector.js";
export class Projectile extends GameObject {
    constructor(type, tank) {
        super(type);
        this.damage = 15;
        this.speed = 10;
        this.parentTurret = tank.Turret;
        this.position = this.parentTurret.Position;
        this.rotation = this.parentTurret.Rotation;
        this.direction = Vector.getVectorFromAngle(this.rotation);
        let dist = 30;
        this.position = this.Position.add(this.direction.scale(dist));
    }
    get Damage() { return this.damage; }
    get ParentTurret() { return this.parentTurret; }
    update() {
        this.position = this.Position.add(this.direction.scale(this.speed));
        super.update();
    }
    onCollision(target) {
    }
}
