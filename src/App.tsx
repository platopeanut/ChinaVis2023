import "./App.css";
import MainScene from "./MainScene";
import Scene2D from "./Scene2D";

function App() {
    return <div style={{ display: "flex", flexDirection: "row" }}>
        <Scene2D />
        <MainScene />
    </div>
}

export default App;
