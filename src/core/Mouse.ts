import { Graphics, Point } from "pixi.js";

export class Mouse extends Graphics{
    constructor(){
        super()
        this.circle(0, 0, 10).fill('#1f4ced');
        this.visible = false;
    }
    
    public mouseMove(poins: Point){
        this.visible = true;
        this.x = poins.x;
        this.y = poins.y;
    }

    public mouseOut(){
        this.visible = false;
    }
}