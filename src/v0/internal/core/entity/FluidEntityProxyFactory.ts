
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentRepository } from "../../../api/core/component/ComponentRepository.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { ECSEntityProxy } from "../../../api/core/entity/EntityProxy.js";
import { ECSEntityProxyFactory } from "../../../api/core/entity/EntityProxyFactory.js";
import { FluidEntityProxy } from "./FluidEntityProxy.js";


export class FluidEntityProxyFactory implements ECSEntityProxyFactory {
    constructor(
        private readonly componentRepository: ECSComponentRepository
    ) { }

    createProxy(entityId: ECSEntityId): ECSEntityProxy {
        return new FluidEntityProxy(entityId, this.componentRepository);
    }
}