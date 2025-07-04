
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "../../archetype/Archetype.js";
import { ECSComponentType } from "../../component/type/ComponentType.js";
import { ECSNodeSchemaMeta } from "./NodeSchemaMeta.js";


export interface ECSNodeSchemaIndex {
    getSchemasWithComponentType<T>(componentType: ECSComponentType<T>): Iterable<ECSNodeSchemaMeta>;
    getSchemasWithArchetype(archetype: ECSArchetype): Iterable<ECSNodeSchemaMeta>;
}