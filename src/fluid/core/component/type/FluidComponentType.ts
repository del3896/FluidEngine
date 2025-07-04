
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "../../../../api/core/component/Component.js";
import { ECSComponentFactory } from "../../../../api/core/component/ComponentFactory.js";
import { ECSComponentType } from "../../../../api/core/component/type/ComponentType.js";
import { ECSComponentTypeId } from "../../../../api/core/component/type/ComponentTypeId.js";
import { FluidComponentTypeId } from "./FluidComponentTypeId.js";

export class FluidComponentType<T> implements ECSComponentType<T> {
    constructor(
        private readonly id: FluidComponentTypeId,
        private readonly factory: ECSComponentFactory
    ) {
    }

    getId(): ECSComponentTypeId {
        return this.id;
    }

    is(component: ECSComponent<any>): component is ECSComponent<T> {
        return this.id.equals(component.componentTypeId);
    }

    createComponent(data: T, copyData: boolean = false): ECSComponent<T> {
        return this.factory.createComponent(this, data, copyData);
    }
}