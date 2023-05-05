class Timer {
    private _iTime = 0;         // ms
    private _baseTime = 0;      // ms
    private _rate = 1.0;
    private readonly _rateStep = 0.1;
    public get rate() { return this._rate; }
    public upRate() { this._rate += this._rateStep; }
    public downRate() {this._rate -= this._rateStep; }

    public get iTime() { return this._iTime; }
    public get iAbsoluteTime() { return this._baseTime + this._iTime; }
    public get iDate() { return new Date(this.iAbsoluteTime + (3600000 * 8)); }
    public set baseTime(t: number) { this._baseTime = t; }
    public tick(deltaTime: number) { this._iTime += deltaTime * this._rate; }
}

export default new Timer();