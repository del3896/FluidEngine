
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "api/core/component/ComponentFactory";
import { FluidComponent } from "./FluidComponent";
import { ECSComponent } from "api/core/component/Component";
import { ECSComponentType } from "api/core/component/type/ComponentType";

export class FluidComponentFactory implements ECSComponentFactory {
    createComponent<T>(componentType: ECSComponentType<T>, componentData: T, copyData: boolean): ECSComponent<T> {
        return new FluidComponent(componentType.getId(), copyData ? { ...componentData } : componentData);
    }
}