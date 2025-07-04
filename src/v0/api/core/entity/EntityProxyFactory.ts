
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "./EntityId.js";
import {ECSEntityProxy} from "./EntityProxy.js";

export interface ECSEntityProxyFactory {
    createProxy(entityId: ECSEntityId): ECSEntityProxy;
}