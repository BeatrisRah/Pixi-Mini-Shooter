import { Assets, Container, Sprite } from "pixi.js"
import { Directons } from "../utils/types";

export class Shooter {
    private container: Container;
    public projectiles: [Sprite, Directons][] = [];
    private bulletSprite: Sprite;
    private speed: number = 3.5;
    constructor(constainer: Container){
        this.container = constainer;
        this.bulletSprite = Assets.get('bullet');
    }

    public shoot(direction: Directons){
        const sprite = new Sprite(this.bulletSprite)
        sprite.x = this.container.x;
        sprite.y = this.container.y;
        this.container.parent.addChild(sprite)
        this.projectiles.push([sprite, direction])
    }

    public updateProjectiles(){
        if(this.projectiles.length === 0) return;
        this.projectiles.filter(([bullet, d]) => {
            switch(d){
                case "Up":
                    bullet.y -= this.speed;
                    break
                case "Down":
                    bullet.y += this.speed;
                    break;
                case "Right":
                    bullet.x += this.speed;
                    break;
                case "Left":
                    bullet.x -= this.speed;
                    break;
            }

            const outOfBounds = bullet.x <= 0 || bullet.x >= window.innerWidth - 100 || bullet.y < 0 || bullet.y > 600;
            if(outOfBounds){
                this.container.parent.removeChild(bullet)
                return false;
            }
            return true;
        })
    }
}