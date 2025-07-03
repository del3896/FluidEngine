
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "core/archetype/Archetype";
import { ECSComponentType } from "core/component/type/ComponentType";
import { ECSNodeSchemaMeta } from "./NodeSchemaMeta";


export interface ECSNodeSchemaIndex {
    getSchemasWithComponentType<T>(componentType: ECSComponentType<T>): Iterable<ECSNodeSchemaMeta>;
    getSchemasWithArchetype(archetype: ECSArchetype): Iterable<ECSNodeSchemaMeta>;
}