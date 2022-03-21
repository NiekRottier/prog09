import { Game } from "../game.js";
import { GameObject }   from "../gameobject.js";
import { Vector }       from "../vector.js";

export abstract class Ammunition extends GameObject{
    game: Game
    constructor(type: string, position :Vector, game: Game) {
        super(type)

        this.game = game
        this.position = position
    }

    abstract onCollision(target: GameObject): void
}