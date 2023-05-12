import {
    Axis, Color3,
    Mesh,
    MeshBuilder, Scene,
    Space, StandardMaterial, Texture,
    Vector4
} from "@babylonjs/core";

export function creteGround(scene: Scene) {
    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture("/assets/textures/grass.jpg", scene);
    groundMaterial.diffuseTexture.wrapU = Texture.WRAP_ADDRESSMODE;
    groundMaterial.diffuseTexture.wrapV = Texture.WRAP_ADDRESSMODE;
    groundMaterial.bumpTexture = new Texture("/assets/textures/grass_normal.jpg", scene);
    groundMaterial.bumpTexture.wrapU = Texture.WRAP_ADDRESSMODE;
    groundMaterial.bumpTexture.wrapV = Texture.WRAP_ADDRESSMODE;
    groundMaterial.roughness = 0.1;
    groundMaterial.specularColor = new Color3(0, 0, 0);
    const size = 2000;
    const ground = MeshBuilder.CreatePlane("ground", {
        width: size,
        height: size,
        frontUVs: new Vector4(0, 0, size / 2, size / 2),
        sideOrientation: Mesh.DOUBLESIDE
    }, scene);
    ground.rotate(Axis.X, Math.PI / 2, Space.WORLD);
    ground.position.y = -10;
    ground.material = groundMaterial;
    return ground;
}