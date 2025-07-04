
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "../../../api/core/archetype/Archetype.js";
import { ECSComponent } from "../../../api/core/component/Component.js";
import { ECSComponentRepositoryHook } from "../../../api/core/component/ComponentRepositoryHook.js";
import { ECSComponentType } from "../../../api/core/component/type/ComponentType.js";
import { ECSEntityArchetypeHook } from "../../../api/core/entity/EntityArchetypeHook.js";
import { ECSEntityArchetypeResolver } from "../../../api/core/entity/EntityArchetypeResolver.js";
import { ECSEntityComponentTypesProvider } from "../../../api/core/entity/EntityComponentTypesProvider.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { HookDispatcher } from "../../../api/core/util/hook/HookDispatcher.js";
import { FluidArchetype } from "../archetype/FluidArchetype.js";
import { FluidArchetypeRegistry } from "../archetype/FluidArchetypeRegistry.js";


export class FluidEntityArchetypeCoordinator implements ECSEntityArchetypeResolver, ECSComponentRepositoryHook {
    private archetypeMap: Map<symbol, FluidArchetype> = new Map();

    constructor(
        private archetypeRegistry: FluidArchetypeRegistry,
        private getEntityComponentTypes: ECSEntityComponentTypesProvider,
        private entityArchetypeHooks: HookDispatcher<ECSEntityArchetypeHook>
    ) {
    }

    private computeArchetypeBitSet(entityId: ECSEntityId): bigint {
        const componentTypeIterable = this.getEntityComponentTypes(entityId);
        return FluidArchetype.computeArchetypeBitSet(componentTypeIterable);
    }

    getArchetypeOfEntity(entityId: ECSEntityId): ECSArchetype {
        const idSymbol = entityId.getSymbol();

        if (this.archetypeMap.has(idSymbol)) {
            return this.archetypeMap.get(idSymbol);
        }

        const bitSet = this.computeArchetypeBitSet(entityId);
        const archetype = this.archetypeRegistry.getOrCreate(bitSet);
        this.archetypeMap.set(idSymbol, archetype);
        return archetype;
    }

    onAddComponent<T>(componentType: ECSComponentType<T>, component: ECSComponent<T>, entityId: ECSEntityId): void {
        const idSymbol = entityId.getSymbol();

        const currentBitSet: bigint =
            this.archetypeMap.get(idSymbol)?.getBitSet() ??
            this.computeArchetypeBitSet(entityId);
        const currentArchetype = this.archetypeRegistry.getOrCreate(currentBitSet);

        const newBitSet = currentBitSet | FluidArchetype.getBitMask(componentType);
        const newArchetype = this.archetypeRegistry.getOrCreate(newBitSet);

        this.archetypeMap.set(idSymbol, newArchetype);
        this.entityArchetypeHooks.invokeHooks(h => h.onEntityArchetypeExpansion(entityId, componentType, currentArchetype, newArchetype));
    }

    onRemoveComponent<T>(componentType: ECSComponentType<T>, component: ECSComponent<T>, entityId: ECSEntityId): void {
        const idSymbol = entityId.getSymbol();

        const currentBitSet: bigint =
            this.archetypeMap.get(idSymbol)?.getBitSet() ??
            this.computeArchetypeBitSet(entityId);
        const currentArchetype = this.archetypeRegistry.getOrCreate(currentBitSet);

        const newBitSet = currentBitSet & ~FluidArchetype.getBitMask(componentType);
        const newArchetype = this.archetypeRegistry.getOrCreate(newBitSet);

        this.archetypeMap.set(idSymbol, newArchetype);
        this.entityArchetypeHooks.invokeHooks(h => h.onEntityArchetypeReduction(entityId, componentType, currentArchetype, newArchetype));
    }
}