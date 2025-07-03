
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

export interface ECSNodeSchemaId {
    equals(other: ECSNodeSchemaId): boolean;

    getName(): string;
    getSymbol(): symbol;
}