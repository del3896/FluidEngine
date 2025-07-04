
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityFactory } from "./EntityFactory.js";
import { ECSEntityId } from "./EntityId.js";
import { ECSEntityProxy } from "./EntityProxy.js";
import { ECSEntityProxyFactory } from "./EntityProxyFactory.js";
import { ECSEntityResolver } from "./EntityResolver.js";

export interface ECSEntityManager {
    getEntityFactory(): ECSEntityFactory;
    getEntityProxyFactory(): ECSEntityProxyFactory;
    getEntityResolver(): ECSEntityResolver;

    getEntities(): Iterable<ECSEntityId>;

    hasEntity(entityId: ECSEntityId): boolean;
    removeEntity(entityId: ECSEntityId): void;
    addEntity(entityId: ECSEntityId): void;

    createEntity(): ECSEntityId;

    getEntityProxy(entityId: ECSEntityId): ECSEntityProxy;
}