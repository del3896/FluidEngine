
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "api/core/archetype/Archetype";
import { ECSComponentType } from "api/core/component/type/ComponentType";
import { ECSEntityId } from "./EntityId";

export interface ECSEntityArchetypeHook {
    onEntityArchetypeExpansion(entityId: ECSEntityId, addedComponentType: ECSComponentType<any>, previousArchetype: ECSArchetype, newArchetype: ECSArchetype): void;
    onEntityArchetypeReduction(entityId: ECSEntityId, removedComponentType: ECSComponentType<any>, previousArchetype: ECSArchetype, newArchetype: ECSArchetype): void;
}