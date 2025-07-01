
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

import { ECSEntityFactory } from "./EntityFactory";
import { ECSEntityId } from "./EntityId";
import { ECSEntityProxy } from "./EntityProxy";
import { ECSEntityProxyFactory } from "./EntityProxyFactory";
import { ECSEntityResolver } from "./EntityResolver";

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