import {
    Color3,
    Material,
    Mesh,
    MeshBuilder,
    Scene,
    Space,
    StandardMaterial,
    Texture,
    Vector3,
    Vector4
} from "@babylonjs/core";
import {FeatureCollection, LaneRoadProperties} from "./types.ts";
import {xyzToVector3} from "../utils/math.ts";
import {loadJson} from "../utils/util.ts";

export async function loadLaneRoads(scene: Scene) {
    const laneRoadMaterial = new StandardMaterial("laneRoadMat", scene)
    laneRoadMaterial.diffuseTexture = new Texture("/assets/textures/laneroad_texture2.jpg", scene);
    laneRoadMaterial.diffuseTexture.wrapU = Texture.WRAP_ADDRESSMODE;
    laneRoadMaterial.diffuseTexture.wrapV = Texture.WRAP_ADDRESSMODE;
    laneRoadMaterial.bumpTexture = new Texture("/assets/textures/road_normal.jpg", scene);
    laneRoadMaterial.bumpTexture.wrapU = Texture.WRAP_ADDRESSMODE;
    laneRoadMaterial.bumpTexture.wrapV = Texture.WRAP_ADDRESSMODE;
    laneRoadMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
    const featureCollection
        // = await loadJson<FeatureCollection<LaneRoadProperties>>('/data/laneroad10.json');
        = await loadJson<FeatureCollection<LaneRoadProperties>>('/data/laneroad_with9road.json');
    for (const feature of featureCollection.features) {
        const geometry = feature.geometry;
        console.assert(geometry.type === "LineString");
        // 1.Only Head and Tail
        // xyz => xzy 在场景中使用y轴作为高度
        const p1 = xyzToVector3(geometry.coordinates[0]);
        const p2 = xyzToVector3(geometry.coordinates[geometry.coordinates.length - 1]);
        createLaneRoadSeg(p1, p2, 3.0, laneRoadMaterial, scene);

        // 2.All
        // for (let i = 0; i < geometry.coordinates.length - 1; i++) {
        //     // xyz => xzy 在场景中使用y轴作为高度
        //     const p1 = new Vector3(
        //         geometry.coordinates[i][0],
        //         geometry.coordinates[i][2],
        //         geometry.coordinates[i][1],
        //     );
        //     const p2 = new Vector3(
        //         geometry.coordinates[i + 1][0],
        //         geometry.coordinates[i + 1][2],
        //         geometry.coordinates[i + 1][1],
        //     );
        //     createLaneRoadSeg(p1, p2, 3.0, laneRoadMaterial, scene);
        // }
    }
}

/**
 * 注意：当p1-p2与y轴垂直，无法确定平面
 * @param p1
 * @param p2
 * @param width
 * @param material
 * @param scene
 */
function createLaneRoadSeg(p1: Vector3, p2: Vector3, width: number, material: Material, scene: Scene) {
    const height = Vector3.Distance(p1, p2);
    const horizontal = Vector3.Normalize(Vector3.Cross(p2.subtract(p1), Vector3.Up()));
    const vertical = Vector3.Normalize(p2.subtract(p1));
    const center = p1.add(p2).scale(0.5);

    const plane = MeshBuilder.CreatePlane(
        "plane",
        {
            width: width,
            height: height,
            frontUVs: new Vector4(0, 0, 1, height / 10),
            sideOrientation: Mesh.DOUBLESIDE
        },
        scene
    );
    const vAxis = Vector3.Cross(Vector3.Right(), horizontal);
    if (vAxis.length() !== 0)
        plane.rotate(
            vAxis,
            Math.acos(Vector3.Dot(
                horizontal,
                Vector3.Right()
            )),
            Space.WORLD
        );
    const hAxis = Vector3.Cross(Vector3.Up(), vertical);
    if (hAxis.length() !== 0)
        plane.rotate(
            hAxis,
            -Math.acos(Vector3.Dot(
                vertical,
                Vector3.Up()
            )),
            Space.WORLD
        );
    plane.position = center;
    plane.material = material;
    return plane;
}

// function createLineRoadSeg(p1: Vector3, p2: Vector3, width: number, scene: Scene) {
//     const horizontal = Vector3.Normalize(Vector3.Cross(p2.subtract(p1), Vector3.Up()));
//     const height = Vector3.Distance(p1, p2);
//     const center = Vector3.Lerp(p1, p2, 0.5);
//     const rectangle = MeshBuilder.CreatePlane(
//         "rectangle",
//         {
//             width: width,
//             height: height
//         },
//         scene
//     );
//     rectangle.position = center;
//     const angle = Vector3.Dot(
//         Vector3.Normalize(p2.subtract(p1)),
//         Vector3.Cross(horizontal, Vector3.Up())
//     );
//     rectangle.rotate(horizontal, angle, Space.WORLD);
//
//     const minZ = 11.6226463165;
//     const maxZ = 12.6294399872;
//     const material = new StandardMaterial("color", scene);
//     material.diffuseColor = new Color3((center.z - minZ) / (maxZ - minZ), 1.0, 1.0); // 设置为红色
//     rectangle.material = material;
//     return rectangle;
// }

