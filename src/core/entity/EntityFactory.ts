
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSEntityId} from "./EntityId";

export interface ECSEntityFactory {
    createEntityId(): ECSEntityId;
}