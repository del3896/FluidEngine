
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "./ComponentType";
import {ECSComponentTypeRegistry} from "./ComponentTypeRegistry";

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