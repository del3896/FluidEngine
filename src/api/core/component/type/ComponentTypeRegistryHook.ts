
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "./ComponentType.js";
import {ECSComponentTypeRegistry} from "./ComponentTypeRegistry.js";

export interface ECSComponentTypeRegistryHook {
    onRegisterComponentType<T>(
        registry: ECSComponentTypeRegistry,
        componentType: ECSComponentType<T>
    ): void;

    onUnregisterComponentType<T>(
        registry: ECSComponentTypeRegistry,
        componentType: ECSComponentType<T>
    ): void;
}