# Share

> @LastUpdate: 2023-05-13 \
> @Author: Peanut

## Required Data

> 确保项目根目录下的`data`目录有以下数据文件，若缺失请在共享云盘中获取🧐

~~~text
└── data
    ├── laneroad_with9road.json         // geojson -> json
    ├── behaviors.json
    ├── laneroad10.json
    ├── signalroad10.geojson
    ├── small_piece.json
    └── stoplineroad10.geojson
~~~

> 场景所用到的Textures、Audio等都会存放在`/public/assets/`目录下


## SharedStates

> 基本原理是基于观察者模式：生产者更新数据并随后依次通知已注册的观察者 \
> 由于更新数据方法是公开的（这很危险！😥）因此观察者们请务必不要调用！

### Timer

~~~typescript
// 获取最新数据，数据可能为空
const timer = SharedStates.timer.latestData;
~~~

~~~typescript
SharedStates.timer.addObservers(timer => {
    // 当timer数据更新时会执行
    console.log(timer);
});
~~~

### OverlookRect

~~~typescript
// 获取最新数据，数据可能为空
const rect = SharedStates.overlookRect.latestData;
~~~

~~~typescript
SharedStates.overlookRect.addObservers(rect => {
    // 当rect数据更新时会执行
    console.log(rect);
})
~~~

## DataLoader

> 组件之间所需要的公共数据（例如：车道地理数据，车辆行为数据等）\
> 我们约定所有数据都在DataLoader中获取！😊

目前已实现的公共数据
- LaneRoadData：主干道数据
- ObjectBehaviorsData：车辆行为数据（目前只有公交车）

获取方法：采用异步调用
~~~typescript
// 以LaneRoadData为例
LaneRoadData.then(data => {
    console.log(data);
})
// 或者在async函数中
async () => {
    const data = await LaneRoadData;
    console.log(data);
}
~~~

## SceneConfig

> 主场景中的一些相关配置（例如选择要加载的地图文件等）
