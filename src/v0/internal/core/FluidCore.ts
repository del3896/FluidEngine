
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentManager } from "../../api/core/component/ComponentManager.js";
import { ECSComponentRepositoryHook } from "../../api/core/component/ComponentRepositoryHook.js";
import { ECSComponentTypeRegistryHook } from "../../api/core/component/type/ComponentTypeRegistryHook.js";
import { Core } from "../../api/core/Core.js";
import { ECSEntityArchetypeHook } from "../../api/core/entity/EntityArchetypeHook.js";
import { ECSEntityId } from "../../api/core/entity/EntityId.js";
import { ECSEntityManager } from "../../api/core/entity/EntityManager.js";
import { ECSNodeManager } from "../../api/core/node/NodeManager.js";
import { ECSNodeSchemaArchetypeHook } from "../../api/core/node/schema/NodeSchemaArchetypeHook.js";
import { ECSNodeSchemaRegistryHook } from "../../api/core/node/schema/NodeSchemaRegistryHook.js";
import { ECSNodeSchemaResolver } from "../../api/core/node/schema/NodeSchemaResolver.js";
import { ECSSystemOrchestrator } from "../../api/core/system/SystemOrchestrator.js";
import { FluidArchetypeRegistry } from "./archetype/FluidArchetypeRegistry.js";
import { FluidComponentFactory } from "./component/FluidComponentFactory.js";
import { FluidComponentManager } from "./component/FluidComponentManager.js";
import { FluidComponentRepository } from "./component/FluidComponentRepository.js";
import { FluidComponentTypeFactory } from "./component/type/FluidComponentTypeFactory.js";
import { FluidComponentTypeRegistry } from "./component/type/FluidComponentTypeRegistry.js";
import { FluidComponentTypeResolver } from "./component/type/FluidComponentTypeResolver.js";
import { FluidEntityArchetypeCoordinator } from "./entity/FluidEntityArchetypeCoordinator.js";
import { FluidEntityFactory } from "./entity/FluidEntityFactory.js";
import { FluidEntityManager } from "./entity/FluidEntityManager.js";
import { FluidEntityProxyFactory } from "./entity/FluidEntityProxyFactory.js";
import { FluidNodeFactory } from "./node/FluidNodeFactory.js";
import { FluidNodeManager } from "./node/FluidNodeManager.js";
import { FluidNodeRepository } from "./node/FluidNodeRepository.js";
import { FluidNodeSchemaArchetypeBridge } from "./node/schema/FluidNodeSchemaArchetypeBridge.js";
import { FluidNodeSchemaIndex } from "./node/schema/FluidNodeSchemaIndex.js";
import { FluidNodeSchemaRegistry } from "./node/schema/FluidNodeSchemaRegistry.js";
import { FluidSystemOrchestrator } from "./system/FluidSystemOrchestrator.js";
import { FluidHookDispatcher } from "./util/FluidHookDispatcher.js";



const FLUID_CORE_SYMBOL = Symbol.for("FluidCore");

