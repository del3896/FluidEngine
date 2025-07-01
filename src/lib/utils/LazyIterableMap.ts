
/* 
    Released under MIT License
    Copyright(c) 2025 Del Elbanna
*/

export function* getLazyMappedIterable<T, U>(source: Iterable<T>, map: (item: T) => U): Iterable<U> {
    for (const item of source) {
        yield map(item);
    }
}