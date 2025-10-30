import type { MetaApiError } from "../types/meta-api.js";
export declare class MetaApiErrorHandler {
    static isMetaApiError(error: any): error is MetaApiError;
    static handleResponse(response: any): Promise<any>;
    private static createSpecificError;
    static shouldRetry(error: Error): boolean;
    static getRetryDelay(error: Error, attempt: number): number;
    static getMaxRetries(error: Error): number;
}
export declare class MetaApiProcessingError extends Error {
    readonly httpStatus?: number | undefined;
    readonly errorCode?: number | undefined;
    readonly errorSubcode?: number | undefined;
    readonly errorType?: string | undefined;
    constructor(message: string, httpStatus?: number | undefined, errorCode?: number | undefined, errorSubcode?: number | undefined, errorType?: string | undefined);
    toJSON(): {
        name: string;
        message: string;
        httpStatus: number | undefined;
        errorCode: number | undefined;
        errorSubcode: number | undefined;
        errorType: string | undefined;
    };
}
export declare class MetaAuthError extends MetaApiProcessingError {
    constructor(message: string, errorCode?: number, errorSubcode?: number);
}
export declare class MetaPermissionError extends MetaApiProcessingError {
    constructor(message: string, errorCode?: number, errorSubcode?: number);
}
export declare class MetaValidationError extends MetaApiProcessingError {
    constructor(message: string, errorCode?: number, errorSubcode?: number);
}
export declare class MetaApplicationLimitError extends MetaApiProcessingError {
    constructor(message: string, errorCode?: number, errorSubcode?: number);
}
export declare class MetaUserLimitError extends MetaApiProcessingError {
    constructor(message: string, errorCode?: number, errorSubcode?: number);
}
export declare function retryWithBackoff<T>(operation: () => Promise<T>, context?: string): Promise<T>;
//# sourceMappingURL=error-handler.d.ts.map