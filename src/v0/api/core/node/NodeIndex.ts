
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNode} from "./Node.js";
import {ECSNodeSchema} from "./schema/NodeSchema.js";
import {ECSNodeSchemaMeta} from "./schema/NodeSchemaMeta.js";

export interface ECSNodeIndex {
    getNodesWithSchema(meta: ECSNodeSchemaMeta): Iterable<ECSNode<ECSNodeSchema>>;
}