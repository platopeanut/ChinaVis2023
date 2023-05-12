import {
    Camera,
    FollowCamera,
    FreeCamera,
    KeyboardEventTypes, PointerEventTypes,
    Scene,
    UniversalCamera,
    Vector3
} from "@babylonjs/core";

class CameraManager {
    public readonly mainCamera: UniversalCamera;
    public readonly followCamera: FollowCamera;
    public readonly overlookCamera: FreeCamera;

    public constructor(private _scene: Scene) {
        this.mainCamera = new UniversalCamera("MainCamera", new Vector3(0, 0, -10), this._scene);
        this.followCamera = new FollowCamera("FollowCamera", new Vector3(0, 10, 0), this._scene);
        this.overlookCamera = new UniversalCamera("OverlookCamera", new Vector3(0, 100, 0), this._scene);
        this.initMainCamera();
        this.initFollowCamera();
        this.initOverlookCamera();
        this._scene.activeCamera = this.mainCamera;
        this.registerKeyboardEvent();
    }
    private initMainCamera() {
        const canvas = this._scene.getEngine().getRenderingCanvas();
        this.mainCamera.position = new Vector3(35, 111, -135);
        this.mainCamera.attachControl(canvas, true);
        this.mainCamera.angularSensibility = 4000;
        this.mainCamera.keysUp = ['W'.charCodeAt(0)];
        this.mainCamera.keysDown = ['S'.charCodeAt(0)];
        this.mainCamera.keysLeft = ['A'.charCodeAt(0)];
        this.mainCamera.keysRight = ['D'.charCodeAt(0)];
        this.mainCamera.keysUpward = ['Q'.charCodeAt(0)];
        this.mainCamera.keysDownward = ['E'.charCodeAt(0)];
    }
    private initFollowCamera() {
        // this.followCamera.attachControl(true);
        this.followCamera.radius = 20;
        this.followCamera.heightOffset = 10;
        this.followCamera.rotationOffset = 0;
        this.followCamera.cameraAcceleration = 0.01;
        this.followCamera.maxCameraSpeed = 5;
    }
    private initOverlookCamera() {
        const canvas = this._scene.getEngine().getRenderingCanvas();
        this.overlookCamera.attachControl(canvas, true);
        this.overlookCamera.setTarget(Vector3.Zero());
        this.overlookCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        const ratio = this._scene.getEngine().getRenderHeight() / this._scene.getEngine().getRenderWidth();
        let zoom = 100;
        this.overlookCamera.orthoTop = zoom;
        this.overlookCamera.orthoBottom = -zoom;
        this.overlookCamera.orthoLeft = -zoom / ratio;
        this.overlookCamera.orthoRight = zoom / ratio;
        this.overlookCamera.keysUpward = ['W'.charCodeAt(0)];
        this.overlookCamera.keysDownward = ['S'.charCodeAt(0)];
        this.overlookCamera.keysLeft = ['A'.charCodeAt(0)];
        this.overlookCamera.keysRight = ['D'.charCodeAt(0)];
        this._scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERWHEEL:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    zoom += pointerInfo.event.deltaY;
                    this.overlookCamera.orthoTop = zoom;
                    this.overlookCamera.orthoBottom = -zoom;
                    this.overlookCamera.orthoLeft = -zoom / ratio;
                    this.overlookCamera.orthoRight = zoom / ratio;
                    // if (pointerInfo.event. > 0) {
                    //     console.log("Mouse wheel scrolled up");
                    // } else {
                    //     console.log("Mouse wheel scrolled down");
                    // }
                    break;
            }
        });
    }
    private registerKeyboardEvent() {
        // 切换摄像机
        this._scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) {
                if (kbInfo.event.key === "1") {
                    this._scene.activeCamera = this.mainCamera;
                }
                else if (kbInfo.event.key === "2") {
                    this._scene.activeCamera = this.followCamera;
                }
                else if (kbInfo.event.key === "3") {
                    this._scene.activeCamera = this.overlookCamera;
                }
            }
        });
    }
}

export default CameraManager;