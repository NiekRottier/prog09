import { Game }     from "../game";
import { Bullet }   from "../projectiles/bullet.js";
import { Tank }     from "../tank";
import { Weapon }   from "./weapon";

export class BulletWeapon implements Weapon {
    public reload : number = 500
    private tank : Tank
    private game : Game
    constructor(tank: Tank, game: Game) {
        console.log('Created BulletWeapon');
        this.tank = tank
        this.game = game
    }

    public fire(){
        console.log('Fire bullet');
        this.game.gameObjects.push(new Bullet(this.tank))
    }
}