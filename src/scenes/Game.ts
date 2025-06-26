import { Assets, Container, Graphics, Text, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";
import AssetLoader from "../core/AssetLoader";
import { Player } from "../objects/PLayer";


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

        const assestLoader = new AssetLoader()
        this.addChild(bg, text);
        await assestLoader.loadAssets()
    }

    public start(){
        this.removeChildren()

        const tillingSprite = new TilingSprite({
            texture: Assets.get('tiles'),
            width: window.innerWidth * 0.9,
            height: 600,
            tileScale:{ x: 1.5, y: 1.5 }
        })
        centerObjects(tillingSprite)
        tillingSprite.anchor.set(0.5)

        const player = new Player()

        this.addChild(tillingSprite, player)
    }

    
}