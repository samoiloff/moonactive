import * as PIXI from "pixi.js";
import {gsap, Back, Power2} from "gsap";

export class AnimUtil {

    public static setVisible(container: PIXI.DisplayObject, value: boolean, instant: boolean = false): Promise<any> {
        if (instant) {
            if (value) {
                container.alpha = 1;
                container.visible = true;
            } else {
                container.alpha = 0;
                container.visible = false;
            }
            return Promise.resolve();
        } else {
            if (value) {
                return AnimUtil.fadeIn(container);
            } else {
                return AnimUtil.fadeOut(container);
            }
        }
    }

    public static scaleDown(container: PIXI.DisplayObject, duration: number = .5, delay: number = 0): Promise<any> {
        return new Promise<any>((resolve) => {
            gsap.killTweensOf(container, "x,y");
            gsap.to(container.scale, {
                x: 0,
                y: 0,
                duration,
                delay,
                ease: Power2.easeOut,
                onComplete: () => {
                    container.visible = false;
                    resolve(null);
                }
            });
        });
    }


    public static fadeIn(container: PIXI.DisplayObject, duration: number = .5, delay: number = 0): Promise<any> {
        return new Promise<any>((resolve) => {
            container.alpha = 0;
            container.visible = true;
            gsap.killTweensOf(container, "alpha");
            gsap.to(container, {
                alpha: 1,
                duration,
                delay,
                ease: Power2.easeOut,
                onComplete: () => {
                    resolve(null);
                }
            });
        });
    }

    public static fadeOut(container: PIXI.DisplayObject, duration: number = .5, delay: number = 0): Promise<any> {
        return new Promise<any>((resolve) => {
            gsap.killTweensOf(container, "alpha");
            gsap.to(container, {
                alpha: 0,
                duration,
                delay,
                ease: Power2.easeOut,
                onComplete: () => {
                    container.alpha = 0;
                    container.visible = false;
                    resolve(null);
                }
            });
        });
    }
}
