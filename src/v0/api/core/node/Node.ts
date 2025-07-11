
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSComponentType} from "../component/type/ComponentType.js";
import {ECSEntityId} from "../entity/EntityId.js";
import {ECSNodeSchema} from "./schema/NodeSchema.js";

export type ECSNodeComponentUnion<S extends ECSNodeSchema> =
    S[keyof S] extends ECSComponentType<infer T> ? T : never;

export type ECSNodeComponentSet<S extends ECSNodeSchema> =
    Set<ECSNodeComponentUnion<S>>;

export type ECSNodeComponentTypeSet<S extends ECSNodeSchema> =
    Set<S[keyof S]>;

export interface ECSEntityIdContainer {
    readonly entityId: ECSEntityId;
}

export type ECSNode<S extends ECSNodeSchema> =
    ECSEntityIdContainer &
    {
        readonly [K in keyof S]: S[K] extends ECSComponentType<infer T> ? T : never;
    };