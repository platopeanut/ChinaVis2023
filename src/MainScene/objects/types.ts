import data from "../../../data/behaviors.json";

const objectBehaviors = data as ObjectBehavior[];
export const sizeOfObjectBehaviors = objectBehaviors.length;

export interface ObjectBehavior {
    id: number                      // 物体ID
    type: ObjectType                // 物体类型
    startTime: number               // 开始时间戳（精确到微秒）
    endTime: number                 // 结束时间戳（精确到微秒）
    frames: ObjectFrame[]           // 轨迹信息
}

export interface ObjectFrame {
    seq: number                     // 设备帧号
    timeMeas: number                // 时间戳（精确到微秒）
    isMoving: boolean               // 是否在运动
    position: Vec3                  // 位置
    velocity: Vec3                  // 速度
    shape: Vec3                     // 形状
}

export interface Vec3 {
    x: number
    y: number
    z: number
}

export enum ObjectType {
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

export interface OldObjectFrame {
    id: number
    seq: number
    is_moving: number
    position: Vec3
    shape: Vec3
    orientation: number
    velocity: number
    type: number
    heading: number
    time_meas: number
}

export function loadObjectBehaviors(startIdx: number, endIdx: number) {
    return objectBehaviors.slice(startIdx, endIdx);
}