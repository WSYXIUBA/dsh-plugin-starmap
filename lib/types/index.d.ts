export declare const name = "dsh-plugin-constellation";
export declare const inject: string[];
export type FiberPhase = "pending" | "loading" | "active" | "failed" | "unloading" | null;
export type RelationType = "deps" | "peer" | "service" | "client" | "profile";
export type HubKind = "service" | "profile";
export interface GraphNode {
    id: string;
    /** short display name (package name, or bare service/profile name for hubs) */
    label: string;
    category: string;
    enabled: boolean;
    /** loader fiber phase from pluginInventory: active / failed / loading / … */
    phase: FiberPhase;
    version: string;
    desc: string;
    /** dependency spec from the profile package.json (e.g. "^1.8.0", "github:u/r") */
    installSource: string;
    /** names of the profiles that reference this package */
    profiles: string[];
    /** true when no profile bundle or loaded entry reaches this package */
    orphan: boolean;
    repository: string;
    homepage: string;
    /** hub marker: virtual nodes are not real packages */
    hub?: HubKind;
}
export interface GraphLink {
    source: string;
    target: string;
    relation: RelationType;
}
export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
    scannedAt: string;
}
export declare function apply(ctx: any): void;
