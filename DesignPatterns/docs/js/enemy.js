import { GameObject } from "./gameobject.js";
import { Bullet } from "./projectiles/bullet.js";
import { Missile } from "./projectiles/missile.js";
import { Rocket } from "./projectiles/rocket.js";
export class Enemy extends GameObject {
    constructor(game, type, position, player) {
        super(type);
        this.speed = 1;
        this.game = game;
        this.type = type;
        this.player = player;
        this.position = position;
    }
    update() {
        this.position = this.position.add(this.position.getDirectionToObject(this.player).scale(this.speed));
        this.rotation = this.position.getDirectionToObject(this.player).angle();
        super.update();
    }
    onCollision(target) {
        if (target instanceof Bullet && this.type == "enemy-light" ||
            target instanceof Rocket && this.type == "enemy-medium" ||
            target instanceof Missile && this.type == "enemy-heavy") {
            let index = this.game.gameObjects.indexOf(this);
            if (index > -1) {
                this.game.gameObjects.splice(index, 1);
            }
            this.div.remove();
        }
    }
}
