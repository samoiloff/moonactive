import * as PIXI from "pixi.js";
import {GameEvent} from "../constants/GameEvent";

export class LabelButton {
  container: PIXI.Container;
  spriteBg: PIXI.Sprite | PIXI.NineSlicePlane;
  label: PIXI.Text;

  private _pressed: boolean;

  constructor() {
    this.initialize();
  }

  initialize(): void {
    this.container = new PIXI.Container();
    this.container.interactiveChildren = true;

    const texture: PIXI.Texture = this.getTexture();

    this.spriteBg = new PIXI.Sprite(texture);
    this.container.addChild(this.spriteBg);

    this.label = new PIXI.Text(this.getLabel(), this.getLabelStyle());
    this.container.addChild(this.label);
    this.alignLabel();

    this.container.interactive = false;
    this.label.interactive = false;
    this.spriteBg.interactive = true;
    this.spriteBg.cursor = "pointer";
    this.spriteBg.addListener("pointerdown", this.onPointerDown, this);
  }

  getLabel(): string {
    return "LabelButton";
  }

  getLabelStyle(): PIXI.TextStyle {
    return null;
  }

  destroy(): void {
    this.container.removeAllListeners();

    this.spriteBg.destroy();
    this.spriteBg = null;
    this.label.destroy();
    this.label = null;
    this.container.destroy();
    this.container = null;
  }

  get pressed(): boolean {
    return this._pressed;
  }

  set pressed(value: boolean) {
    this._pressed = value;
    this.spriteBg.texture = this.getTexture();

  }

  getTexture(): PIXI.Texture {
    return PIXI.Texture.WHITE;
  }

  onPointerDown(): void {
    this.container.emit(GameEvent.CLICK, this);
  }

  setLabel(text: string) {
    this.label.text = text;
    this.alignLabel();
  }

  alignLabel(): void {
    this.label.x = Math.floor((this.spriteBg.width - this.label.width) / 2);
    this.label.y = Math.floor((this.spriteBg.height - this.label.height) / 2) -  2;
  }

  setWidth(width: number): void {
    this.spriteBg.scale.x = width / this.spriteBg.texture.width;
    this.alignLabel();
  }

  setHeight(height: number): void {
    this.spriteBg.scale.y = height / this.spriteBg.texture.height;
    this.alignLabel();
  }

}
