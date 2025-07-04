
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeSchemaMeta} from "./NodeSchemaMeta.js";
import {ECSArchetype} from "../../archetype/Archetype.js";

export interface ECSNodeSchemaArchetypeProvider {
    (schema: ECSNodeSchemaMeta): ECSArchetype;
}