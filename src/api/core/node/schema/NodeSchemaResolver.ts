
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchemaMeta} from "./NodeSchemaMeta.js";

export interface ECSNodeSchemaResolver {
    (idSymbol: symbol): ECSNodeSchemaMeta;
}