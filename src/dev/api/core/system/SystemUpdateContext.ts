import { ECSNode, ECSNodeSchema } from "../../../../v0/api/index.js";

export interface ECSSystemUpdateContext<S extends ECSNodeSchema> {
    nodes: Iterable<ECSNode<S>>;
    deltaTime: number;
}