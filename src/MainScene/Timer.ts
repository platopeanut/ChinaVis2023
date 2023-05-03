class Timer {
    private _iTime = 0;         // ms
    private _baseTime = 0;      // ms

    public get iTime() { return this._iTime; }
    public get iAbsoluteTime() { return this._baseTime + this._iTime; }
    public get iDate() { return new Date(this.iAbsoluteTime + (3600000 * 8)); }
    public set baseTime(t: number) { this._baseTime = t; }
    public tick(deltaTime: number) { this._iTime += deltaTime; }
}

export default new Timer();