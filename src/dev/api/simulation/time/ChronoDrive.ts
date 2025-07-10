
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ChronoDriveHook } from "./ChronoDriveHook.js";

/**
 * ChronoDrive is a time management and ticking system, designed to control time flow 
 * for real-time applications like games, simulations, and animations.
 */
export interface ChronoDrive {
    /** Returns the total time passed while active, in milliseconds */
    getElapsedTime(): number;

    /** Returns how many ticks have occurred since start/reset */
    getElapsedTickCount(): number;

    /** Returns the time passed between the last two ticks*/
    getDeltaTime(): number;

    /** Gets the interval between ticks, in milliseconds */
    getTickInterval(): number;

    /** Sets the interval between ticks, in milliseconds */
    setTickInterval(tickIntervalMillis: number): void;

    /** Gets the speed multiplier of the time (1 is the normal speed) */
    getTimeScale(): number;

    /** Sets the speed multiplier of the time (1 is the normal speed) */
    setTimeScale(scale: number): void;

    /** Returns true if currently active and false if otherwise */
    isActive(): boolean;

    /** Starts/resumes activity */
    start(): void;

    /** Stops/pauses activity */
    stop(): void;

    /** Toggles activity on and off */
    toggle(): void;

    /** Resets time passed and elapsed tick count */
    reset(): void;

    /** Gets the hook dispatched every tick (variable interval) */
    getTickHook(): ChronoDriveHook | undefined;

    /** Sets the hook dispatched every tick (variable interval) */
    setTickHook(hook: ChronoDriveHook): void;

    /** Clear tick hook */
    clearTickHook(): void;

    /** Gets the hook dispatched every fixed tick interval */
    getIntervalHook(): ChronoDriveHook | undefined;

    /** Sets the hook dispatched every fixed tick interval */
    setIntervalHook(hook: ChronoDriveHook): void;

    /** Clear interval hook */
    clearIntervalHook(): void;
}