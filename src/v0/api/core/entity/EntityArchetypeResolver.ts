
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSArchetype} from "../archetype/Archetype.js";
import {ECSEntityId} from "./EntityId.js";

export interface ECSEntityArchetypeResolver {
    getArchetypeOfEntity(entityId: ECSEntityId): ECSArchetype;
}