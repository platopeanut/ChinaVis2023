import {GameObject} from "./GameObject.ts";
import {Scene} from "@babylonjs/core";
import {loadObjectBehaviors, ObjectBehavior, sizeOfObjectBehaviors} from "./types.ts";

class GameObjectManager {
    private readonly _gameObjects: GameObject[];
    public readonly startTime: number;
    public readonly endTime: number;
    public constructor(objectBehaviors: ObjectBehavior[]) {
        this._gameObjects = objectBehaviors.map(behavior => new GameObject(behavior));
        this.startTime = Math.min(...objectBehaviors.map(it => it.startTime));
        this.endTime = Math.max(...objectBehaviors.map(it => it.endTime));
    }
    public render(scene: Scene, iAbsTime: number) {
        for (const gameObject of this._gameObjects) {
            gameObject.render(scene, iAbsTime);
        }
    }
    public static createDefault(startIdx= 0, endIdx=sizeOfObjectBehaviors): GameObjectManager {
        return new GameObjectManager(loadObjectBehaviors(startIdx, endIdx));
    }
}

export default GameObjectManager;