
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentTypeId} from "./type/ComponentTypeId.js";

export interface ECSComponent<T> {
    readonly componentTypeId: ECSComponentTypeId;
    readonly data: T;
}