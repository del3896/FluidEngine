
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityId } from "./EntityId.js";

export interface ECSEntityResolver {
    getEntityBySymbol(entitySymbol: symbol): ECSEntityId;
}