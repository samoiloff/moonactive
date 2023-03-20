import * as PIXI from "pixi.js";
import {ISizeVO} from "../interfaces/ISizeVO";
import {IRectVO} from "../interfaces/IRectVO";
export class LayoutUtils {

    static fitRectIn(
        container: PIXI.Container,
        fitSize: ISizeVO | IRectVO = null,
        containerSize: ISizeVO = null,
        minScale: number = -1,
        maxScale: number = -1
    ): void {
        // align screen to game
        if (fitSize && containerSize) {
            const scaleX: number = fitSize.width / containerSize.width;
            const scaleY: number = fitSize.height / containerSize.height;
            let scale: number = Math.min(scaleX, scaleY);
            if (minScale >= 0) {
                scale = Math.max(scale, minScale);
            }
            if (maxScale >= 0) {
                scale = Math.min(scale, maxScale);
            }

            container.scale.x = container.scale.y = scale;
            container.x = Math.floor((fitSize.width - containerSize.width * scale) / 2);
            container.y = Math.floor((fitSize.height - containerSize.height * scale) / 2);

            const fitRect: IRectVO = fitSize as IRectVO;
            if (fitRect.posX) {
                container.x += fitRect.posX;
            }
            if (fitRect.posY) {
                container.y += fitRect.posY;
            }
        } else {
            container.scale.x = container.scale.y = 1;
            container.x = container.y = 0;
        }
    }

    sizeToRect(size: ISizeVO): IRectVO {
        return {
            posX: 0,
            posY: 0,
            width: size.width,
            height: size.height
        };
    }

    drawBorder(
        graphics: PIXI.Graphics,
        sizeVO: ISizeVO | IRectVO,
        space: number = 0,
        lineWidth: number = 1,
        color: number = 0x118811): PIXI.Graphics {

        graphics.lineStyle(lineWidth, color);
        const rectVO: IRectVO = sizeVO as IRectVO;
        const posX: number = rectVO.posX ? rectVO.posX : 0;
        const posY: number = rectVO.posY ? rectVO.posY : 0;
        graphics.drawRect(posX + space, posY + space, sizeVO.width - 2 * space, sizeVO.height - 2 * space);
        return graphics;
    }

}
