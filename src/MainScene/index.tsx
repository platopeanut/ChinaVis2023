import SceneComponent from 'babylonjs-hook';
import {onRender, onSceneReady} from "./handler.ts"; // if you install 'babylonjs-hook' NPM.


function MainScene() {
    return <>
        <SceneComponent
            antialias
            onSceneReady={onSceneReady}
            onRender={onRender}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    </>
}

export default MainScene;
