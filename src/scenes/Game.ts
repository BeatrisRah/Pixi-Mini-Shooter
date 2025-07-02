import { Container } from "pixi.js";
import { myCenter } from "../utils/misc";
import AssetLoader from "../core/AssetLoader";
import { Player } from "../objects/PLayer";
import { BoundsType } from "../utils/types";
import { LoadingScene } from "./Loading";
import { Enemy } from "../objects/Enemy";
import { Mouse } from "../core/Mouse";
import { Background } from "../objects/Background";


export class Game extends Container {
    private player!: Player
    private enemy!: Enemy;
    private bounds!: BoundsType
    private customW: number = window.innerWidth * 0.9
    private customH: number = 600;
    private mouse: Mouse = new Mouse()

    constructor(){
        super();
    }

    public async load(){
        const LoadingSceene = new LoadingScene()
        const assestLoader = new AssetLoader()
        
        this.addChild(LoadingSceene)
        await assestLoader.loadAssets()
    }

    public start(){
        this.removeChildren()

        const tillingSprite = new Background(this.customW, this.customH)

        tillingSprite.eventMode = 'static';
        tillingSprite.on('pointermove', (e) => this.mouse.mouseMove(e.getLocalPosition(tillingSprite)))
        tillingSprite.on('pointerout', () => this.mouse.mouseOut())

        
        this.position.set((window.innerWidth - this.customW) / 2, (window.innerHeight - this.customH) / 2)

        this.player = new Player()
        this.enemy = new Enemy()

        myCenter(this.player, tillingSprite)

        this.bounds = {
            x: 0,
            y: 0,
            width: tillingSprite.width,
            height: tillingSprite.height,
        }
        this.addChild(tillingSprite, this.player, this.enemy, this.mouse)
    }

    public update(){
        this.player.update(this.bounds)
        // this.enemy.update(this.player.x, this.player.y)
    }

    
}