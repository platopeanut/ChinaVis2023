import SceneComponent from "babylonjs-hook";
import {onRender, onSceneReady} from "./handler.ts";

function Scene2D() {
    return <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        width={window.innerWidth / 2}
        height={window.innerHeight}
    />
}

export default Scene2D;