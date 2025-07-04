
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentType } from "../component/type/ComponentType.js";

export interface ECSArchetype {
    equals(other: ECSArchetype): boolean;
    isSuperSetOf(other: ECSArchetype): boolean;
    has<T>(componentType: ECSComponentType<T>): boolean;
    with<T>(componentType: ECSComponentType<T>): ECSArchetype;
    without<T>(componentType: ECSComponentType<T>): ECSArchetype;
}