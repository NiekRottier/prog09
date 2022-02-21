import { GameObject }   from "../gameobject.js";
import { Tank }         from "../tank.js";
import { Turret }       from "../turret.js";
import { Vector }       from "../vector.js";

export abstract class Projectile extends GameObject{
    
    // Field 
    private damage       : number = 15
    private speed        : number = 10
    private parentTurret : Turret
    private direction    : Vector;

    // Properties
    public get Damage()         : number        { return this.damage }
    public get ParentTurret()   : GameObject    { return this.parentTurret }
    
    constructor(type: string, tank : Tank) {
        super(type)

        this.parentTurret   = tank.Turret
        this.position       = this.parentTurret.Position
        this.rotation       = this.parentTurret.Rotation 
        this.direction      = Vector.getVectorFromAngle(this.rotation)

        // move the bullet in front of the barrel // TODO distance depends on tank.Data.armor
        let dist = 30
        this.position = this.Position.add(this.direction.scale(dist))
    }

    public update() {
        this.position = this.Position.add(this.direction.scale(this.speed))
        super.update();

    }

    public onCollision(target: GameObject): void {
        
    }
}