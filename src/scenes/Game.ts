import { Assets, Container, Graphics, Text, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";
import AssetLoader from "../core/AssetLoader";
import { Player } from "../objects/PLayer";
import { BoundsType } from "../utils/types";


export class Game extends Container {
    private player!: Player
    private bounds!: BoundsType
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

        this.x = (window.innerWidth - tillingSprite.width) / 2
        this.y = (window.innerHeight - tillingSprite.height) / 2

        this.player = new Player()

        this.player.x = (tillingSprite.width - this.player.width) / 2
        this.player.y = (tillingSprite.height - this.player.height) / 2

        this.bounds = {
            x: 0,
            y: 0,
            width: tillingSprite.width,
            height: tillingSprite.height,
        }
        this.addChild(tillingSprite, this.player)
    }

    public update(){
        this.player.move(this.bounds)
    }

    
}