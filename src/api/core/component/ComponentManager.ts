
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentFactory } from "./ComponentFactory.js";
import { ECSComponentRepository } from "./ComponentRepository.js";
import { ECSComponentTypeFactory } from "./type/ComponentTypeFactory.js";
import { ECSComponentTypeRegistry } from "./type/ComponentTypeRegistry.js";
import { ECSComponentTypeResolver } from "./type/ComponentTypeResolver.js";

export interface ECSComponentManager {
    getComponentTypeFactory(): ECSComponentTypeFactory;
    getComponentTypeRegistry(): ECSComponentTypeRegistry;
    getComponentTypeResolver(): ECSComponentTypeResolver;
    getComponentFactory(): ECSComponentFactory;
    getComponentRepository(): ECSComponentRepository;
}