
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "../../archetype/Archetype";
import { ECSNodeSchemaMeta } from "./NodeSchemaMeta";

export interface ECSNodeSchemaArchetypeHook {
    onRegisterSchemaArchetype(meta: ECSNodeSchemaMeta, archetype: ECSArchetype): void;
    onRemoveSchemaArchetype(meta: ECSNodeSchemaMeta, archetype: ECSArchetype): void;
}