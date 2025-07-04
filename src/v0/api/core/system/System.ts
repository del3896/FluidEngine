
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNode } from "../node/Node.js";
import { ECSNodeSchema } from "../node/schema/NodeSchema.js";
import { ECSSystemMeta } from "./SystemMeta.js";

export interface ECSSystem<S extends ECSNodeSchema> {
    getSystemMeta(): ECSSystemMeta;
    updateNodes(nodes: Iterable<ECSNode<ECSNodeSchema>>): void;
    updateNode?(node: ECSNode<S>): void;
}