import {
    ActionManager,
    Axis,
    AxisDragGizmo,
    Color3, ExecuteCodeAction,
    Mesh,
    MeshBuilder,
    Scene,
    Space,
    UtilityLayerRenderer,
    Vector3
} from "@babylonjs/core";
import {vec3ToVector3} from "../utils/math.ts";
import SceneManager from "../core/SceneManager.ts";
import {ObjectBehavior} from "./types.ts";

export class GameObject {
    private readonly keyTimes: number[] = [];
    public box: Mesh | null = null;

    public constructor(private objectBehavior: ObjectBehavior) {
        objectBehavior.frames = objectBehavior.frames
            .sort((a, b) => a.timeMeas - b.timeMeas);
        this.keyTimes = objectBehavior.frames.map(it => it.timeMeas / 1000);
    }

    // constructor(private objectFrames: ObjectFrame[]) {
    //     console.assert(objectFrames.length >= 2);
    //     this.keyTimes = objectFrames.map(it => it.time_meas / 1000);
    // }
    public render(scene: Scene, iAbsTime: number) {
        if (iAbsTime < this.keyTimes[0] || iAbsTime > this.keyTimes[this.keyTimes.length - 1]) return;
        let startIdx = 0;
        for (; startIdx < this.keyTimes.length - 1; startIdx++) {
            if (iAbsTime >= this.keyTimes[startIdx] && iAbsTime <= this.keyTimes[startIdx + 1]) break;
        }
        const endIdx = startIdx + 1;
        const t = (iAbsTime - this.keyTimes[startIdx]) / (this.keyTimes[endIdx] - this.keyTimes[startIdx]);
        const startFrame = this.objectBehavior.frames[startIdx];
        const endFrame = this.objectBehavior.frames[endIdx];
        const p1 = vec3ToVector3(startFrame.position);
        const p2 = vec3ToVector3(endFrame.position);
        const v1 = vec3ToVector3(startFrame.velocity);
        const v2 = vec3ToVector3(endFrame.velocity);
        // 1. Bezier
        // const {position, velocity} = computeBezier(p1, v1, p2, v2, t);
        // 2. Linear
        const position = Vector3.Lerp(p1, p2, t);
        const velocity = Vector3.Lerp(v1, v2, t);
        const scale = Vector3.Lerp(
            vec3ToVector3(startFrame.shape),
            vec3ToVector3(endFrame.shape),
            t
        );
        this.renderFrame(scene, position, velocity, scale);
    }

    // private calcVelocity(objectFrame: ObjectFrame) {
    //     const theta = objectFrame.orientation;
    //     const v = new Vector3(-Math.sin(theta), 0, Math.cos(theta));
    //     return v.scale(objectFrame.velocity);
    // }
    private renderFrame(scene: Scene, position: Vector3, velocity: Vector3, scale: Vector3) {
        if (this.box === null) {
            this.box = MeshBuilder.CreateBox("GameObject", {}, scene);
            // Create gizmo
            const gizmoX = new AxisDragGizmo(this.box.getDirection(Axis.X), Color3.Red(), new UtilityLayerRenderer(scene));
            const gizmoY = new AxisDragGizmo(this.box.getDirection(Axis.Y), Color3.Green(), new UtilityLayerRenderer(scene));
            const gizmoZ = new AxisDragGizmo(this.box.getDirection(Axis.Z), Color3.Blue(), new UtilityLayerRenderer(scene));
            gizmoX.attachedMesh = this.box;
            gizmoY.attachedMesh = this.box;
            gizmoZ.attachedMesh = this.box;

            this.box.actionManager = new ActionManager(scene);
            this.box.actionManager.registerAction(
                new ExecuteCodeAction(
                    ActionManager.OnPickTrigger,
                    () => {
                        SceneManager.getInstance().cameraManager.followCamera.lockedTarget = this.box;
                        scene.activeCamera = SceneManager.getInstance().cameraManager.followCamera;
                    }
                )
            );
        }
        // this.box.rotation = Vector3.Normalize(velocity);
        this.box.scaling = scale;
        this.box.position = position;
        this.box.lookAt(this.box.position.add(velocity));
        this.box.rotate(Axis.Y, -Math.PI / 2, Space.WORLD);
        // const mat = new StandardMaterial("objectFrameMat", scene);
        // mat.diffuseColor = Color3.Red().scale(i / objectFrames.length).add(Color3.Blue());
        // box.material = mat;
    }
}