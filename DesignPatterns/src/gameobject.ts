import { Vector } from "./vector.js"

export abstract class GameObject{
    // Fields 
    protected div       : HTMLElement
    protected position  : Vector = new Vector(0, 0)
    protected rotation  : number = 0
    
    // Properties
    public get Position()   : Vector    { return this.position }
    public get Rotation()   : number    { return this.rotation }
    

    public get width()  : number    { return this.div.clientWidth  }
    public get height() : number    { return this.div.clientHeight }

    constructor(tag : string) {
        this.div = document.createElement(tag)



        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)
    }

    public update() : void {
        this.draw()
    }

    protected draw() {
        this.div.style.transform = `translate(${this.position.x - this.width/2}px, ${this.position.y - this.height/2}px) rotate(${this.rotation}deg)`
    }

    public hasCollision(gameobject : GameObject) : boolean {
        return (this.position.x < gameobject.position.x + gameobject.width &&
                this.position.y < gameobject.position.y + gameobject.height &&
                this.position.x + this.width    > gameobject.position.x &&
                this.position.y + this.height   > gameobject.position.y)
    }

    abstract onCollision(target: GameObject): void
}