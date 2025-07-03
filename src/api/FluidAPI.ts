
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "./core/component/Component";
import { ECSComponentType } from "./core/component/type/ComponentType";
import { Core } from "./core/Core";
import { ECSEntityId } from "./core/entity/EntityId";
import { ECSEntityProxy } from "./core/entity/EntityProxy";
import { ECSNodeSchema } from "./core/node/schema/NodeSchema";
import { ECSNodeSchemaMeta } from "./core/node/schema/NodeSchemaMeta";

export interface FluidAPI {
    initialize(core: Core): Core;
    bootstrap(): Core;
    core(): Core;
    defineComponentType<T>(name: string): ECSComponentType<T>;
    registerNodeSchema<S extends ECSNodeSchema>(nodeSchema: S, name: string): ECSNodeSchemaMeta;
    getEntityProxy(entityId: ECSEntityId): ECSEntityProxy;
    removeEntity(entityId: ECSEntityId): void;
    addEntityComponent<T>(entityId: ECSEntityId, component: ECSComponent<T>): void;
    addEntityComponents(entityId: ECSEntityId, ...components: ECSComponent<any>[]): void;
    createEntityWithComponents(...components: ECSComponent<any>[]): ECSEntityId;
}