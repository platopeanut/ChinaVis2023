import {Scene, UniversalCamera, Vector3} from "@babylonjs/core";

export function createCamera(scene: Scene) {
    const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 0, -10), scene);
    camera.angularSensibility = 4000;
    camera.keysUp = ['W'.charCodeAt(0)];
    camera.keysDown = ['S'.charCodeAt(0)];
    camera.keysLeft = ['A'.charCodeAt(0)];
    camera.keysRight = ['D'.charCodeAt(0)];
    camera.keysUpward = ['Q'.charCodeAt(0)];
    camera.keysDownward = ['E'.charCodeAt(0)];
    return camera;
}