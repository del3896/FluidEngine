
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSArchetype } from "api/core/archetype/Archetype";
import { ECSComponentType } from "api/core/component/type/ComponentType";
import { ECSEntityArchetypeHook } from "api/core/entity/EntityArchetypeHook";
import { ECSEntityId } from "api/core/entity/EntityId";
import { ECSNodeFactory } from "api/core/node/NodeFactory";
import { ECSNodeIndex } from "api/core/node/NodeIndex";
import { ECSNodeManager } from "api/core/node/NodeManager";
import { ECSNodeRepository } from "api/core/node/NodeRepository";
import { ECSNodeSchemaArchetypeProvider } from "api/core/node/schema/NodeSchemaArchetypeProvider";
import { ECSNodeSchemaIndex } from "api/core/node/schema/NodeSchemaIndex";
import { ECSNodeSchemaRegistry } from "api/core/node/schema/NodeSchemaRegistry";

export class FluidNodeManager implements ECSNodeManager, ECSEntityArchetypeHook {
    constructor(
        private nodeRepository: ECSNodeRepository,
        private nodeIndex: ECSNodeIndex,
        private nodeFactory: ECSNodeFactory,
        private nodeSchemaRegistry: ECSNodeSchemaRegistry,
        private getArchetypeOfNodeSchema: ECSNodeSchemaArchetypeProvider,
        private nodeSchemaIndex: ECSNodeSchemaIndex
    ) { }

    getNodeIndex(): ECSNodeIndex {
        return this.nodeIndex;
    }

    getNodeRepository(): ECSNodeRepository {
        return this.nodeRepository;
    }

    getNodeFactory(): ECSNodeFactory {
        return this.nodeFactory;
    }

    getNodeSchemaRegistry(): ECSNodeSchemaRegistry {
        return this.nodeSchemaRegistry;
    }

    /*  
        Archetype Hook Implementation
    */

    onEntityArchetypeExpansion(entityId: ECSEntityId, addedComponentType: ECSComponentType<any>, previousArchetype: ECSArchetype, newArchetype: ECSArchetype): void {
        for (const schemaMeta of this.nodeSchemaIndex.getSchemasWithComponentType(addedComponentType)) {
            const schemaId = schemaMeta.id;
            const schemaArchetype = this.getArchetypeOfNodeSchema(schemaMeta);

            if (!newArchetype.isSuperSetOf(schemaArchetype))
                continue;

            if (this.nodeRepository.hasNode(schemaId, entityId))
                continue;

            try {
                const node = this.nodeFactory.createNode(schemaMeta, entityId);
                this.nodeRepository.addNode(schemaId, node);
            } catch (e) {
                throw new Error(
                    `Failed to create/add node for entity ${entityId.toString()} under schema '${schemaId.getName()}': ${e.message}`,
                    { cause: e }
                );
            }
        }
    }

    onEntityArchetypeReduction(entityId: ECSEntityId, removedComponentType: ECSComponentType<any>, previousArchetype: ECSArchetype, newArchetype: ECSArchetype): void {
        for (const schemaMeta of this.nodeSchemaIndex.getSchemasWithComponentType(removedComponentType)) {
            const schemaId = schemaMeta.id;
            const schemaArchetype = this.getArchetypeOfNodeSchema(schemaMeta);

            if (!newArchetype.isSuperSetOf(schemaArchetype) && this.nodeRepository.hasNode(schemaId, entityId)) {
                this.nodeRepository.removeNode(schemaId, entityId);
            }
        }
    }
}