import {  Sprite, Container } from "pixi.js";


export function centerObjects(...toCenter: Container[]) {
    const center = (obj: Container) => {
        obj.x = window.innerWidth / 2;
        obj.y = window.innerHeight / 2;

        if (obj instanceof Sprite) {
            obj.anchor.set(0.5);
        }
    };

    toCenter.forEach(center);
}


export function myCenter(obj: Container, otherCont?: Container){
    if (otherCont){
        obj.x = (otherCont.width - obj.width) / 2
        obj.y = (otherCont.height - obj.height) / 2
    } else{
        obj.x = (window.innerWidth - obj.width) / 2;
        obj.y = (window.innerHeight - obj.height) / 2;
    }
}