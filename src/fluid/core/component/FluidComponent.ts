
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "api/core/component/Component";
import { ECSComponentTypeId } from "api/core/component/type/ComponentTypeId";


export class FluidComponent<T> implements ECSComponent<T> {
    constructor(
        readonly componentTypeId: ECSComponentTypeId,
        readonly data: T
    ) {
    }
}