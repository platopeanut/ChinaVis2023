import {FollowCamera, KeyboardEventTypes, Scene, Vector3} from "@babylonjs/core";
import {createLights, createSkyBox, displayFPS, displayITime, displayPos} from "../game_objects/common.ts";
import {createCamera} from "./camera.ts";
import {creteGround} from "../game_objects/ground.ts";
import {GameObject, renderObjectFrames} from "../game_objects/car.ts";
import {loadLaneRoads} from "../game_objects/laneroad.ts";
import timer from "./Timer.ts";

let isPaused = false;
const car = GameObject.CreateDefault();

export function onSceneReady(scene: Scene) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const followCamera = new FollowCamera("FollowCam", new Vector3(-10, 10, 0), scene);
    const mainCamera = createCamera(scene);
    mainCamera.position = new Vector3(35, 111, -135);
    mainCamera.attachControl(canvas, true);
    scene.activeCamera = mainCamera;
    // init time
    timer.baseTime = 1681316063099694 / 1000 - 3000;
    // UI
    displayFPS(scene);
    displayPos(scene, mainCamera);
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
                    scene.activeCamera = mainCamera;
                }
                else if (kbInfo.event.key === "2") {
                    followCamera.lockedTarget = car.box;
                    followCamera.radius = 20;
                    followCamera.heightOffset = 10;
                    followCamera.rotationOffset = 0;
                    followCamera.cameraAcceleration = 0.05;
                    followCamera.maxCameraSpeed = 20;
                    scene.activeCamera = followCamera;
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
        car.render(scene);
    }
}
