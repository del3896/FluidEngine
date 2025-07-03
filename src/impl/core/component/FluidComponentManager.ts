
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "core/component/ComponentFactory";
import { ECSComponentManager } from "core/component/ComponentManager";
import { ECSComponentRepository } from "core/component/ComponentRepository";
import { ECSComponentTypeFactory } from "core/component/type/ComponentTypeFactory";
import { ECSComponentTypeRegistry } from "core/component/type/ComponentTypeRegistry";
import { ECSComponentTypeResolver } from "core/component/type/ComponentTypeResolver";


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