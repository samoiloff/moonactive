import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {FieldView} from "../view/FieldView";

export class MergeTilesCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);
    protected fieldView: FieldView = dGet(FieldView);

    protected internalRun() {

    }

    guard(): boolean {
        return super.guard();
    }
}
