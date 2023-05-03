import paths from "../../data/small_piece.json";
import {
    Axis,
    AxisDragGizmo,
    Color3, Mesh,
    MeshBuilder,
    Scene,
    Space,
    StandardMaterial,
    UtilityLayerRenderer,
    Vector3
} from "@babylonjs/core";
import {ObjectFrame} from "../geojson/types.ts";
import timer from "../MainScene/Timer.ts";
import {computeBezier} from "../utils/math.ts";

const objectFrames = (paths as ObjectFrame[])
    .sort((a, b) => a.time_meas - b.time_meas);
objectFrames[objectFrames.length - 1].position.x = -110;
objectFrames[objectFrames.length - 1].position.y = -310;
objectFrames[objectFrames.length - 1].orientation = -0.5;

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

export class GameObject {

    public static CreateDefault(): GameObject {
        return new GameObject(objectFrames);
    }

    private readonly keyTimes: number[] = [];
    public box: Mesh | null = null;
    constructor(private objectFrames: ObjectFrame[]) {
        console.assert(objectFrames.length >= 2);
        this.keyTimes = objectFrames.map(it => it.time_meas / 1000);
    }
    public render(scene: Scene) {
        const iAbsTime = timer.iAbsoluteTime;
        if (iAbsTime < this.keyTimes[0] || iAbsTime > this.keyTimes[this.keyTimes.length - 1]) return;
        let startIdx = 0;
        for (; startIdx < this.keyTimes.length - 1; startIdx++) {
            if (iAbsTime >= this.keyTimes[startIdx] && iAbsTime <= this.keyTimes[startIdx + 1]) break;
        }
        const endIdx = startIdx + 1;
        const t = (iAbsTime - this.keyTimes[startIdx]) / (this.keyTimes[endIdx] - this.keyTimes[startIdx]);
        const startFrame = this.objectFrames[startIdx];
        const endFrame = this.objectFrames[endIdx];
        const p1 = new Vector3(startFrame.position.x, startFrame.position.z, startFrame.position.y);
        const p2 = new Vector3(endFrame.position.x, endFrame.position.z, endFrame.position.y);
        const v1 = this.calcVelocity(startFrame);
        const v2 = this.calcVelocity(endFrame);
        const {position, velocity} = computeBezier(p1, v1, p2, v2, t);
        const scale = new Vector3(startFrame.shape.x, startFrame.shape.z, startFrame.shape.y);
        this.renderFrame(scene, position, velocity, scale);
    }

    private calcVelocity(objectFrame: ObjectFrame) {
        const theta = objectFrame.orientation;
        const v = new Vector3(-Math.sin(theta), 0, Math.cos(theta));
        return v.scale(objectFrame.velocity);
    }
    private renderFrame(scene: Scene, position: Vector3, velocity: Vector3, scale: Vector3) {
        if (this.box === null) {
            this.box = MeshBuilder.CreateBox("GameObject", {}, scene);
            const gizmoX = new AxisDragGizmo(this.box.getDirection(Axis.X), Color3.Red(), new UtilityLayerRenderer(scene));
            const gizmoY = new AxisDragGizmo(this.box.getDirection(Axis.Y), Color3.Green(), new UtilityLayerRenderer(scene));
            const gizmoZ = new AxisDragGizmo(this.box.getDirection(Axis.Z), Color3.Blue(), new UtilityLayerRenderer(scene));
            gizmoX.attachedMesh = this.box;
            gizmoY.attachedMesh = this.box;
            gizmoZ.attachedMesh = this.box;
        }
        // this.box.rotation = Vector3.Normalize(velocity);
        this.box.scaling = scale;
        this.box.position = position;
        this.box.lookAt(this.box.position.add(velocity));
        // this.box.rotate(Axis.Y, Math.acos(Vector3.Dot(velocity, Vector3.Forward())), Space.LOCAL);
        // console.log(velocity, this.box.rotation);
        // const mat = new StandardMaterial("objectFrameMat", scene);
        // mat.diffuseColor = Color3.Red().scale(i / objectFrames.length).add(Color3.Blue());
        // box.material = mat;
        // Create gizmo

    }
}