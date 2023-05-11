import Timer from "./core/Timer.ts";

export type RectArea = {
    left: number
    right: number
    bottom: number
    top: number
}

class GlobalStates {
    public timer: Timer = new Timer();
    private _overlookRectProducer: () => RectArea = () => {
        return { left: 0, right: 0, bottom: 0, top: 0} as RectArea;
    };
    public set overlookRectProducer(producer: () => RectArea) { this._overlookRectProducer = producer; }
    public get overlookRect() { return this._overlookRectProducer(); }
}

export default new GlobalStates();