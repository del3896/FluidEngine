
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "../entity/EntityId.js";
import {ECSComponent} from "./Component.js";
import {ECSComponentType} from "./type/ComponentType.js";

export interface ECSComponentRepositoryHook {
    onAddComponent<T>(componentType: ECSComponentType<T>, component: ECSComponent<T>, entityId: ECSEntityId): void;
    onRemoveComponent<T>(componentType: ECSComponentType<T>, component: ECSComponent<T>, entityId: ECSEntityId): void;
}