import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {gsap, Elastic, Power2} from 'gsap';

export class WinView {

    container: PIXI.Container;
    circle: PIXI.Sprite;
    text: PIXI.Sprite;

    constructor() {
        this.container = new PIXI.Container();

        this.circle = new PIXI.Sprite(ResourceUtils.getTexture(GameConstants.textures.niceWorkBg));
        this.circle.anchor.x = 0.5;
        this.circle.anchor.y = 0.5;
        this.circle.x = 525;
        this.circle.y = 915;
        this.container.addChild(this.circle);

        this.text = new PIXI.Sprite(ResourceUtils.getTexture(GameConstants.textures.niceWork));
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.x = 525;
        this.text.y = 915;
        this.container.addChild(this.text);

        this.container.visible = false;

    }

    show(): Promise<any> {
        this.container.visible = true;
        this.text.visible = false;

        return new Promise<any>((resolve) => {
            this.circle.scale.x = .1;
            this.circle.scale.y = .1;
            gsap.to(this.circle.scale, {
                x: 1,
                y: 1,
                duration: .7,
                ease: Elastic.easeOut
            });

            this.text.scale.x = .1;
            this.text.scale.y = .1;
            gsap.to(this.text.scale, {
                x: 1,
                y: 1,
                onStart: () => {
                    this.text.visible = true;
                },
                delay: .5,
                duration: .5,
                ease: Power2.easeOut,
                onComplete: () => {
                    resolve(null);
                }
            })

        })
    }

}