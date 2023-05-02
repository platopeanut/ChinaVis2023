# ChinaVis 2023

## Format

~~~json5
{
    "id": 174982399,                  // 物体ID
    "seq": 280378832,                 // 帧号
    "is_moving": 1,                   // 当前状态是否运动
    "position": {                     // 位置
      "x": -81.32461,
      "y": -205.8905,
      "z": 12.71776
    },
    "shape": {                        // 形状
      "x": 4.8877726,
      "y": 2.066351,
      "z": 1.6486948
    },
    "orientation": -1.9516711,        // 朝向
    "velocity": 11.150774,            // 速度
    "type": 1,                        // 类型
    "heading": -1.9516711,            // 运动方向
    "time_meas": 1681316063099694     // 设备采集时间戳（16位）精确到微秒
}
~~~


~~~typescript
enum Type {
    Unknown = 0,        // 未识别
    Car = 1,            // 小型车辆
    Pedestrian = 2,     // 行人
    Cyclist = 3,        // 非机动车
    Truck = 4,          // 卡车
    Van = 5,            // 厢式货车、面包车
    Bus = 6,            // 客车
    Static = 7,         // 静态物体
    StaticEdge = 8,     // 路牙
    Cone = 9,           // 锥桶
    Trolley = 10,       // 手推车、三轮车
    Robot = 11,         // 信号灯
    Gate = 12           // 门、阀门、阀机、出入口
}
~~~