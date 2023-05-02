import {Color3, MeshBuilder, Scene, StandardMaterial} from "@babylonjs/core";

export function creteGround(scene: Scene) {
    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new Color3(70 / 255, 127 / 255, 34 / 255);
    groundMaterial.specularColor = new Color3(0, 0, 0);
    const ground = MeshBuilder.CreateGround("ground", {
        width: 1000, height: 1000
    }, scene);
    ground.material = groundMaterial;
    return ground;
}