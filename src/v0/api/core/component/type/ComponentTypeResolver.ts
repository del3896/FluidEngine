
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "./ComponentType.js";

export interface ECSComponentTypeResolver {
    getBySymbol<T>(symbol: symbol): ECSComponentType<T>;
    getByNumericId<T>(numId: number): ECSComponentType<T>;
}