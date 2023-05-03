import {Vector3} from "@babylonjs/core";

export function computeBezier(p1: Vector3, v1: Vector3, p2: Vector3, v2: Vector3, t: number)
    : { position: Vector3; velocity: Vector3 }
{
    // 计算控制点
    const control1 = p1.add(v1.scale(1 / 3));
    const control2 = p2.subtract(v2.scale(1 / 3));

    // 计算位置
    const position = p1
        .scale(Math.pow(1 - t, 3))
        .add(control1.scale(3 * t * Math.pow(1 - t, 2)))
        .add(control2.scale(3 * (1 - t) * Math.pow(t, 2)))
        .add(p2.scale(Math.pow(t, 3)));

    // 计算速度
    const velocity = Vector3.Lerp(v1, v2, t);
    // const velocity = control1
    //     .subtract(p1)
    //     .scale(3 * Math.pow(1 - t, 2))
    //     .add(control2.subtract(control1).scale(6 * (1 - t) * t))
    //     .add(p2.subtract(control2).scale(3 * Math.pow(t, 2)));

    return { position, velocity };
}