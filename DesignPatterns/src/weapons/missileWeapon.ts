import { Game }     from "../game";
import { Missile }  from "../projectiles/missile.js";
import { Tank }     from "../tank";
import { Weapon }   from "./weapon";

export class MissileWeapon implements Weapon {
    reload: number = 3000
    tank : Tank
    game : Game
    constructor(tank: Tank, game: Game) {
        console.log('Created MissileWeapon');
        this.tank = tank
        this.game = game
    }

    public fire(){
        console.log('Fire missile');
        this.game.gameObjects.push(new Missile(this.tank))
        
    }
}