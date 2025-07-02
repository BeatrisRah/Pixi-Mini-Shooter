import { Assets, TilingSprite } from "pixi.js";

export class Background extends TilingSprite{
    constructor(width: number, height: number){
        super({
            texture: Assets.get('tiles'),
            width: width,
            height: height,
            tileScale:{ x: 1.5, y: 1.5 }
        })
    }
}