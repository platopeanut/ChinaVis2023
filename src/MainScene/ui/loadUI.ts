import {Scene} from "@babylonjs/core";
import {displayFPS} from "./uiFPS.ts";
import {displayPos} from "./uiCamPos.ts";
import {displayITime} from "./uiTime.ts";

export function loadUI(scene: Scene) {
    displayFPS(scene);
    displayPos(scene);
    displayITime(scene);
}