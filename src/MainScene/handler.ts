import {Scene} from "@babylonjs/core";
import {createLights, createSkyBox} from "../game_objects/common.ts";
import {createCamera} from "./camera.ts";
import {loadLaneRoads} from "../game_objects/laneroad.ts";
import {creteGround} from "../game_objects/ground.ts";

export function onSceneReady(scene: Scene) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const camera = createCamera(scene);
    camera.attachControl(canvas, true);
    // game objects
    createSkyBox(scene);
    createLights(scene);
    creteGround(scene);
    loadLaneRoads(scene);
}

export function onRender(scene: Scene) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    console.log(deltaTimeInMillis);
}
