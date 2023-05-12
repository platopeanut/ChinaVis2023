import SceneConfig from "./SceneConfig.ts";
import {FeatureCollection, LaneRoadProperties} from "../MainScene/map/types.ts";
import {ObjectBehavior} from "../MainScene/objects/types.ts";

export const LaneRoadData = loadJson<FeatureCollection<LaneRoadProperties>>(SceneConfig.laneRoadFile);
export const ObjectBehaviorsData = loadJson<ObjectBehavior[]>(SceneConfig.objectsFile);

async function loadJson<T>(url: string): Promise<T> {
    return fetch(url).then(res => res.json()) as T;
}
