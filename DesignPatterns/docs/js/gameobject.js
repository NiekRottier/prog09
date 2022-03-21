import { Vector } from "./vector.js";
export class GameObject {
    constructor(tag) {
        this.position = new Vector(0, 0);
        this.rotation = 0;
        this.div = document.createElement(tag);
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
    }
    get Position() { return this.position; }
    get Rotation() { return this.rotation; }
    get width() { return this.div.clientWidth; }
    get height() { return this.div.clientHeight; }
    update() {
        this.draw();
    }
    draw() {
        this.div.style.transform = `translate(${this.position.x - this.width / 2}px, ${this.position.y - this.height / 2}px) rotate(${this.rotation}deg)`;
    }
    hasCollision(gameobject) {
        return (this.position.x < gameobject.position.x + gameobject.width &&
            this.position.y < gameobject.position.y + gameobject.height &&
            this.position.x + this.width > gameobject.position.x &&
            this.position.y + this.height > gameobject.position.y);
    }
}
