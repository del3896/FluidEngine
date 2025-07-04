
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentManager } from "./component/ComponentManager.js";
import { ECSEntityManager } from "./entity/EntityManager.js";
import { ECSNodeManager } from "./node/NodeManager.js";
import { ECSSystemOrchestrator } from "./system/SystemOrchestrator.js";

export interface Core {
    getEntityManager(): ECSEntityManager;
    getComponentManager(): ECSComponentManager;
    getSystemOrchestrator(): ECSSystemOrchestrator;
    getNodeManager(): ECSNodeManager;
    update(): void;
}