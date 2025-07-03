
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentRepository } from "api/core/component/ComponentRepository";
import { ECSEntityId } from "api/core/entity/EntityId";
import { ECSEntityProxy } from "api/core/entity/EntityProxy";
import { ECSEntityProxyFactory } from "api/core/entity/EntityProxyFactory";
import { FluidEntityProxy } from "./FluidEntityProxy";


export class FluidEntityProxyFactory implements ECSEntityProxyFactory {
    constructor(
        private readonly componentRepository: ECSComponentRepository
    ) { }

    createProxy(entityId: ECSEntityId): ECSEntityProxy {
        return new FluidEntityProxy(entityId, this.componentRepository);
    }
}