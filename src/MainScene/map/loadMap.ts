import {Scene} from "@babylonjs/core";
import {loadLaneRoads} from "./laneroad.ts";

export async function loadMap(scene: Scene) {
    await loadLaneRoads(scene);
}
