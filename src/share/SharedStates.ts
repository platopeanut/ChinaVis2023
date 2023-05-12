import Timer from "../MainScene/core/Timer.ts";
import Subject from "../MainScene/utils/Subject.ts";

export type RectArea = {
    left: number
    right: number
    bottom: number
    top: number
}

class SharedStates {
    // public timer: Timer = new Timer();
    // private _overlookRectProducer: () => RectArea = () => {
    //     return { left: 0, right: 0, bottom: 0, top: 0} as RectArea;
    // };
    // public set overlookRectProducer(producer: () => RectArea) { this._overlookRectProducer = producer; }
    // public get overlookRect() { return this._overlookRectProducer(); }
    public timer: Subject<Timer> = new Subject<Timer>();
    public overlookRect: Subject<RectArea> = new Subject<RectArea>();
}

export default new SharedStates();
