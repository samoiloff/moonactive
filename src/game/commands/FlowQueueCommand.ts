import {PersistentCommandQueue} from "../../common/commands/PersistentCommandQueue";
import {dGet} from "../../common/di/dGet";
import {WaitStartButtonClickCommand} from "./WaitStartButtonClickCommand";
import {WaitCellPressedCommand} from "./WaitCellPressedCommand";
import {MoveTileBackCommand} from "./MoveTileBackCommand";
import {MergeTilesCommand} from "./MergeTilesCommand";
import {CheckLevelCompleteCommand} from "./CheckLevelCompleteCommand";
import {ShowWinViewComand} from "./ShowWinViewComand";
import {ShowLooseViewCommand} from "./ShowLooseViewCommand";

export class FlowQueueCommand extends PersistentCommandQueue {

    startTurnCommand: WaitCellPressedCommand;
    looseViewCommand: ShowLooseViewCommand;

    constructor() {
        super();
        this.add(dGet(WaitStartButtonClickCommand));
        this.startTurnCommand = dGet(WaitCellPressedCommand);
        this.add(this.startTurnCommand);
        this.add(dGet(MoveTileBackCommand));
        this.add(dGet(MergeTilesCommand));
        this.add(dGet(CheckLevelCompleteCommand));
        this.add(dGet(ShowWinViewComand));
        this.looseViewCommand = dGet(ShowLooseViewCommand);
        this.add(this.looseViewCommand);
    }

}
