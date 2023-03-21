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
import {GameCellOverController} from "./game/controller/GameCellOverController";
import {MergeTilesCommand} from "./game/commands/MergeTilesCommand";
import {TimerView} from "./game/view/TimerView";
import {CheckLevelCompleteCommand} from "./game/commands/CheckLevelCompleteCommand";
import {ShowWinViewComand} from "./game/commands/ShowWinViewComand";
import {ShowLooseViewCommand} from "./game/commands/ShowLooseViewCommand";
import {WinView} from "./game/view/WinView";
import {LooseView} from "./game/view/LooseView";

export function addInjections() {

    dMap(InitQueueCommand).asSingletone(); // init commands
    dMap(LoadSpriteSheetCommand).asSingletone();
    dMap(LoadFontCommand).asSingletone();
    dMap(LoadLocalizationCommand).asSingletone();

    dMap(FlowQueueCommand).asSingletone(); // game flow commands
    dMap(WaitStartButtonClickCommand).asSingletone();
    dMap(WaitCellPressedCommand).asSingletone();
    dMap(MoveTileBackCommand).asSingletone();
    dMap(MergeTilesCommand).asSingletone();
    dMap(CheckLevelCompleteCommand).asSingletone();
    dMap(ShowWinViewComand).asSingletone();
    dMap(ShowLooseViewCommand).asSingletone();

    dMap(Game).asSingletone(); // main component

    dMap(GameModel).asSingletone(); // model

    dMap(GameView).asSingletone(); // views
    dMap(FieldView).asSingletone();
    dMap(ShadowView).asSingletone();
    dMap(StartView).asSingletone();
    dMap(FieldTileView);
    dMap(FieldCellView);
    dMap(TimerView).asSingletone();
    dMap(WinView).asSingletone();
    dMap(LooseView).asSingletone();

    dMap(GameController).asSingletone(); // controllers
    dMap(GameResizeController).asSingletone();
    dMap(GameFlowQueueController).asSingletone();
    dMap(GameCellOverController).asSingletone();
}
