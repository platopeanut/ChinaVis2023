import {Scene} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import {formatDate} from "../utils/datetime.ts";
import SceneManager from "../core/SceneManager.ts";

export function displayITime(scene: Scene) {
    // Create text block to display FPS
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const textBlock = new GUI.TextBlock();
    textBlock.text = "iTime: 0";
    textBlock.color = "white";
    textBlock.fontSize = 20;
    const rect = new GUI.Rectangle();
    rect.width = 0.2;
    rect.height = "80px";
    rect.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rect.addControl(textBlock);
    advancedTexture.addControl(rect);

    // Update FPS every frame
    scene.onBeforeRenderObservable.add(function () {
        const timer = SceneManager.getInstance().timer;
        textBlock.text = `iTime: ${(timer.iTime / 1000).toFixed(2)}`
            + `\n${formatDate(timer.iDate, true)}`
            + `\nrate: ${timer.rate.toFixed(2)}`;
    });
}