
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "@fluid/core/component/Component";
import { ECSComponentTypeId } from "@fluid/core/component/type/ComponentTypeId";

export class FluidComponent<T> implements ECSComponent<T> {
    constructor(
        readonly componentTypeId: ECSComponentTypeId,
        readonly data: T
    ) {
    }
}