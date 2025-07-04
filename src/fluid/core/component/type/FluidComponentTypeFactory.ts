
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "../../../../api/core/component/ComponentFactory.js";
import { ECSComponentType } from "../../../../api/core/component/type/ComponentType.js";
import { ECSComponentTypeFactory } from "../../../../api/core/component/type/ComponentTypeFactory.js";
import { ECSComponentTypeRegistry } from "../../../../api/core/component/type/ComponentTypeRegistry.js";
import { ECSComponentTypeRegistryHook } from "../../../../api/core/component/type/ComponentTypeRegistryHook.js";
import { FluidComponentType } from "./FluidComponentType.js";
import { FluidComponentTypeId } from "./FluidComponentTypeId.js";

export class FluidComponentTypeFactory implements ECSComponentTypeFactory, ECSComponentTypeRegistryHook {
    private nextNumericId: number = 0;
    private removedNumericIds: Set<number> = new Set();

    constructor(
        private readonly componentFactory: ECSComponentFactory
    ) {
    }

    onRegisterComponentType<T>(registry: ECSComponentTypeRegistry, componentType: ECSComponentType<T>): void {
        // No action required
    }

    onUnregisterComponentType<T>(registry: ECSComponentTypeRegistry, componentType: ECSComponentType<T>): void {
        this.removedNumericIds.add(componentType.getId().getNumericId());
    }

    createComponentType<T>(name: string): ECSComponentType<T> {
        let numericId: number;
        if (this.removedNumericIds.size > 0) {
            numericId = this.removedNumericIds.values().next().value;
            this.removedNumericIds.delete(numericId);
        } else {
            numericId = this.nextNumericId++;
        }

        return new FluidComponentType<T>(new FluidComponentTypeId(name, numericId), this.componentFactory);
    }
}