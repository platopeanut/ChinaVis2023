import {KeyboardEventTypes, Scene} from "@babylonjs/core";
import Subject from "../utils/Subject.ts";

class Timer {
    private _iTime = 0;         // ms
    private _baseTime = 0;      // ms
    private _rate = 1.0;
    private readonly _rateStep = 0.1;
    private _subject: Subject<Timer> | null = null;

    public get rate() { return this._rate; }
    private upRate() { this._rate += this._rateStep; }
    private downRate() {this._rate -= this._rateStep; }

    public get iTime() { return this._iTime; }
    public set iTime(i: number) { this._iTime = i; }
    public get iAbsoluteTime() { return this._baseTime + this._iTime; }
    public get iDate() { return new Date(this.iAbsoluteTime + (3600000 * 8)); }
    public set baseTime(t: number) { this._baseTime = t; }
    public tick(deltaTime: number) {
        this._iTime += deltaTime * this._rate;
        if (this._subject !== null) this._subject.updateData(this);
    }

    public static registerKeyboardEvent(timer: Timer, scene: Scene) {
        scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) {
                if (kbInfo.event.key === "ArrowLeft") {
                    timer.downRate();
                }
                else if (kbInfo.event.key === "ArrowRight") {
                    timer.upRate();
                }
            }
        });
    }
    public static bindSubject(timer: Timer, subject: Subject<Timer>) { timer._subject = subject; }
}

export default Timer;