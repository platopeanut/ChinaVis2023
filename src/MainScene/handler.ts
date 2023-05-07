import {Scene} from "@babylonjs/core";
import SceneManager from "./core/SceneManager.ts";
import {loadUI} from "./ui/loadUI.ts";
import {loadEnv} from "./env/loadEnv.ts";
import {loadMap} from "./map/loadMap.ts";

export function onSceneReady(scene: Scene) {
    SceneManager.initInstance(scene);
    loadUI(scene);
    loadEnv(scene);
    loadMap(scene);
    return scene;
}
/**
 *  每帧调用，会接受一个scene，但有SceneManager就不需要了
 */
export function onRender() { SceneManager.getInstance().onRender(); }
