
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "../../../api/core/component/Component.js";
import { ECSComponentTypeId } from "../../../api/core/component/type/ComponentTypeId.js";



export class FluidComponent<T> implements ECSComponent<T> {
    constructor(
        readonly componentTypeId: ECSComponentTypeId,
        readonly data: T
    ) {
    }
}