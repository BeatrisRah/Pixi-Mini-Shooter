import { Application } from "pixi.js";
import { Game } from "../scenes/Game";

export class PixiApp extends Application {
    private game: Game
    constructor() {
        super()   
        this.game = new Game()
    }

    public async begin(){
        await this.init({
            resizeTo:window, 
            background:'#0e1111'})

        this.stage.addChild(this.game)
        this.game.start()

        //if assest load 
        
        document.body.appendChild(this.canvas)
    }

    
}