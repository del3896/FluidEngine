
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeSchemaId } from "../../../../api/core/node/schema/NodeSchemaId.js";



export class FluidNodeSchemaId implements ECSNodeSchemaId {
    private idSymbol: symbol;
    private timeStamp: number;
    private stringified: string;

    constructor(name: string) {
        this.timeStamp = Date.now();
        this.stringified = `FluidNodeSchemaId[${this.timeStamp}ms](${name})`;
        this.idSymbol = Symbol(this.stringified);
    }

    equals(other: ECSNodeSchemaId): boolean {
        return (other instanceof FluidNodeSchemaId && other.idSymbol === this.idSymbol);
    }

    getName(): string {
        return this.stringified;
    }

    getSymbol(): symbol {
        return this.idSymbol;
    }
}