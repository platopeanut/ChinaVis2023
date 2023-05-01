export interface FeatureCollection<props extends Properties> {
    type: "FeatureCollection"
    name: string
    features: Feature<props>[]
}

export interface Feature<props extends Properties> {
    type: "Feature"
    properties: props
    geometry: Geometry
}

export interface Geometry {
    type: string
    coordinates: [number, number, number][]
}

export interface Properties {
    fid: number
}

export interface LaneRoadProperties extends Properties {
    fid: number
    lane_no: number
    lane_count: number
    turn_type: number
    category: number
    road_sec_id: number
    limit_speed: number
    left_boundary_id: number
    right_boundary_id: number
    left_boundary_reverse: number
    right_boundary_reverse: number
}

export interface SignalRoadProperties extends Properties {
    fid: number
    plid: number
    turn: number
    type: number
    stopline_id: number
    stopline_id2: number
    stopline_id3: number
}

export interface StopLineRoadProperties extends Properties {
    fid: number
}


