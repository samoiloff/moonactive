import * as PIXI from "pixi.js";
import {TileId} from "../constants/TileId";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {gsap} from "gsap";

export class FieldTileView {

    container: PIXI.Sprite;

    x: number;
    y: number;
    tileId: TileId;

    merged: boolean;

    constructor() {
        this.container = new PIXI.Sprite();
    }

    setTileId(tileId: TileId): void {
        this.tileId = tileId;
        this.container.texture = ResourceUtils.getTexture(this.getTextureId());
        this.container.anchor.x = .5;
        this.container.anchor.y = .5;
    }

    protected getTextureId(): string {
        switch (this.tileId) {
            case TileId.BLUE:
                return GameConstants.textures.tileBlue;
            case TileId.RED:
                return GameConstants.textures.tileRed;
            case TileId.GREEN:
                return GameConstants.textures.tileGreen;
            case TileId.PINK:
                return GameConstants.textures.tilePink;
            case TileId.ORANGE:
                return GameConstants.textures.tileOrange;
            case TileId.YELLOW:
                return GameConstants.textures.tileYellow;
            default:
                throw new Error('Texture not found');
        }
    }

    destroy(): void {
        gsap.killTweensOf(this.container);
        this.container.destroy();
        this.container = null;
    }

}
