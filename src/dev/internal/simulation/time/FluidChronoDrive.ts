
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ChronoDrive } from "../../../api/index.js";
import { ChronoDriveHook } from "../../../api/simulation/time/ChronoDriveHook.js";

export interface FluidChronoDriveOptions {
    timeScale?: number;
    tickHook?: ChronoDriveHook;
    intervalHook?: ChronoDriveHook;
    deltaTimeAccumulationThreshold?: number;
    maxSubstepsPerTick?: number;
}

/**
 * FluidChronoDrive manages two concurrent flows of time: a continuous real-time flow, which updates every animation frame and reflects the passage of time as perceived by the user, and a discrete simulated time flow, which advances in fixed-size intervals to ensure deterministic updates to systems like physics or game logic. This dual-flow design enables precise, consistent simulation behavior without being tethered to frame rate fluctuations, and allows for sophisticated time manipulation like scaling, pausing, or catching up missed steps.
 * 
 * @implements ChronoDrive
 */
export class FluidChronoDrive implements ChronoDrive {
    private tickInterval: number;
    /** Real-time, not scaled by timeScale */
    private elapsedTime: number;
    private elapsedTicks: number;
    private deltaTime: number;
    private timeScale: number;
    private tickHook: ChronoDriveHook;
    private intervalHook: ChronoDriveHook;
    private active: boolean;
    private lastTickTime: number;
    private deltaTimeAccumulationThreshold: number;
    private deltaTimeAccumulator: number;
    private maxSubstepsPerTick: number;
    private tickSubsteps: number;
    private readonly loopCallback = () => this.loop();

    constructor(
        tickIntervalMillis: number,
        {
            timeScale = 1,
            tickHook = undefined,
            intervalHook = undefined,
            deltaTimeAccumulationThreshold = 5 * tickIntervalMillis,
            maxSubstepsPerTick = 5
        }: FluidChronoDriveOptions = {}
    ) {
        this.tickInterval = tickIntervalMillis;
        this.elapsedTime = 0;
        this.elapsedTicks = 0;
        this.deltaTime = 0;
        this.timeScale = timeScale;
        this.tickHook = tickHook;
        this.intervalHook = intervalHook;
        this.active = false;
        this.lastTickTime = 0;
        this.deltaTimeAccumulationThreshold = deltaTimeAccumulationThreshold;
        this.deltaTimeAccumulator = 0;
        this.maxSubstepsPerTick = maxSubstepsPerTick;
        this.tickSubsteps = 0;
    }

    getElapsedTime(): number {
        return this.elapsedTime;
    }

    getElapsedTickCount(): number {
        return this.elapsedTicks;
    }

    getDeltaTime(): number {
        return this.deltaTime;
    }

    getTickInterval(): number {
        return this.tickInterval;
    }

    setTickInterval(tickIntervalMillis: number): void {
        this.tickInterval = tickIntervalMillis;
    }

    getTimeScale(): number {
        return this.timeScale;
    }

    setTimeScale(scale: number): void {
        this.timeScale = scale;
    }

    isActive(): boolean {
        return this.active;
    }

    private loop(): void {
        this.tick();
        if (this.active)
            requestAnimationFrame(this.loopCallback);
    }

    private tick(): void {
        const tickInterval = this.tickInterval;
        const currentTime = performance.now();
        let deltaTime = currentTime - this.lastTickTime;

        const timeScale = this.timeScale;
        this.deltaTime = deltaTime;
        this.lastTickTime = currentTime;

        this.deltaTimeAccumulator += Math.min(deltaTime, this.deltaTimeAccumulationThreshold);

        this.tickHook?.(deltaTime * timeScale);

        while (this.deltaTimeAccumulator >= tickInterval && this.tickSubsteps++ < this.maxSubstepsPerTick) {
            this.intervalHook?.(tickInterval * timeScale);
            this.elapsedTicks++;
            this.elapsedTime += tickInterval;
            this.deltaTimeAccumulator -= tickInterval;
        }

        this.tickSubsteps = 0;
    }

    start(): void {
        if (!this.active) {
            this.active = true;
            this.lastTickTime = performance.now();
            this.loop();
        }
    }

    stop(): void {
        this.active = false;
    }

    toggle(): void {
        if (this.active)
            this.stop();
        else
            this.start();
    }

    reset(): void {
        this.elapsedTime = 0;
        this.elapsedTicks = 0;
        this.deltaTime = 0;
        this.deltaTimeAccumulator = 0;
        this.lastTickTime = performance.now();
    }

    getTickHook(): ChronoDriveHook | undefined {
        return this.tickHook;
    }

    setTickHook(hook: ChronoDriveHook): void {
        this.tickHook = hook;
    }

    clearTickHook(): void {
        this.tickHook = undefined;
    }

    getIntervalHook(): ChronoDriveHook | undefined {
        return this.intervalHook;
    }

    setIntervalHook(hook: ChronoDriveHook): void {
        this.intervalHook = hook;
    }

    clearIntervalHook(): void {
        this.intervalHook = undefined;
    }
}