
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentType } from "../../../../api/core/component/type/ComponentType.js";
import { ECSComponentTypeId } from "../../../../api/core/component/type/ComponentTypeId.js";
import { ECSComponentTypeRegistry } from "../../../../api/core/component/type/ComponentTypeRegistry.js";
import { ECSComponentTypeRegistryHook } from "../../../../api/core/component/type/ComponentTypeRegistryHook.js";
import { HookDispatcher } from "../../../../api/core/util/hook/HookDispatcher.js";



export class FluidComponentTypeRegistry implements ECSComponentTypeRegistry {
    private map: Map<symbol, ECSComponentType<any>> = new Map();

    constructor(
        private hooks: HookDispatcher<ECSComponentTypeRegistryHook>
    ) {
    }

    hasComponentType(id: ECSComponentTypeId): boolean {
        return this.map.has(id.getSymbol());
    }

    getComponentType<T>(componentTypeId: ECSComponentTypeId): ECSComponentType<T> {
        const value = this.map.get(componentTypeId.getSymbol());
        if (!value) {
            throw new Error(`Could not retrieve component type '${componentTypeId.toString()}'. This type may not have been registered.`);
        }
        return value;
    }

    removeComponentType(componentTypeId: ECSComponentTypeId): void {
        const idSymbol = componentTypeId.getSymbol();
        const type = this.map.get(idSymbol);

        if (!type) {
            throw new Error(`Could not remove component type '${componentTypeId.toString()}'. This type may not have been registered.`);
        }

        this.map.delete(idSymbol);
        this.hooks.invokeHooks(hook => hook.onUnregisterComponentType(this, type));
    }

    addComponentType<T>(componentType: ECSComponentType<T>): void {
        const id = componentType.getId();
        const idSymbol = id.getSymbol();

        if (this.map.has(idSymbol)) {
            throw new Error(`Could not register component type '${id.toString()}'. This type has already been registered.`);
        }

        this.map.set(idSymbol, componentType);
        this.hooks.invokeHooks(hook => hook.onRegisterComponentType(this, componentType));
    }
}