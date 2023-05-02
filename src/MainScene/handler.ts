import {Scene, Vector3} from "@babylonjs/core";
import {createLights, createSkyBox, displayFPS, displayPos} from "../game_objects/common.ts";
import {createCamera} from "./camera.ts";
import {creteGround} from "../game_objects/ground.ts";
import {renderObjectFrames} from "../game_objects/car.ts";
import {loadLaneRoads} from "../game_objects/laneroad.ts";

export function onSceneReady(scene: Scene) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const camera = createCamera(scene);
    camera.position = new Vector3(0, 10, 0);
    camera.attachControl(canvas, true);
    displayFPS(scene);
    displayPos(scene, camera);
    // game objects
    createSkyBox(scene);
    createLights(scene);
    creteGround(scene);
    loadLaneRoads(scene);
    renderObjectFrames(scene);

    return scene;
}

export function onRender(scene: Scene) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    console.log(deltaTimeInMillis);
}
