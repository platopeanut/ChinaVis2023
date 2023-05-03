import {
    Camera,
    Color3,
    CubeTexture, DirectionalLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture, Vector3
} from "@babylonjs/core";
import * as GUI from '@babylonjs/gui';
import timer from "../MainScene/Timer.ts";
import {formatDate} from "../utils/datetime.ts";

export function createSkyBox(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("/assets/textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
}

export function createLights(scene: Scene) {
    return new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), scene);
}

export function displayFPS(scene: Scene) {
    // Create text block to display FPS
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const textBlock = new GUI.TextBlock();
    textBlock.text = "FPS: 60";
    textBlock.color = "white";
    textBlock.fontSize = 20;
    const rect = new GUI.Rectangle();
    rect.width = 0.1;
    rect.height = "40px";
    rect.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rect.addControl(textBlock);
    advancedTexture.addControl(rect);

    // Update FPS every frame
    scene.onBeforeRenderObservable.add(function () {
        const fps = scene.getEngine().getFps().toFixed();
        textBlock.text = "FPS: " + fps;
    });
}

export function displayPos(scene: Scene, camera: Camera) {
    // Create text block to display FPS
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const textBlock = new GUI.TextBlock();
    textBlock.text = "(0, 0, 0)";
    textBlock.color = "white";
    textBlock.fontSize = 20;
    const rect = new GUI.Rectangle();
    rect.width = 0.15;
    rect.height = "40px";
    rect.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rect.addControl(textBlock);
    advancedTexture.addControl(rect);

    // Update FPS every frame
    scene.onBeforeRenderObservable.add(function () {
        textBlock.text = `(${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`;
    });
}

export function displayITime(scene: Scene) {
    // Create text block to display FPS
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const textBlock = new GUI.TextBlock();
    textBlock.text = "iTime: 0";
    textBlock.color = "white";
    textBlock.fontSize = 20;
    const rect = new GUI.Rectangle();
    rect.width = 0.2;
    rect.height = "60px";
    rect.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rect.addControl(textBlock);
    advancedTexture.addControl(rect);

    // Update FPS every frame
    scene.onBeforeRenderObservable.add(function () {
        textBlock.text = `iTime: ${(timer.iTime / 1000).toFixed(2)}`
            + `\n${formatDate(timer.iDate, true)}`;
    });
}
