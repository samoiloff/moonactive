import * as PIXI from "pixi.js";
import {StartButton} from "../components/StartButton";
export class StartView {

    container: PIXI.Container;

    button: StartButton;

    constructor() {
        this.container = new PIXI.Container();

        this.button = new StartButton();
        this.container.addChild(this.button.container);
    }

}
