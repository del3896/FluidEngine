
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "../entity/EntityId.js";
import {ECSNode} from "./Node.js";
import {ECSNodeSchema} from "./schema/NodeSchema.js";
import {ECSNodeSchemaMeta} from "./schema/NodeSchemaMeta.js";

export interface ECSNodeFactory {
    createNode<S extends ECSNodeSchema>(schemaMeta: ECSNodeSchemaMeta, entityId: ECSEntityId): ECSNode<S>;
}