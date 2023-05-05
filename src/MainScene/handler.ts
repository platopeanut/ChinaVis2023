import {KeyboardEventTypes, Scene} from "@babylonjs/core";
import {createLights, createSkyBox, displayFPS, displayITime, displayPos} from "../game_objects/common.ts";
import {creteGround} from "../game_objects/ground.ts";
import {renderObjectFrames} from "../game_objects/GameObject.ts";
import {loadLaneRoads} from "../game_objects/laneroad.ts";
import timer from "./Timer.ts";
import GameObjectManager from "../game_objects/GameObjectManager.ts";
import CameraManager from "../game_objects/CameraManager.ts";

let isPaused = false;
const gameObjectManager: GameObjectManager = GameObjectManager.createDefault();
export let cameraManager: CameraManager;
export function onSceneReady(scene: Scene) {
    const canvas = scene.getEngine().getRenderingCanvas();
    cameraManager = new CameraManager(scene, canvas);
    // init time
    timer.baseTime = gameObjectManager.startTime / 1000 - 1000;
    timer.iTime = 22390 * 1000;
    // UI
    displayFPS(scene);
    displayPos(scene, cameraManager.mainCamera);
    displayITime(scene);
    // game objects
    createSkyBox(scene);
    createLights(scene);
    creteGround(scene);
    loadLaneRoads(scene);
    renderObjectFrames(scene);


    // 注册游戏暂停与继续
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case KeyboardEventTypes.KEYDOWN:
                if (kbInfo.event.key === " ") {
                    isPaused = !isPaused;
                }
                else if (kbInfo.event.key === "1") {
                    scene.activeCamera = cameraManager.mainCamera;
                }
                else if (kbInfo.event.key === "2") {
                    scene.activeCamera = cameraManager.followCamera;
                }
                else if (kbInfo.event.key === "ArrowLeft") {
                    timer.downRate();
                }
                else if (kbInfo.event.key === "ArrowRight") {
                    timer.upRate();
                }
                break;
        }
    });

    return scene;
}

export function onRender(scene: Scene) {
    if (!isPaused) {
        timer.tick(scene.getEngine().getDeltaTime());
        gameObjectManager.render(scene);
    }
}
