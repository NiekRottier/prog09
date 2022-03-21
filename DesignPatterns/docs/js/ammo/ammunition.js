import { GameObject } from "../gameobject.js";
export class Ammunition extends GameObject {
    constructor(type, position, game) {
        super(type);
        this.game = game;
        this.position = position;
    }
}
