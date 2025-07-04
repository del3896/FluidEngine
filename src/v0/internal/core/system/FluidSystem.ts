
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNode } from "../../../api/core/node/Node.js";
import { ECSNodeSchema } from "../../../api/core/node/schema/NodeSchema.js";
import { ECSNodeSchemaMeta } from "../../../api/core/node/schema/NodeSchemaMeta.js";
import { ECSSystem } from "../../../api/core/system/System.js";
import { ECSSystemMeta } from "../../../api/core/system/SystemMeta.js";
import { FluidSystemMeta } from "./FluidSystemMeta.js";

export abstract class FluidSystem<S extends ECSNodeSchema> implements ECSSystem<S> {
    private readonly systemMeta: ECSSystemMeta;
    constructor(
        name: string,
        nodeSchemaMeta: ECSNodeSchemaMeta
    ) {
        this.systemMeta = new FluidSystemMeta(name, nodeSchemaMeta);
    }

    getSystemMeta(): ECSSystemMeta {
        return this.systemMeta;
    }

    updateNode?(node: ECSNode<S>): void;

    updateNodes(nodes: Iterable<ECSNode<S>>): void {
        for (const node of nodes) {
            if (this.updateNode)
                this.updateNode(node);
        }
    };
}