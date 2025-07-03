
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "../../../../api/core/component/ComponentFactory";
import { ECSComponentType } from "../../../../api/core/component/type/ComponentType";
import { ECSComponentTypeFactory } from "../../../../api/core/component/type/ComponentTypeFactory";
import { ECSComponentTypeRegistry } from "../../../../api/core/component/type/ComponentTypeRegistry";
import { ECSComponentTypeRegistryHook } from "../../../../api/core/component/type/ComponentTypeRegistryHook";
import { FluidComponentType } from "./FluidComponentType";
import { FluidComponentTypeId } from "./FluidComponentTypeId";

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