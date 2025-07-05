
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { Core, CoreRuntime, ECSComponent, ECSComponentType, ECSEntityId, ECSEntityProxy, ECSNodeSchema, ECSNodeSchemaMeta, FluidAPI } from "../api/index.js";
import { FluidCore } from "./index.js";


namespace FluidInternal {
    export function initialize(core: Core): Core {
        CoreRuntime.initialize(core);
        return core;
    }

    export function bootstrap(): Core {
        return FluidInternal.initialize(FluidCore.bootstrap());
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

    export function getEntityComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): ECSComponent<T> {
        return FluidInternal.core().getComponentManager().getComponentRepository().getComponent(componentType, entityId);
    }

    export function removeEntityComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): void {
        FluidInternal.core().getComponentManager().getComponentRepository().removeComponent(componentType, entityId);
    }

    export function entityHasComponent<T>(entityId: ECSEntityId, componentType: ECSComponentType<T>): boolean {
        return FluidInternal.core().getComponentManager().getComponentRepository().hasComponent(componentType, entityId);
    }
}

const fluidInternal: FluidAPI = FluidInternal;
export { fluidInternal as Fluid };