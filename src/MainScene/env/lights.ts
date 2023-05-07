import {DirectionalLight, Scene, Vector3} from "@babylonjs/core";

export function createLights(scene: Scene) {
    return new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), scene);
}
