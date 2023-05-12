import {
    ActionManager,
    Camera, Color3, ExecuteCodeAction,
    Material,
    Mesh,
    MeshBuilder, PointerEventTypes, Scene,
    Space,
    StandardMaterial, UniversalCamera, Vector2, Vector3
} from "@babylonjs/core";
import {LaneRoadData} from "../share/DataLoader.ts";
import SharedStates, {RectArea} from "../share/SharedStates.ts";

function createPureMaterial(color: Color3, scene: Scene) {
    const material = new StandardMaterial(`pureMat${color}`, scene);
    material.diffuseColor = color;
    material.emissiveColor = color;
    material.specularColor = color;
    return material;
}

export function onSceneReady(scene: Scene) {
    const PureMaterials = {
        Red: createPureMaterial(Color3.Red(), scene),
        Green: createPureMaterial(Color3.Green(), scene),
        Blue: createPureMaterial(Color3.Blue(), scene),
        White: createPureMaterial(Color3.White(), scene)
    };
    createCamera(scene);
    loadLaneRoads(PureMaterials.White, PureMaterials.Red, scene).catch(console.error);

    return scene;
}

export function onRender() {
    // console.log();
}

function createCamera(scene: Scene) {
    const camera = new UniversalCamera("MainCamera", new Vector3(0, 0, -10), scene);
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    camera.inputs.clear();
    camera.position = new Vector3(0, 0, -5);
    camera.setTarget(Vector3.Zero());

    function updateOverlookRect() {
        const rect = {
            left: (camera.orthoLeft ?? 0) + camera.position.x,
            right: (camera.orthoRight ?? 0) + camera.position.x,
            bottom: (camera.orthoBottom ?? 0) + camera.position.y,
            top: (camera.orthoTop ?? 0) + camera.position.y
        } as RectArea;
        SharedStates.overlookRect.updateData(rect);
    }

    // ZOOM
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    const ratio = window.innerHeight / window.innerWidth * 2;
    let zoom = 10;
    camera.orthoLeft = -zoom;
    camera.orthoRight = zoom;
    camera.orthoTop = zoom * ratio;
    camera.orthoBottom = -zoom * ratio;
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERWHEEL) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (pointerInfo.event['deltaY'] > 0) zoom *= 1.1;
            else zoom *= 0.9;
            camera.orthoLeft = -zoom;
            camera.orthoRight = zoom;
            camera.orthoTop = zoom * ratio;
            camera.orthoBottom = -zoom * ratio;
            updateOverlookRect();
        }
    });

    // WASD
    let lastX: number | null = null;
    let lastY: number | null = null;
    let isPointerDown = false;
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERDOWN && pointerInfo.event.button === 0) {
            isPointerDown = true;
        }
        if (pointerInfo.type === PointerEventTypes.POINTERUP && pointerInfo.event.button === 0) {
            isPointerDown = false;
            lastX = null;
            lastY = null;
        }
        if (isPointerDown && pointerInfo.type === PointerEventTypes.POINTERMOVE) {
            if (lastX !== null && lastY !== null) {
                const offsetX = lastX - pointerInfo.event.clientX;
                const offsetY = pointerInfo.event.clientY - lastY;
                const sensitivity = 0.01 * zoom;
                camera.position.addInPlace(new Vector3(offsetX * sensitivity, offsetY * sensitivity, 0));
                updateOverlookRect();
            }
            lastX = pointerInfo.event.clientX;
            lastY = pointerInfo.event.clientY;
        }
    });
    return camera;
}

function xyzToVector2(xyz: [number, number, number]) {
    return new Vector2(xyz[0], xyz[1]);
}

async function loadLaneRoads(material: Material, activateMaterial: Material, scene: Scene) {
    const featureCollection = await LaneRoadData;
    for (const feature of featureCollection.features) {
        // 1. All
        // for (let i = 0; i < feature.geometry.coordinates.length - 1; i++) {
        //     const p1 = feature.geometry.coordinates[i];
        //     const p2 = feature.geometry.coordinates[i + 1];
        //     createRoad(xyzToVector2(p1), xyzToVector2(p2), material, scene);
        // }
        // 2. Only Head and Tail
        const coordinates = feature.geometry.coordinates;
        const p1 = coordinates[0];
        const p2 = coordinates[coordinates.length - 1];
        const road = createRoad(xyzToVector2(p1), xyzToVector2(p2), scene);
        road.material = material;
        let isActive = true;
        road.actionManager = new ActionManager(scene);
        road.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => {
                    console.log(feature);
                    road.material = isActive ? activateMaterial : material;
                    isActive = !isActive;
                }
            )
        );
    }
}

function createRoad(p1: Vector2, p2: Vector2, scene: Scene) {
    const road = MeshBuilder.CreatePlane(
        "road",
        {
            width: 1.0,
            height: Vector2.Distance(p1, p2),
            sideOrientation: Mesh.DOUBLESIDE
        },
        scene
    );
    const orient2f = p2.subtract(p1);
    const orient3f = new Vector3(orient2f.x, orient2f.y, 0).normalize();
    const axis = Vector3.Cross(Vector3.Up(), orient3f);
    const theta = Math.acos(Vector3.Dot(Vector3.Up(), orient3f));
    const center = Vector2.Lerp(p1, p2, 0.5);
    road.rotate(axis, theta, Space.WORLD);
    road.position.set(center.x, center.y, 0);
    return road;
}
