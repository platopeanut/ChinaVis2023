import {FollowCamera, Nullable, Scene, UniversalCamera, Vector3} from "@babylonjs/core";
import {createCamera} from "../MainScene/camera.ts";

class CameraManager {
    public mainCamera: UniversalCamera;
    public followCamera: FollowCamera;
    public constructor(scene: Scene, canvas: Nullable<HTMLCanvasElement>) {
        this.mainCamera = createCamera(scene);
        this.mainCamera.position = new Vector3(35, 111, -135);
        this.mainCamera.attachControl(canvas, true);

        this.followCamera = new FollowCamera("FollowCam", new Vector3(0, 10, 0), scene);
        // this.followCamera.attachControl(true);
        this.followCamera.radius = 20;
        this.followCamera.heightOffset = 10;
        this.followCamera.rotationOffset = 0;
        this.followCamera.cameraAcceleration = 0.01;
        this.followCamera.maxCameraSpeed = 5;

        scene.activeCamera = this.mainCamera;
    }

}

export default CameraManager;