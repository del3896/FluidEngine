
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityComponentProvider } from "../../../api/core/entity/EntityComponentProvider.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { ECSNode } from "../../../api/core/node/Node.js";
import { ECSNodeFactory } from "../../../api/core/node/NodeFactory.js";
import { ECSNodeSchema } from "../../../api/core/node/schema/NodeSchema.js";
import { ECSNodeSchemaMeta } from "../../../api/core/node/schema/NodeSchemaMeta.js";


export class FluidNodeFactory implements ECSNodeFactory {
    constructor(
        private getComponent: ECSEntityComponentProvider
    ) { }

    createNode<S extends ECSNodeSchema>(schemaMeta: ECSNodeSchemaMeta, entityId: ECSEntityId): ECSNode<S> {
        const schemaId = schemaMeta.id,
            schema = schemaMeta.schema;

        const node = { entityId };

        for (const [key, componentType] of Object.entries(schema)) {
            const component = this.getComponent(componentType, entityId);

            if (!component) {
                throw new Error(`Failed to create node from schema '${schemaId.getName()}': could not find component of type '${componentType.getId().getName()}' associated with entity id '${entityId.toString()}'`);
            }

            node[key] = component.data;
        }

        return node as ECSNode<S>;
    }
}