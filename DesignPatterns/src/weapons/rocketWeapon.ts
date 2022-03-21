import { Game }     from "../game";
import { Rocket }   from "../projectiles/rocket.js";
import { Tank }     from "../tank";
import { Weapon }   from "./weapon";

export class RocketWeapon implements Weapon {
    reload: number = 2000
    tank : Tank
    game : Game
    constructor(tank: Tank, game: Game) {
        console.log('Created RocketWeapon');
        this.tank = tank
        this.game = game
    }

    public fire(){
        console.log('Fire rocket');
        this.game.gameObjects.push(new Rocket(this.tank))
        
    }
}