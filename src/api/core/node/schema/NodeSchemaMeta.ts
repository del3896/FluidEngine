
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchema} from "./NodeSchema.js";
import {ECSNodeSchemaId} from "./NodeSchemaId.js";

export interface ECSNodeSchemaMeta {
    readonly id: ECSNodeSchemaId;
    readonly schema: ECSNodeSchema;
}
