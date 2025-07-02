
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "../entity/EntityId";
import {ECSNode} from "./Node";
import {ECSNodeSchema} from "./schema/NodeSchema";
import {ECSNodeSchemaMeta} from "./schema/NodeSchemaMeta";

export interface ECSNodeFactory {
    createNode<S extends ECSNodeSchema>(schemaMeta: ECSNodeSchemaMeta, entityId: ECSEntityId): ECSNode<S>;
}