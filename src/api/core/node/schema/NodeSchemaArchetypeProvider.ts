
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchemaMeta} from "./NodeSchemaMeta";
import {ECSArchetype} from "../../archetype/Archetype";

export interface ECSNodeSchemaArchetypeProvider {
    (schema: ECSNodeSchemaMeta): ECSArchetype;
}