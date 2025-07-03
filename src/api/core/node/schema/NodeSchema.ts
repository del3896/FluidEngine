
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSComponentType } from "../../component/type/ComponentType";



export type ECSNodeSchema = {
    readonly [key: string]: ECSComponentType<any>;
};

