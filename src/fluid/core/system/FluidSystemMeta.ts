
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeSchemaMeta } from "../../../api/core/node/schema/NodeSchemaMeta";
import { ECSSystemMeta } from "../../../api/core/system/SystemMeta";


export class FluidSystemMeta implements ECSSystemMeta {
    constructor(
        public readonly systemName: string,
        public readonly nodeSchemaMeta: ECSNodeSchemaMeta
    ) {
    }
}