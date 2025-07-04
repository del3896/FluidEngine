
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "./ComponentType.js";
import {ECSComponentTypeId} from "./ComponentTypeId.js";

export interface ECSComponentTypeRegistry {
    hasComponentType(id: ECSComponentTypeId): boolean;
    getComponentType<T>(id: ECSComponentTypeId): ECSComponentType<T>;
    addComponentType<T>(componentType: ECSComponentType<T>): void;
    removeComponentType(id: ECSComponentTypeId): void;
}
