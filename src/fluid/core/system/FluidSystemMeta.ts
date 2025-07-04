
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeSchemaMeta } from "../../../api/core/node/schema/NodeSchemaMeta.js";
import { ECSSystemMeta } from "../../../api/core/system/SystemMeta.js";


export class FluidSystemMeta implements ECSSystemMeta {
    constructor(
        public readonly systemName: string,
        public readonly nodeSchemaMeta: ECSNodeSchemaMeta
    ) {
    }
}