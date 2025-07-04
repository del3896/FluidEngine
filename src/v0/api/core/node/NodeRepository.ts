
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "../entity/EntityId.js";
import {ECSNode} from "./Node.js";
import {ECSNodeSchema} from "./schema/NodeSchema.js";
import {ECSNodeSchemaId} from "./schema/NodeSchemaId.js";

export interface ECSNodeRepository {
    hasNode(schemaId: ECSNodeSchemaId, entityId: ECSEntityId): boolean;
    getNode<S extends ECSNodeSchema>(schemaId: ECSNodeSchemaId, entityId: ECSEntityId): ECSNode<S>;
    removeNode(schemaId: ECSNodeSchemaId, entityId: ECSEntityId): void;

    hasNodes(schemaId: ECSNodeSchemaId): boolean;
    getNodes<S extends ECSNodeSchema>(schemaId: ECSNodeSchemaId): Iterable<ECSNode<S>>;
    removeNodes(schemaId: ECSNodeSchemaId): void;

    addNode<S extends ECSNodeSchema>(schemaId: ECSNodeSchemaId, node: ECSNode<S>): void;
}