import {dMap} from "./common/di/dMap";
import {GameModel} from "./game/model/GameModel";
import {GameView} from "./game/view/GameView";
import {GameController} from "./game/controller/GameController";
import {Game} from "./game/Game";
import {InitQueueCommand} from "./game/commands/InitQueueCommand";
import {LoadFontCommand} from "./game/commands/LoadFontCommand";
import {LoadSpriteSheetCommand} from "./game/commands/LoadSpriteSheetCommand";
import {GameResizeController} from "./game/controller/GameResizeController";

export function addInjections() {

    dMap(InitQueueCommand).asSingletone();
    dMap(LoadSpriteSheetCommand).asSingletone();
    dMap(LoadFontCommand).asSingletone();
    dMap(GameModel).asSingletone();
    dMap(GameView).asSingletone();
    dMap(GameController).asSingletone();
    dMap(Game).asSingletone();
    dMap(GameResizeController).asSingletone();



}
