
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

import {ECSNodeSchemaMeta} from "../node/schema/NodeSchemaMeta";

export interface ECSSystemMeta {
    readonly systemName: string;
    readonly nodeSchemaMeta: ECSNodeSchemaMeta;
}