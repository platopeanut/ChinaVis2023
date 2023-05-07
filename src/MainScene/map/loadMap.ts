import {Scene} from "@babylonjs/core";
import {loadLaneRoads} from "./laneroad.ts";

export function loadMap(scene: Scene) {
    loadLaneRoads(scene);
}
