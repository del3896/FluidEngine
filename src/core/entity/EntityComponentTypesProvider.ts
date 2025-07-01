
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

import {ECSComponentType} from "../component/type/ComponentType";
import {ECSEntityId} from "./EntityId";

export interface ECSEntityComponentTypesProvider {
    (entityId: ECSEntityId): Iterable<ECSComponentType<any>>;
}