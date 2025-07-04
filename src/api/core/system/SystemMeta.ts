
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchemaMeta} from "../node/schema/NodeSchemaMeta.js";

export interface ECSSystemMeta {
    readonly systemName: string;
    readonly nodeSchemaMeta: ECSNodeSchemaMeta;
}