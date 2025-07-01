import { AnimatedSprite, Assets, Container } from "pixi.js";

export class Enemy extends Container{
    private anim: AnimatedSprite;
    private speed: number = 3;
    constructor(){
        super()
        const sprite = Assets.get('player')
        this.anim = new AnimatedSprite(sprite.animations['walk'])
        this.animationSetUp()
        this.addChild(this.anim)
    }

    private animationSetUp(){
        this.anim.tint = 'red';
        this.anim.anchor.set(0.5)
        this.anim.scale.set(1.5);
        this.anim.animationSpeed = 0.2;
        this.anim.play();
        // TODO: Spawn random
    }

    public update(playerX: number, playerY: number) {
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 1) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        } else {
            return;
        }
    }
}