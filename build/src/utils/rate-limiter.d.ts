export declare class RateLimiter {
    private config;
    private accountStates;
    constructor(isDevelopmentTier?: boolean);
    private getAccountState;
    private updateScore;
    checkRateLimit(accountId: string, isWriteCall?: boolean): Promise<void>;
    getCurrentScore(accountId: string): number;
    getRemainingCapacity(accountId: string): number;
    isAccountBlocked(accountId: string): boolean;
    getBlockTimeRemaining(accountId: string): number;
    waitForCapacity(accountId: string, requiredScore?: number): Promise<void>;
}
export declare class RateLimitError extends Error {
    readonly retryAfterMs: number;
    constructor(message: string, retryAfterMs: number);
}
export declare const globalRateLimiter: RateLimiter;
//# sourceMappingURL=rate-limiter.d.ts.map