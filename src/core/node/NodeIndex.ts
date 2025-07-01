
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

import {ECSNode} from "./Node";
import {ECSNodeSchema} from "./schema/NodeSchema";
import {ECSNodeSchemaMeta} from "./schema/NodeSchemaMeta";

export interface ECSNodeIndex {
    getNodesWithSchema(meta: ECSNodeSchemaMeta): Iterable<ECSNode<ECSNodeSchema>>;
}