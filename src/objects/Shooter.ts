import { Assets, Container, Point, Sprite } from "pixi.js"

export class Shooter {
    private container: Container;
    public projectiles: [Sprite, {vx: number, vy: number}][] = [];
    private bulletSprite: Sprite;
    private speed: number = 4.5;
    constructor(constainer: Container){
        this.container = constainer;
        this.bulletSprite = Assets.get('bullet');
    }

    public shoot(target: Point, currPosition: {x: number, y: number }){
        const sprite = new Sprite(this.bulletSprite)
        sprite.anchor.set(0.5)
        sprite.x = this.container.x;
        sprite.y = this.container.y;
        
        const dx = target.x - currPosition.x;
        const dy = target.y - currPosition.y;
        const angle = Math.atan2(dy, dx);
        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;
        
        this.container.parent.addChild(sprite);
        this.projectiles.push([sprite, {vx, vy}])
    }

    public updateProjectiles(){
        if(this.projectiles.length === 0) return;
        this.projectiles.filter(([bullet, d]) => {
            bullet.x += d.vx;
            bullet.y += d.vy;
            const outOfBounds = bullet.x <= 0 || bullet.x >= window.innerWidth - 100 || bullet.y < 0 || bullet.y > 600;
            if(outOfBounds){
                this.container.parent.removeChild(bullet)
                return false;
            }
            return true;
        })
    }
}