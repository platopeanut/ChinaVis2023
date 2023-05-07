import {Scene} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

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