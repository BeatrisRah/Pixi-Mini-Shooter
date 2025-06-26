import { AnimatedSprite, Assets, Container } from "pixi.js";
import { centerObjects } from "../utils/misc";

type PlayerState = 'walk' | 'idle'

export class Player extends Container{
    private anim: AnimatedSprite;
    // private spriteSheet:
    private currState: PlayerState = 'idle';

    constructor(){
        super()

        const playerData = Assets.get('player');
        
        this.anim = new AnimatedSprite(playerData.animations[this.currState])
        this.anim.scale.set(1.5)
        centerObjects(this.anim)
        this.addChild(this.anim)
        this.anim.play()
        this.anim.animationSpeed = 0.2
    }
}