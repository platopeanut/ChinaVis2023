import {
    Color3,
    CubeTexture,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3
} from "@babylonjs/core";

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
    return new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
}