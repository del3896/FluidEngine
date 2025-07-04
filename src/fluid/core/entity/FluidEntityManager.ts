
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityFactory } from "../../../api/core/entity/EntityFactory.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { ECSEntityManager } from "../../../api/core/entity/EntityManager.js";
import { ECSEntityProxy } from "../../../api/core/entity/EntityProxy.js";
import { ECSEntityProxyFactory } from "../../../api/core/entity/EntityProxyFactory.js";
import { ECSEntityResolver } from "../../../api/core/entity/EntityResolver.js";




export class FluidEntityManager implements ECSEntityManager, ECSEntityResolver {
    private readonly idMap: Map<symbol, ECSEntityId> = new Map();
    private readonly proxyMap: Map<symbol, ECSEntityProxy> = new Map();

    constructor(
        private readonly entityFactory: ECSEntityFactory,
        private readonly proxyFactory: ECSEntityProxyFactory
    ) {

    }

    getEntityBySymbol(entitySymbol: symbol): ECSEntityId {
        return this.idMap.get(entitySymbol);
    }

    getEntityResolver(): ECSEntityResolver {
        return this;
    }

    getEntityFactory(): ECSEntityFactory {
        return this.entityFactory;
    }

    getEntityProxyFactory(): ECSEntityProxyFactory {
        return this.proxyFactory;
    }

    getEntities(): Iterable<ECSEntityId> {
        return this.idMap.values();
    }

    hasEntity(entityId: ECSEntityId): boolean {
        return this.idMap.has(entityId.getSymbol());
    }

    removeEntity(entityId: ECSEntityId): void {
        this.idMap.delete(entityId.getSymbol());
        this.proxyMap.delete(entityId.getSymbol());
    }

    addEntity(entityId: ECSEntityId): void {
        this.idMap.set(entityId.getSymbol(), entityId);
    }

    createEntity(): ECSEntityId {
        const id = this.entityFactory.createEntityId();
        this.addEntity(id);
        return id;
    }

    getEntityProxy(entityId: ECSEntityId): ECSEntityProxy {
        const key = entityId.getSymbol();
        let proxy = this.proxyMap.get(key);
        if (!proxy) {
            proxy = this.proxyFactory.createProxy(entityId);
            this.proxyMap.set(key, proxy);
        }
        return proxy;
    }
}