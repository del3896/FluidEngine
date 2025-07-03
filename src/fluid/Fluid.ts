
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponent } from "api/core/component/Component";
import { ECSComponentType } from "api/core/component/type/ComponentType";
import { Core } from "api/core/Core";
import { CoreRuntime } from "api/core/CoreRuntime";
import { ECSEntityId } from "api/core/entity/EntityId";
import { ECSEntityProxy } from "api/core/entity/EntityProxy";
import { ECSNodeSchema } from "api/core/node/schema/NodeSchema";
import { ECSNodeSchemaMeta } from "api/core/node/schema/NodeSchemaMeta";
import { FluidCore } from "./core/FluidCore";
import { FluidAPI } from "api/FluidAPI";


function FluidInternal(core: Core): Core {
    CoreRuntime.initialize(core);
    return core;
}

namespace FluidInternal {
    export function bootstrap(): Core {
        return FluidInternal(FluidCore.bootstrap());
    }

    export function core(): Core {
        return CoreRuntime.getInstance();
    }

    /**
     * Defines and internally registers a new component type with `T` as the shape of its data and `name` attached to it.
     * 
     * @param name A descriptive string for this type. This value will be attached to the type and will only be used for debugging and logging. It is not used for identity checks.
     * @returns A unique component type with `T` as the shape of its data and `name` attached to it.
     */
    export function defineComponentType<T>(name: string): ECSComponentType<T> {
        const componentManager = FluidInternal.core().getComponentManager();
        const componentType = componentManager.getComponentTypeFactory().createComponentType<T>(name);
        componentManager.getComponentTypeRegistry().addComponentType(componentType);
        return componentType;
    }

    export function registerNodeSchema<S extends ECSNodeSchema>(nodeSchema: S, name: string): ECSNodeSchemaMeta {
        return FluidInternal.core().getNodeManager().getNodeSchemaRegistry().addSchema(nodeSchema, name);
    }

    export function getEntityProxy(entityId: ECSEntityId): ECSEntityProxy {
        return FluidInternal.core().getEntityManager().getEntityProxy(entityId);
    }

    export function removeEntity(entityId: ECSEntityId): void {
        FluidInternal.core().getEntityManager().removeEntity(entityId);
        FluidInternal.core().getComponentManager().getComponentRepository().removeEntityComponents(entityId);
    }

    export function addEntityComponent<T>(entityId: ECSEntityId, component: ECSComponent<T>): void {
        FluidInternal.core().getComponentManager().getComponentRepository().addComponent(component, entityId);
    }

    export function addEntityComponents(entityId: ECSEntityId, ...components: ECSComponent<any>[]) {
        const componentRepo = FluidInternal.core().getComponentManager().getComponentRepository();
        for (const component of components) {
            componentRepo.addComponent(component, entityId);
        }
    }

    export function createEntityWithComponents(...components: ECSComponent<any>[]): ECSEntityId {
        const entityId = FluidInternal.core().getEntityManager().createEntity();
        FluidInternal.addEntityComponents(entityId, ...components);
        return entityId;
    }
}

const fluidInternal: FluidAPI = FluidInternal;
export default fluidInternal;