
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "../../archetype/Archetype.js";
import { ECSNodeSchemaMeta } from "./NodeSchemaMeta.js";

export interface ECSNodeSchemaArchetypeHook {
    onRegisterSchemaArchetype(meta: ECSNodeSchemaMeta, archetype: ECSArchetype): void;
    onRemoveSchemaArchetype(meta: ECSNodeSchemaMeta, archetype: ECSArchetype): void;
}