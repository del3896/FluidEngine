
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "../component/Component.js";
import { ECSComponentType } from "../component/type/ComponentType.js";

export interface ECSEntityProxy {
    hasComponent<T>(componentType: ECSComponentType<T>): boolean;

    getComponent<T>(componentType: ECSComponentType<T>): ECSComponent<T>;

    addComponent<T>(component: ECSComponent<T>): void;

    removeComponent<T>(componentType: ECSComponentType<T>): void;
}