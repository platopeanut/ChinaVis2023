# Main Scene

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
