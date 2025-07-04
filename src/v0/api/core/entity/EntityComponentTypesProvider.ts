
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "../component/type/ComponentType.js";
import {ECSEntityId} from "./EntityId.js";

export interface ECSEntityComponentTypesProvider {
    (entityId: ECSEntityId): Iterable<ECSComponentType<any>>;
}