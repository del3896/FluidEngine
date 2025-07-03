
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "core/component/Component";
import { ECSComponentRepository } from "core/component/ComponentRepository";
import { ECSComponentType } from "core/component/type/ComponentType";
import { ECSEntityId } from "core/entity/EntityId";
import { ECSEntityProxy } from "core/entity/EntityProxy";


export class FluidEntityProxy implements ECSEntityProxy {
    constructor(
        private readonly entityId: ECSEntityId,
        private readonly componentRepository: ECSComponentRepository,
    ) {
    }

    hasComponent<T>(componentType: ECSComponentType<T>): boolean {
        return this.componentRepository.hasComponent(componentType, this.entityId);
    }

    getComponent<T>(componentType: ECSComponentType<T>): ECSComponent<T> {
        return this.componentRepository.getComponent(componentType, this.entityId);
    }

    addComponent<T>(component: ECSComponent<T>): void {
        this.componentRepository.addComponent(component, this.entityId);
    }

    removeComponent<T>(componentType: ECSComponentType<T>): void {
        this.componentRepository.removeComponent(componentType, this.entityId);
    }
}
