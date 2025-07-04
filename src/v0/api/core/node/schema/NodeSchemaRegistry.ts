
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchema} from "./NodeSchema.js";
import {ECSNodeSchemaId} from "./NodeSchemaId.js";
import {ECSNodeSchemaMeta} from "./NodeSchemaMeta.js";

export interface ECSNodeSchemaRegistry {
    hasSchema(schemaId: ECSNodeSchemaId): boolean;
    getSchema(schemaId: ECSNodeSchemaId): ECSNodeSchemaMeta;
    addSchema(schema: ECSNodeSchema, name: string): ECSNodeSchemaMeta;
    removeSchema(schemaId: ECSNodeSchemaId): void;
}
