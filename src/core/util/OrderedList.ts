
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

export interface OrderedList<T> {
    has(value: T): boolean;
    get(index: number): T;
    getAll(): Iterable<T>;
    insert(value: T, order: number): void;
    remove(value: T): void;
    findInsertionIndex(order: number): number;
    getSize(): number;
    clear(): void;
}