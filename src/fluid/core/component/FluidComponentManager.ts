
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "api/core/component/ComponentFactory";
import { ECSComponentManager } from "api/core/component/ComponentManager";
import { ECSComponentRepository } from "api/core/component/ComponentRepository";
import { ECSComponentTypeFactory } from "api/core/component/type/ComponentTypeFactory";
import { ECSComponentTypeRegistry } from "api/core/component/type/ComponentTypeRegistry";
import { ECSComponentTypeResolver } from "api/core/component/type/ComponentTypeResolver";


export class FluidComponentManager implements ECSComponentManager {
    constructor(
        private componentTypeFactory: ECSComponentTypeFactory,
        private componentTypeRegistry: ECSComponentTypeRegistry,
        private componentTypeResolver: ECSComponentTypeResolver,
        private componentFactory: ECSComponentFactory,
        private componentRepository: ECSComponentRepository,
    ) {
    }

    getComponentTypeResolver(): ECSComponentTypeResolver {
        return this.componentTypeResolver;
    }

    getComponentTypeFactory(): ECSComponentTypeFactory {
        return this.componentTypeFactory;
    }

    getComponentTypeRegistry(): ECSComponentTypeRegistry {
        return this.componentTypeRegistry;
    }

    getComponentFactory(): ECSComponentFactory {
        return this.componentFactory;
    }

    getComponentRepository(): ECSComponentRepository {
        return this.componentRepository;
    }
}