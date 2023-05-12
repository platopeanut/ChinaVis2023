import {KeyboardEventTypes, Scene} from "@babylonjs/core";
import CameraManager from "./CameraManager.ts";
import GameObjectManager from "../objects/GameObjectManager.ts";
import Timer from "./Timer.ts";
import SceneConfig from "../../share/SceneConfig.ts";
import GlobalStates from "../../share/SharedStates.ts";

// Lazy Singleton
class SceneManager {
    private static _instance: SceneManager | null = null;
    public static initInstance(scene: Scene) { SceneManager._instance = new SceneManager(scene); }
    public static getInstance(): SceneManager {
        if (this._instance === null)
            throw new Error('SceneManager.getInstance() cannot be used before calling SceneManager.initInstance()');
        return this._instance;
    }

    public cameraManager: CameraManager;
    public gameObjectManager: GameObjectManager;
    public timer: Timer = new Timer();
    private _isPaused = false;
    public constructor(private _scene: Scene) {
        this.cameraManager = new CameraManager(_scene);
        this.gameObjectManager = GameObjectManager.createDefault();
        // 绑定
        this.timer.baseTime = SceneConfig.startTime / 1000 - 1000;
        this.timer.iTime = SceneConfig.initITime;
        Timer.bindSubject(this.timer, GlobalStates.timer);
        Timer.registerKeyboardEvent(this.timer, _scene);
        this.registerKeyboardEvent();
    }
    public get scene() { return this._scene; }
    public onRender() {
        if (!this._isPaused) {
            this.timer.tick(this._scene.getEngine().getDeltaTime());
            this.gameObjectManager.render(this._scene, this.timer.iAbsoluteTime);
        }
    }
    private registerKeyboardEvent() {
        this._scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) {
                if (kbInfo.event.key === " ") {
                    this._isPaused = !this._isPaused;
                }
            }
        });
    }
}

export default SceneManager;