export class FluidCore implements Core {
    static bootstrap(): FluidCore {
        // Prepare Component Manager
        const componentTypeRegistryHookDispatcher = new FluidHookDispatcher<ECSComponentTypeRegistryHook>();
        const componentTypeRegistry = new FluidComponentTypeRegistry(componentTypeRegistryHookDispatcher);

        const componentRepositoryHookDispatcher = new FluidHookDispatcher<ECSComponentRepositoryHook>();
        const componentRepository = new FluidComponentRepository(
            componentTypeRegistry.getComponentType.bind(componentTypeRegistry),
            componentRepositoryHookDispatcher
        );

        const componentFactory = new FluidComponentFactory();
        const componentTypeResolver = new FluidComponentTypeResolver();
        const componentTypeFactory = new FluidComponentTypeFactory(componentFactory);

        const componentManager = new FluidComponentManager(
            componentTypeFactory,
            componentTypeRegistry,
            componentTypeResolver,
            componentFactory,
            componentRepository
        );

        const archetypeRegistry = new FluidArchetypeRegistry();

        // Prepare Entity Archetype Coordinator
        const entityArchetypeHookDispatcher = new FluidHookDispatcher<ECSEntityArchetypeHook>();
        const entityArchetypeCoordinator = new FluidEntityArchetypeCoordinator(
            archetypeRegistry,
            (entityId: ECSEntityId) => componentRepository.getEntityComponentTypes(entityId),
            entityArchetypeHookDispatcher
        );

        // Prepare Node Schema-Archetype Bridge
        const nodeSchemaArchetypeHookDispatcher = new FluidHookDispatcher<ECSNodeSchemaArchetypeHook>();
        const nodeSchemaArchetypeBridge = new FluidNodeSchemaArchetypeBridge(
            archetypeRegistry,
            nodeSchemaArchetypeHookDispatcher
        );

        // Prepare Node Manager
        const nodeRepository = new FluidNodeRepository();
        const nodeFactory = new FluidNodeFactory(
            componentRepository.getComponent.bind(componentRepository)
        );

        const nodeSchemaRegistryHookDispatcher = new FluidHookDispatcher<ECSNodeSchemaRegistryHook>();
        const nodeSchemaRegistry = new FluidNodeSchemaRegistry(nodeSchemaRegistryHookDispatcher);

        const getNodeSchemaBySymbol: ECSNodeSchemaResolver = nodeSchemaRegistry.getSchemaBySymbol.bind(nodeSchemaRegistry);
        const getFluidArchetypeOfNodeSchema = nodeSchemaArchetypeBridge.getOrCreateArchetype.bind(nodeSchemaArchetypeBridge);
        const nodeSchemaIndex = new FluidNodeSchemaIndex(
            getNodeSchemaBySymbol,
            getFluidArchetypeOfNodeSchema
        );

        const nodeManager = new FluidNodeManager(
            nodeRepository,
            nodeRepository,
            nodeFactory,
            nodeSchemaRegistry,
            getFluidArchetypeOfNodeSchema,
            nodeSchemaIndex
        );


        // Prepare Entity Manager
        const entityProxyFactory = new FluidEntityProxyFactory(
            componentRepository
        );
        const entityManager = new FluidEntityManager(
            new FluidEntityFactory(),
            entityProxyFactory
        );

        // Prepare System Orchestrator
        const systemOrchestrator = new FluidSystemOrchestrator();

        // Hook the component type factory into the component type registry for id-related logic on unregisteration of types.
        componentTypeRegistryHookDispatcher.addHook(componentTypeFactory);

        // Hook the entity archetype coordinator into the component repository to update entity archetypes upon
        // Addition/removal of components
        componentRepositoryHookDispatcher.addHook(entityArchetypeCoordinator);

        // Hook the schema index into the schema registry to update the index upon registration/deregistration of schemas
        nodeSchemaRegistryHookDispatcher.addHook(nodeSchemaIndex);

        // Hook the node manager into the entity archetype bridge to update nodes on changes in an entity's archetype.
        entityArchetypeHookDispatcher.addHook(nodeManager);


        const core = new FluidCore(
            entityManager,
            componentManager,
            systemOrchestrator,
            nodeManager
        );
        return core;
    }

    static isFluidCore(core: Core): core is FluidCore {
        return (core as any)[FLUID_CORE_SYMBOL] === true;
    }

    static {
        Object.defineProperty(FluidCore.prototype, FLUID_CORE_SYMBOL, {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }

    constructor(
        private entityManager: ECSEntityManager,
        private componentManager: ECSComponentManager,
        private systemOrchestrator: ECSSystemOrchestrator,
        private nodeManager: ECSNodeManager
    ) {
    }

    update(): void {
        this.systemOrchestrator.update(this.getNodeManager().getNodeIndex());
    }

    getEntityManager(): ECSEntityManager {
        return this.entityManager;
    }

    getComponentManager(): ECSComponentManager {
        return this.componentManager;
    }

    getSystemOrchestrator(): ECSSystemOrchestrator {
        return this.systemOrchestrator;
    }

    getNodeManager(): ECSNodeManager {
        return this.nodeManager;
    }
}

