# Main Scene

## Required Data

> 确保项目根目录下的`data`目录有以下数据文件，若缺失请在共享云盘中获取

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

## Export Interface

### Timer
通过以下方式获取到场景中的计时器
~~~typescript
const timer = globalStates.timer.iTime;
console.log(timer.iTime);               // 场景从加载开始到现在的毫秒数
console.log(timer.iAbsoluteTime);       // 真实毫秒时间戳
console.log(timer.iDate);               // 真实时间
console.log(timer.rate);                // 场景时间的流速（负数表示逆流）
~~~

### 视野矩形区域
通过以下方式获取到俯视的正交摄像机`OverlookCamera`的视野矩形区域
~~~typescript
const rect = globalStates.overlookRect;
console.log(rect.left);
console.log(rect.right);
console.log(rect.bottom);
console.log(rect.top);
~~~

## Structure

~~~text
MainScene/              
├── README.md           
├── core                        // 核心模块
│   ├── CameraManager.ts        // 摄像机管理器
│   ├── SceneManager.ts         // 场景管理器
│   └── Timer.ts                // 计时器
├── env                         // 场景环境（如天空盒、光源、地形） 
├── handler.ts                  // 生命周期钩子
├── index.tsx                   // React 组件 
├── map                         // 道路地图
├── objects                     // 运动的物体
├── ui                          // 2D UI界面
└── utils                       // 工具函数
~~~
