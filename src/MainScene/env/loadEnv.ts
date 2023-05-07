import {Scene} from "@babylonjs/core";
import {createSkyBox} from "./skybox.ts";
import {creteGround} from "./ground.ts";
import {createLights} from "./lights.ts";

export function loadEnv(scene: Scene) {
    createSkyBox(scene);
    createLights(scene);
    creteGround(scene);
}