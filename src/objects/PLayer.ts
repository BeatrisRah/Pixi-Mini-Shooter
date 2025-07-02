import { AnimatedSprite, Assets, Container, Spritesheet } from "pixi.js";
import { Keyboard } from "../core/Keyboard";
import { BoundsType } from "../utils/types";
import { Shooter } from "./Shooter";
type PlayerState = 'walk' | 'idle'


export class Player extends Container {
    private anim: AnimatedSprite;
    private keyboard: Keyboard = new Keyboard()
    private currState: PlayerState = 'idle';
    private prevState: PlayerState = 'idle';
    private playerData: Spritesheet;
    public shooter: Shooter = new Shooter(this);
    private speed: number = 3;

    constructor() {
        super()
        this.playerData = Assets.get('player');
        this.anim = new AnimatedSprite(this.playerData.animations[this.currState])
        this.animationSetup()
        this.addChild(this.anim)
        
    }

    private animationSetup(){
        this.anim.scale.set(1.5)
        this.anim.anchor.set(0.5)
        this.anim.animationSpeed = 0.2;
        this.anim.play()
    }

    public move(bounds:BoundsType) {
        let moving = false;
        let currSpeed = this.speed;

        if (this.keyboard.isDown('Shift')) {
            currSpeed += 1.5;
        }

        if (this.keyboard.isDown('ArrowRight') || this.keyboard.isDown('d')) {
            this.anim.scale.x = Math.abs(this.anim.scale.x);
            this.x += currSpeed;
            moving = true;
        }

        if (this.keyboard.isDown('ArrowLeft') || this.keyboard.isDown('a')) {
            this.anim.scale.x = -Math.abs(this.anim.scale.x);
            this.x -= currSpeed;
            moving = true;
        }

        if (this.keyboard.isDown('ArrowUp') || this.keyboard.isDown('w')) {
            this.y -= currSpeed;
            moving = true;
        }

        if (this.keyboard.isDown('ArrowDown') || this.keyboard.isDown('s')) {
            this.y += currSpeed;
            moving = true;
        }

        const halfW = this.width / 2;
        const halfH = this.height / 2;

        this.x = Math.max(bounds.x + halfW, Math.min(this.x, bounds.x + bounds.width - halfW));
        this.y = Math.max(bounds.y + halfH, Math.min(this.y, bounds.y + bounds.height - halfH));

        this.currState = moving ? 'walk' : 'idle';

        if (this.currState !== this.prevState) {
            this.anim.textures = this.playerData.animations[this.currState];
            this.anim.play();

            this.prevState = this.currState;
        }
        
    }


    update(bounds: BoundsType){
        this.move(bounds)
        this.keyboard.update()
        this.shooter.updateProjectiles()
    }
}