import { Container, Graphics, Text } from "pixi.js";
import { centerObjects } from "../utils/misc";


export class LoadingScene extends Container{
    private bg: Graphics;
    private text: Text;

    constructor(){
        super()
        this.bg = new Graphics().rect(0, 0, window.innerWidth, window.innerHeight).fill('#353935')
        this.text = new Text({ 
            text: "Loading...", 
            style:{
                fontFamily: "Verdana",
                fontSize: 50,
                fill: "white",
            }
        });
        this.text.resolution = 2;

        centerObjects(this.text)
        this.text.anchor.set(0.5)
        this.addChild(this.bg, this.text);
    }
}