
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {ECSNodeFactory} from "./NodeFactory.js";
import {ECSNodeIndex} from "./NodeIndex.js";
import {ECSNodeRepository} from "./NodeRepository.js";
import {ECSNodeSchemaRegistry} from "./schema/NodeSchemaRegistry.js";

export interface ECSNodeManager {
    getNodeRepository(): ECSNodeRepository;
    getNodeFactory(): ECSNodeFactory;
    getNodeSchemaRegistry(): ECSNodeSchemaRegistry;
    getNodeIndex(): ECSNodeIndex;
}