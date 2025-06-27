import { Application } from "pixi.js";
import { Game } from "../scenes/Game";
import { initDevtools } from "@pixi/devtools";

export class PixiApp extends Application {
    private game: Game
    constructor() {
        super()   
        this.game = new Game()
    }

    public async begin(){
        await this.init({
            resizeTo:window, 
            background:'#0e1111'});
        
        document.body.appendChild(this.canvas);
        
        this.stage.addChild(this.game);

        await this.game.load();
        
        this.game.start()

        this.ticker.add(() => this.game.update())

        initDevtools({app:this})
    }

    
}