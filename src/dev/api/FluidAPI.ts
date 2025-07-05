
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { Core, ECSComponentType, ECSNodeSchema, ECSNodeSchemaMeta, ECSEntityId, ECSEntityProxy, ECSComponent } from "../../v0/api/index.js";


export interface FluidAPI {
    initialize(core: Core): Core;
    bootstrap(): Core;
    core(): Core;
    defineComponentType<T>(name: string): ECSComponentType<T>;
    registerNodeSchema<S extends ECSNodeSchema>(nodeSchema: S, name: string): ECSNodeSchemaMeta;

    getEntityProxy(entityId: ECSEntityId): ECSEntityProxy;

    createEntityWithComponents(...components: ECSComponent<any>[]): ECSEntityId;
    removeEntity(entityId: ECSEntityId): void;

    entityHasComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): boolean;
    addEntityComponent<T>(entityId: ECSEntityId, component: ECSComponent<T>): void;
    addEntityComponents(entityId: ECSEntityId, ...components: ECSComponent<any>[]): void;
    getEntityComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): ECSComponent<T>;
    removeEntityComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): void;
}