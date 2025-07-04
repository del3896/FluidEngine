
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityFactory } from "../../../api/core/entity/EntityFactory.js";
import { ECSEntityId } from "../../../api/core/entity/EntityId.js";
import { FluidEntityId } from "./FluidEntityId.js";


export class FluidEntityFactory implements ECSEntityFactory {
    private static readonly prefix = "FluidEntity";
    private readonly tag: string;
    constructor(
    ) {
        this.tag = `${FluidEntityFactory.prefix}_`;
    }

    createEntityId(): ECSEntityId {
        const tag = this.tag;
        const stringId = tag + Date.now();
        return new FluidEntityId(stringId);
    }
}