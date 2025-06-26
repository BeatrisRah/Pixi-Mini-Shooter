import { AnimatedSprite, Assets, Container, Spritesheet } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { Keyboard } from "../core/Keyboard";

type PlayerState = 'walk' | 'idle'

export class Player extends Container{
    private anim: AnimatedSprite;
    private keyboard: Keyboard = new Keyboard()
    private currState: PlayerState = 'idle';
    private prevState: PlayerState = 'idle';
    private playerData: Spritesheet;

    constructor(){
        super()

        this.playerData = Assets.get('player');
        this.anim = new AnimatedSprite(this.playerData.animations[this.currState])
        this.anim.scale.set(1.5)
        centerObjects(this.anim)
        this.addChild(this.anim)
        this.anim.play()
        this.anim.animationSpeed = 0.2;
    }

    public move(){
        let moving = false;

        if (this.keyboard.isDown('ArrowRight') || this.keyboard.isDown('d')){
            this.anim.scale.x = Math.abs(this.anim.scale.x); 
            this.x += 2
            moving = true;
        }

        if (this.keyboard.isDown('ArrowLeft') || this.keyboard.isDown('a')) {
            this.anim.scale.x = -Math.abs(this.anim.scale.x);
            this.x -= 2;
            moving = true;
        }

        this.currState = moving ? 'walk' : 'idle';

        if (this.currState !== this.prevState) {
        this.anim.textures = this.playerData.animations[this.currState];
        this.anim.play(); 
        
        this.prevState = this.currState;
        }
    }
}