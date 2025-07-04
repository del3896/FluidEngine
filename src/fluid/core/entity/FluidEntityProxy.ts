
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "../../../api/core/component/Component.js";
import { ECSComponentRepository } from "../../../api/core/component/ComponentRepository.js";
import { ECSComponentType } from "../../../api/core/component/type/ComponentType.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { ECSEntityProxy } from "../../../api/core/entity/EntityProxy.js";



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
