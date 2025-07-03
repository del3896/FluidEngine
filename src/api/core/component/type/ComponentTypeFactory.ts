
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "./ComponentType";

export interface ECSComponentTypeFactory {
    createComponentType<T>(name: string): ECSComponentType<T>;
}