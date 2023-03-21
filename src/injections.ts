import {dMap} from "./common/di/dMap";
import {GameModel} from "./game/model/GameModel";
import {GameView} from "./game/view/GameView";
import {GameController} from "./game/controller/GameController";
import {Game} from "./game/Game";
import {InitQueueCommand} from "./game/commands/InitQueueCommand";
import {LoadFontCommand} from "./game/commands/LoadFontCommand";
import {LoadSpriteSheetCommand} from "./game/commands/LoadSpriteSheetCommand";
import {GameResizeController} from "./game/controller/GameResizeController";
import {LoadLocalizationCommand} from "./game/commands/LoadLocalizationCommand";
import {WaitStartButtonClickCommand} from "./game/commands/WaitStartButtonClickCommand";
import {FlowQueueCommand} from "./game/commands/FlowQueueCommand";
import {GameFlowQueueController} from "./game/controller/GameFlowQueueController";
import {FieldView} from "./game/view/FieldView";
import {FieldTileView} from "./game/view/FieldTileView";
import {FieldCellView} from "./game/view/FieldCellView";
import {ShadowView} from "./game/view/ShadowView";
import {StartView} from "./game/view/StartView";
import {WaitCellPressedCommand} from "./game/commands/WaitCellPressedCommand";
import {MoveTileBackCommand} from "./game/commands/MoveTileBackCommand";

export function addInjections() {

    dMap(InitQueueCommand).asSingletone();
    dMap(LoadSpriteSheetCommand).asSingletone();
    dMap(LoadFontCommand).asSingletone();
    dMap(LoadLocalizationCommand).asSingletone();
    dMap(WaitStartButtonClickCommand).asSingletone();
    dMap(FlowQueueCommand).asSingletone();
    dMap(GameModel).asSingletone();
    dMap(GameView).asSingletone();
    dMap(GameController).asSingletone();
    dMap(Game).asSingletone();
    dMap(GameResizeController).asSingletone();
    dMap(GameFlowQueueController).asSingletone();
    dMap(FieldView).asSingletone();
    dMap(ShadowView).asSingletone();
    dMap(StartView).asSingletone();
    dMap(FieldTileView);
    dMap(FieldCellView);
    dMap(WaitCellPressedCommand).asSingletone();
    dMap(MoveTileBackCommand).asSingletone();



}
