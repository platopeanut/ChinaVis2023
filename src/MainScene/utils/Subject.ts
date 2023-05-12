class Subject<T> {
    private _data: T | null = null;
    private _observers: ((data: T) => void)[] = [];

    /**
     * 获取最新的数据
     */
    public get latestData() { return this._data; }

    /**
     * 添加一个观察者，数据更新时自动通知
     * @param observer
     */
    public addObservers(observer: (data: T) => void) {
        this._observers.push(observer);
    }

    /**
     * 注意！！！只有数据生产者才可以调用此方法！
     * @param data
     */
    public updateData(data: T) {
        this._data = data;
        this.notifyObservers();
    }

    /**
     * 依次通知观察者们
     * @private
     */
    private notifyObservers() {
        for (const observer of this._observers) {
            if (this._data === null) throw new Error('Subject Data is NULL!');
            observer(this._data);
        }
    }
}

export default Subject;