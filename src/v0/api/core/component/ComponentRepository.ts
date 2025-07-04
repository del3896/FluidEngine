
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityId } from "../entity/EntityId.js";
import { ECSComponent } from "./Component.js";
import { ECSComponentType } from "./type/ComponentType.js";

export interface ECSComponentRepository {
    hasComponent<T>(componentType: ECSComponentType<T>, entityId: ECSEntityId): boolean;
    getComponent<T>(componentType: ECSComponentType<T>, entityId: ECSEntityId): ECSComponent<T>;
    addComponent<T>(component: ECSComponent<T>, entityId: ECSEntityId): void
    removeComponent<T>(componentType: ECSComponentType<T>, entityId: ECSEntityId): void;

    hasEntity(entityId: ECSEntityId): boolean;
    removeEntityComponents(entiyId: ECSEntityId): void;
    getEntityComponentTypes(entityId: ECSEntityId): Iterable<ECSComponentType<any>>;
    getEntityComponents(entityId: ECSEntityId): Iterable<ECSComponent<any>>;
}