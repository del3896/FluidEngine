
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeIndex } from "../node/NodeIndex.js";
import { ECSNodeSchema } from "../node/schema/NodeSchema.js";
import { ECSSystem } from "./System.js";

export interface ECSSystemPhase {
    getName(): string;

    hasSystem<S extends ECSNodeSchema>(system: ECSSystem<S>): boolean;
    addSystem<S extends ECSNodeSchema>(system: ECSSystem<S>, inPhaseOrder: number): void;
    pushSystem<S extends ECSNodeSchema>(system: ECSSystem<S>): void;
    pushSystems(...systems: ECSSystem<ECSNodeSchema>[]): void
    removeSystem<S extends ECSNodeSchema>(system: ECSSystem<S>): void;
    getSystems(): Iterable<ECSSystem<ECSNodeSchema>>;

    preUpdate?(): void;
    postUpdate?(): void;
    update(nodeIndex: ECSNodeIndex): void;
}