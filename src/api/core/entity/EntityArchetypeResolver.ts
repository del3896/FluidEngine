
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSArchetype} from "../archetype/Archetype";
import {ECSEntityId} from "./EntityId";

export interface ECSEntityArchetypeResolver {
    getArchetypeOfEntity(entityId: ECSEntityId): ECSArchetype;
}