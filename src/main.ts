import '../public/stylesheet.css'
import {addInjections} from "./injections";
import {dGet} from "./common/di/dGet";
import {Game} from "./game/Game";


addInjections();
dGet(Game);
