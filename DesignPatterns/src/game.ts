import { Enemy }        from "./enemy.js"
import { GameObject }   from "./gameobject.js"
import { Tank }         from "./tank.js"
import { Vector }       from "./vector.js"
import { BulletAmmo }   from "./ammo/bulletammo.js"
import { RocketAmmo }   from "./ammo/rocketammo.js"
import { MissileAmmo }  from "./ammo/missileammo.js"

export class Game {

    // Fields 
    public gameObjects: GameObject[] = []

    constructor() {
        this.gameObjects.push(new BulletAmmo(new Vector(800, 200)))
        this.gameObjects.push(new RocketAmmo(new Vector(500, 200)))
        this.gameObjects.push(new MissileAmmo(new Vector(500, 500)))
        
        let tank = new Tank(this)
        this.gameObjects.push(tank)
        
        this.gameObjects.push(new Enemy(this, "enemy-light", new Vector(50, 50), tank))
        this.gameObjects.push(new Enemy(this, "enemy-medium", new Vector(visualViewport.width - 50, visualViewport.height - 50), tank))
        this.gameObjects.push(new Enemy(this, "enemy-heavy", new Vector(0, visualViewport.height - 50), tank))
        
        this.gameLoop()
    }

    private gameLoop(): void {
        for (const gameObject of this.gameObjects) {
            gameObject.update()

            this.checkCollision(gameObject)
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    /**
     * Checks the collision of the givin game object against all other game objects.
     * If a collision occurs, the onCollision of the given game object is called
     * @param gameObject1 The game object to check
     */
    private checkCollision(gameObject1 : GameObject) {
        for (const gameobject2 of this.gameObjects) {
            if(gameObject1 != gameobject2 && gameObject1.hasCollision(gameobject2)) {
                gameObject1.onCollision(gameobject2)
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", () => new Game())