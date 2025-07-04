
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeSchema } from "../../../../api/core/node/schema/NodeSchema.js";
import { ECSNodeSchemaId } from "../../../../api/core/node/schema/NodeSchemaId.js";
import { ECSNodeSchemaMeta } from "../../../../api/core/node/schema/NodeSchemaMeta.js";
import { ECSNodeSchemaRegistry } from "../../../../api/core/node/schema/NodeSchemaRegistry.js";
import { ECSNodeSchemaRegistryHook } from "../../../../api/core/node/schema/NodeSchemaRegistryHook.js";
import { HookDispatcher } from "../../../../api/core/util/hook/HookDispatcher.js";
import { FluidNodeSchemaId } from "./FluidNodeSchemaId.js";

export class FluidNodeSchemaRegistry implements ECSNodeSchemaRegistry {
    private schemaMap: Map<symbol, ECSNodeSchemaMeta> = new Map();

    constructor(
        private hooks: HookDispatcher<ECSNodeSchemaRegistryHook>
    ) {
    }

    hasSchema(schemaId: ECSNodeSchemaId): boolean {
        return this.schemaMap.has(schemaId.getSymbol());
    }

    getSchemaBySymbol(idSymbol: symbol): ECSNodeSchemaMeta {
        const meta = this.schemaMap.get(idSymbol);
        if (!meta)
            throw new Error(`Could not find schema using symbol.`);
        return meta;
    }

    getSchema(schemaId: ECSNodeSchemaId): ECSNodeSchemaMeta {
        const idSymbol = schemaId.getSymbol();
        const meta = this.schemaMap.get(idSymbol);
        if (!meta)
            throw new Error(`Could not find schema '${schemaId.getName()}'`);
        return meta;
    }

    addSchema(schema: ECSNodeSchema, name: string): ECSNodeSchemaMeta {
        const id = new FluidNodeSchemaId(name);
        const meta: ECSNodeSchemaMeta = { id, schema };
        this.schemaMap.set(id.getSymbol(), meta);

        this.hooks.invokeHooks(h => h.onRegisterNodeSchema(meta));
        return meta;
    }

    removeSchema(schemaId: ECSNodeSchemaId): void {
        const idSymbol = schemaId.getSymbol();
        const meta = this.schemaMap.get(idSymbol);

        if (!meta)
            throw new Error(`Could not remove schema '${schemaId.getName()}'`);

        this.schemaMap.delete(idSymbol);

        this.hooks.invokeHooks(h => h.onUnregisterNodeSchema(meta));
    }


}