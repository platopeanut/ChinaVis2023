import {Scene} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

export function displayPos(scene: Scene) {
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
        const camera = scene.activeCamera;
        if (camera === null) throw new Error('No Camera!');
        textBlock.text = `(${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`;
    });
}