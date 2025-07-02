
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "@fluid/core/component/Component";
import { ECSComponentFactory } from "@fluid/core/component/ComponentFactory";
import { ECSComponentType } from "@fluid/core/component/type/ComponentType";
import { FluidComponent } from "./FluidComponent";

export class FluidComponentFactory implements ECSComponentFactory {
    createComponent<T>(componentType: ECSComponentType<T>, componentData: T, copyData: boolean): ECSComponent<T> {
        return new FluidComponent(componentType.getId(), copyData ? { ...componentData } : componentData);
    }
}