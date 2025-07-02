
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

export interface HookDispatcher<T> {
    addHook(hook: T): void;
    removeHook(hook: T): void;
    invokeHooks(fn: (hook: T) => void): void;
    hookList(): readonly T[];
}
