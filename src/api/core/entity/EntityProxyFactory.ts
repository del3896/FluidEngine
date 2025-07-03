
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "./EntityId";
import {ECSEntityProxy} from "./EntityProxy";

export interface ECSEntityProxyFactory {
    createProxy(entityId: ECSEntityId): ECSEntityProxy;
}