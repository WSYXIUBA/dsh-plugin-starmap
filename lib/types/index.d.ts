export declare const name = "dsh-plugin-constellation";
export declare const inject: string[];
export interface GraphNode {
    id: string;
    label: string;
    category: string;
    enabled: boolean;
    version: string;
    desc: string;
}
export interface GraphLink {
    source: string;
    target: string;
    relation: string;
}
export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
    scannedAt: string;
}
export declare function apply(ctx: any): void;
