import {GameObject} from "./GameObject.ts";
import {Scene} from "@babylonjs/core";
import {ObjectBehaviorsData} from "../../share/DataLoader.ts";

class GameObjectManager {
    private _gameObjects: GameObject[] = [];
    public render(scene: Scene, iAbsTime: number) {
        for (const gameObject of this._gameObjects) {
            gameObject.render(scene, iAbsTime);
        }
    }
    private addGameObject(gameObject: GameObject) {
        this._gameObjects.push(gameObject);
    }
    public static createDefault(): GameObjectManager {
        const gameObjectManager = new GameObjectManager();
        ObjectBehaviorsData.then(objectBehaviors => {
            objectBehaviors.forEach(behavior => {
                gameObjectManager.addGameObject(new GameObject(behavior));
            });
        });
        return gameObjectManager;
    }
}

export default GameObjectManager;