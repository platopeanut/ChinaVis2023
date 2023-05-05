import {loadObjectBehaviors, ObjectBehavior, sizeOfObjectBehaviors} from "../data_loader/behavior.ts";
import {GameObject} from "./GameObject.ts";
import {Scene} from "@babylonjs/core";

class GameObjectManager {
    private readonly _gameObjects: GameObject[];
    public readonly startTime: number;
    public readonly endTime: number;
    public constructor(objectBehaviors: ObjectBehavior[]) {
        this._gameObjects = objectBehaviors.map(behavior => new GameObject(behavior));
        this.startTime = Math.min(...objectBehaviors.map(it => it.startTime));
        this.endTime = Math.max(...objectBehaviors.map(it => it.endTime));
    }
    public getGameObjectByIdx(idx: number) { return this._gameObjects[idx]; }
    public render(scene: Scene) {
        for (const gameObject of this._gameObjects) {
            gameObject.render(scene);
        }
    }
    public static createDefault(startIdx= 0, endIdx=sizeOfObjectBehaviors): GameObjectManager {
        return new GameObjectManager(loadObjectBehaviors(startIdx, endIdx));
    }
}

export default GameObjectManager;