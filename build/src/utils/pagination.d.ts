import type { MetaApiResponse } from "../types/meta-api.js";
export interface PaginationParams {
    limit?: number;
    after?: string;
    before?: string;
}
export interface PaginatedResult<T> {
    data: T[];
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount?: number;
}
export declare class PaginationHelper {
    static buildPaginationParams(params: PaginationParams): URLSearchParams;
    static parsePaginatedResponse<T>(response: MetaApiResponse<T>): PaginatedResult<T>;
    static getNextPageParams(result: PaginatedResult<any>, currentLimit?: number): PaginationParams | null;
    static getPreviousPageParams(result: PaginatedResult<any>, currentLimit?: number): PaginationParams | null;
    static fetchAllPages<T>(fetchPage: (params: PaginationParams) => Promise<PaginatedResult<T>>, initialParams?: PaginationParams, maxPages?: number): AsyncGenerator<T[], void, unknown>;
    static collectAllPages<T>(fetchPage: (params: PaginationParams) => Promise<PaginatedResult<T>>, initialParams?: PaginationParams, maxPages?: number, maxItems?: number): Promise<T[]>;
    static createBatchedRequests<T>(items: T[], batchSize?: number): T[][];
    static processBatchedRequests<TInput, TOutput>(items: TInput[], processor: (batch: TInput[]) => Promise<TOutput[]>, batchSize?: number, delayMs?: number): Promise<TOutput[]>;
    static extractCursorFromUrl(url: string | undefined): string | undefined;
    static buildPageInfo(result: PaginatedResult<any>): {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | undefined;
        endCursor: string | undefined;
        totalCount: number | undefined;
    };
}
//# sourceMappingURL=pagination.d.ts.map