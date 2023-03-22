import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {Elastic, gsap, Power2} from 'gsap';
import {TryAgainButton} from "../components/TryAgainButton";
import {OrientatedViewBase} from "./OrientatedViewBase";

export class LooseView extends OrientatedViewBase{

    container: PIXI.Container;
    circle: PIXI.Sprite;
    text: PIXI.Sprite;
    btn: TryAgainButton;

    initialize() {
        this.container = new PIXI.Container();

        this.circle = new PIXI.Sprite(ResourceUtils.getTexture(GameConstants.textures.failBg));
        this.circle.anchor.x = 0.5;
        this.circle.anchor.y = 0.5;

        this.container.addChild(this.circle);

        this.text = new PIXI.Sprite(ResourceUtils.getTexture(GameConstants.textures.fail));
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.container.addChild(this.text);

        this.btn = new TryAgainButton();

        this.container.addChild(this.btn.container);

        this.container.visible = false;

        super.initialize();
    }

    portraitLayout() {
        this.circle.x = 525;
        this.circle.y = 915;

        this.text.x = 525;
        this.text.y = 915;

        this.btn.container.x = 165;
        this.btn.container.y = 1625;
    }

    landscapeLayout() {
        this.circle.x = 980;
        this.circle.y = 450;

        this.text.x = 980;
        this.text.y = 450;

        this.btn.container.x = 582;
        this.btn.container.y = 762;
    }

    show(): Promise<any> {
        this.container.visible = true;
        this.container.alpha = 1;
        this.text.visible = false;
        this.btn.container.visible = false;
        this.btn.container.alpha = 0;
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
                ease: Power2.easeOut
            })

            gsap.to(this.btn.container, {
                alpha: 1,
                onStart: () => {
                    this.btn.container.visible = true;
                },
                delay: .6,
                duration:.5,
                ease: Power2.easeOut,
                onComplete: () => {
                    resolve(null);
                }
            })

        })
    }

}
