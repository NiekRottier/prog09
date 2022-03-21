import { Bullet }           from "./projectiles/bullet.js";
import { Rocket }           from "./projectiles/rocket.js";
import { Game }             from "./game.js";
import { GameObject }       from "./gameobject.js";
import { Turret }           from "./turret.js";
import { Vector }           from "./vector.js";
import { Projectile }       from "./projectiles/projectile.js";
import { Missile } from "./projectiles/missile.js";
import { BulletAmmo } from "./ammo/bulletammo.js";
import { RocketAmmo } from "./ammo/rocketammo.js";
import { MissileAmmo } from "./ammo/missileammo.js";
import { BulletWeapon } from "./weapons/bulletWeapon.js";
import { Weapon } from "./weapons/weapon.js";

export class Tank extends GameObject{
    private readonly FRICTION       : number    = 0.3  
    private readonly ACCELERATION   : number    = 0.2  

    // Fields 
    private turnLeft        : boolean   = false
    private turnRight       : boolean   = false
    private accelerate      : boolean   = false
    private canFire         : boolean   = false
    private previousState   : boolean   = false
    private rotationSpeed   : number    = 2
    private turret          : Turret
    private game            : Game
    
    protected speed         : Vector    = new Vector(0, 0)

    private weapon          : Weapon

    // Properties
    public get Speed()  : Vector { return this.speed }
    public get Turret() : Turret { return this.turret }

    public set Weapon(weapon:Weapon) { this.weapon = weapon }
    
    constructor(game:Game) {
        super("tank-body")

        this.game       = game
        this.position.x = visualViewport.width / 2
        this.position.y = visualViewport.height / 2 
        this.speed      = new Vector(0, 0)

        this.rotation   = 0
        
        this.turret = new Turret(this)

        this.weapon = new BulletWeapon(this, this.game)

        window.addEventListener("keydown",  (e : KeyboardEvent) => this.handleKeyDown(e))
        window.addEventListener("keyup",    (e : KeyboardEvent) => this.handleKeyUp(e))
    }

    public update() {
        this.turret.update()

        // handle rotation if active
        if(this.turnLeft)       this.rotation -= this.rotationSpeed
        else if(this.turnRight) this.rotation += this.rotationSpeed

        // handle movement if active
        if(this.accelerate)     {
            if(this.speed.x < 5) this.speed.x += this.ACCELERATION
            if(this.speed.y < 5) this.speed.y += this.ACCELERATION
        } else {
            // slow down the tank if not accelerating 
            if (this.speed.x > 0) this.speed.x -= this.FRICTION
            if (this.speed.y > 0) this.speed.y -= this.FRICTION
        }        
        if (this.speed.x < 0) this.speed.x = 0
        if (this.speed.y < 0) this.speed.y = 0
                    
        this.position.x += Math.cos(this.degToRad(this.rotation)) * this.speed.x
        this.position.y += Math.sin(this.degToRad(this.rotation)) * this.speed.y

        this.keepInWindow()    
        
        // Shooting
        if(this.canFire && !this.previousState) {

            this.weapon.fire()
            
            this.previousState = true
            
            // 'Unlock' the previousState after the reload time. During the reload previousState is true, so you can't shoot
            setTimeout(() => {
                this.previousState = false
            }, this.weapon.reload)
        }

        super.update()
    }

    private handleKeyDown(e : KeyboardEvent) {
        if(e.key == "ArrowLeft")        this.turnLeft   = true
        else if (e.key == "ArrowRight") this.turnRight  = true
        
        if(e.key == "ArrowUp")          this.accelerate = true

        if(e.key == " ")                this.canFire    = true
    }
    
    private handleKeyUp(e : KeyboardEvent) {
        if(e.key == "ArrowLeft")        this.turnLeft   = false
        else if (e.key == "ArrowRight") this.turnRight  = false

        if(e.key == "ArrowUp")          this.accelerate = false

        if(e.key == " ")  {
            this.canFire = false
        }    
    }

    onCollision(target: GameObject): void {
    }

    private keepInWindow() {
        if(this.position.x + this.width < 0)        this.position.x = window.innerWidth
        if(this.position.y + this.height< 0)        this.position.y = window.innerHeight
        if(this.position.x > window.innerWidth)     this.position.x = -this.width
        if(this.position.y > window.innerHeight)    this.position.y = -this.height
    }

    /**
     * Converts angle from degrees to radians
     * @param degrees angle in degrees
     */
     protected degToRad(degrees : number) {
        return degrees * Math.PI / 180
    }
}