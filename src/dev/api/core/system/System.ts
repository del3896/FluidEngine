
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeSchema } from "../../../../v0/api/index.js";
import { ECSSystemUpdateContext } from "./SystemUpdateContext.js";

export interface ECSSystem<S extends ECSNodeSchema> {
    updateNodes(context: ECSSystemUpdateContext<S>): void;
}