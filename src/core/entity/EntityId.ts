
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

export interface ECSEntityId {
    equals(other: ECSEntityId): boolean;

    getSymbol(): symbol;

    /**
     * @returns a unique string representation of this entity id.
     */
    toString(): string;
}
