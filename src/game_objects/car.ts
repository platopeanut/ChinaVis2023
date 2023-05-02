import paths from "../../data/small_piece.json";
import {
    Axis,
    AxisDragGizmo,
    Color3,
    MeshBuilder,
    Scene,
    Space,
    StandardMaterial,
    UtilityLayerRenderer,
    Vector3
} from "@babylonjs/core";
import {ObjectFrame} from "../geojson/types.ts";

const objectFrames = (paths as ObjectFrame[])
    .sort((a, b) => a.time_meas - b.time_meas);

console.log(objectFrames.map(
    it => (it.time_meas - objectFrames[0].time_meas) / (1000 * 1000)
));

export function renderObjectFrames(scene: Scene) {
    for (let i = 0; i < objectFrames.length; i++) {
        const objectFrame = objectFrames[i];
        const box = MeshBuilder.CreateBox(
            `${objectFrame.time_meas}`,
            {
                width: objectFrame.shape.x,
                height: objectFrame.shape.y,
                depth: objectFrame.shape.z
            },
            scene
        );
        box.rotate(Axis.Y, -objectFrame.orientation, Space.WORLD);
        box.position = new Vector3(
            objectFrame.position.x,
            objectFrame.position.z,
            objectFrame.position.y
        );
        const mat = new StandardMaterial("carMat", scene);
        mat.diffuseColor = Color3.Red().scale(i / objectFrames.length).add(Color3.Blue());
        box.material = mat;
        // Create gizmo
        const gizmoX = new AxisDragGizmo(box.getDirection(Axis.X), Color3.Red(), new UtilityLayerRenderer(scene));
        const gizmoY = new AxisDragGizmo(box.getDirection(Axis.Y), Color3.Green(), new UtilityLayerRenderer(scene));
        const gizmoZ = new AxisDragGizmo(box.getDirection(Axis.Z), Color3.Blue(), new UtilityLayerRenderer(scene));
        gizmoX.attachedMesh = box;
        gizmoY.attachedMesh = box;
        gizmoZ.attachedMesh = box;
    }
}

export function renderObjectFrame(scene: Scene, position: Vector3, velocity: Vector3, scale: Vector3) {
    const box = MeshBuilder.CreateBox("objectFrame", {}, scene);
    box.rotation = Vector3.Normalize(velocity);
    box.scaling = scale;
    box.position = position;
    // const mat = new StandardMaterial("objectFrameMat", scene);
    // mat.diffuseColor = Color3.Red().scale(i / objectFrames.length).add(Color3.Blue());
    // box.material = mat;
    // Create gizmo
    const gizmoX = new AxisDragGizmo(box.getDirection(Axis.X), Color3.Red(), new UtilityLayerRenderer(scene));
    const gizmoY = new AxisDragGizmo(box.getDirection(Axis.Y), Color3.Green(), new UtilityLayerRenderer(scene));
    const gizmoZ = new AxisDragGizmo(box.getDirection(Axis.Z), Color3.Blue(), new UtilityLayerRenderer(scene));
    gizmoX.attachedMesh = box;
    gizmoY.attachedMesh = box;
    gizmoZ.attachedMesh = box;
}

function computeBezier(p1: Vector3, v1: Vector3, p2: Vector3, v2: Vector3, t: number)
    : { position: Vector3; velocity: Vector3 }
{
    // 计算控制点
    const control1 = p1.add(v1.scale(1 / 3));
    const control2 = p2.subtract(v2.scale(1 / 3));

    // 计算位置
    const position = p1
        .scale(Math.pow(1 - t, 3))
        .add(control1.scale(3 * t * Math.pow(1 - t, 2)))
        .add(control2.scale(3 * (1 - t) * Math.pow(t, 2)))
        .add(p2.scale(Math.pow(t, 3)));

    // 计算速度
    const velocity = control1
        .subtract(p1)
        .scale(3 * Math.pow(1 - t, 2))
        .add(control2.subtract(control1).scale(6 * (1 - t) * t))
        .add(p2.subtract(control2).scale(3 * Math.pow(t, 2)));

    return { position, velocity };
}