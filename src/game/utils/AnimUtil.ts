import * as PIXI from "pixi.js";
import {gsap, Back} from "gsap";

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


    public static fadeIn(container: PIXI.DisplayObject, duration: number = .5, delay: number = 0): Promise<any> {
        return new Promise<any>((resolve) => {
            container.alpha = 0;
            container.visible = true;
            gsap.to(container, {
                alpha: 1,
                duration,
                delay,
                ease: Back.easeOut,
                onComplete: () => {
                    resolve(null);
                }
            });
        });
    }

    public static fadeOut(container: PIXI.DisplayObject, duration: number = .5, delay: number = 0): Promise<any> {
        return new Promise<any>((resolve) => {
            gsap.to(container, {
                alpha: 0,
                duration,
                delay,
                ease: Back.easeOut,
                onComplete: () => {
                    container.alpha = 0;
                    container.visible = false;
                    resolve(null);
                }
            });
        });
    }
}
