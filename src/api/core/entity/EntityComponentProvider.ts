
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponent} from "../component/Component.js";
import {ECSComponentType} from "../component/type/ComponentType.js";
import {ECSEntityId} from "./EntityId.js";

export interface ECSEntityComponentProvider {
    <T>(componentType: ECSComponentType<T>, entityId: ECSEntityId): ECSComponent<T>;
}