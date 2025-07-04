
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "../../../api/core/component/Component.js";
import { ECSComponentFactory } from "../../../api/core/component/ComponentFactory.js";
import { ECSComponentType } from "../../../api/core/component/type/ComponentType.js";
import { FluidComponent } from "./FluidComponent.js";


export class FluidComponentFactory implements ECSComponentFactory {
    createComponent<T>(componentType: ECSComponentType<T>, componentData: T, copyData: boolean): ECSComponent<T> {
        return new FluidComponent(componentType.getId(), copyData ? { ...componentData } : componentData);
    }
}