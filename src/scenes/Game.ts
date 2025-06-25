import { Container, Graphics, Text } from "pixi.js";
import { centerObjects } from "../utils/misc";


export class Game extends Container {

    constructor(){
        super();

    }

    public async load(){
        const bg = new Graphics().rect(0, 0, window.innerWidth, window.innerHeight).fill('#353935')
        const text = new Text({ 
            text: "Loading...", 
            style:{
                fontFamily: "Verdana",
                fontSize: 50,
                fill: "white",
            }
        });
        text.resolution = 2;

        centerObjects(text)
        text.anchor.set(0.5)

        this.addChild(bg, text);

    }

    public start(){
        

    }

    
}