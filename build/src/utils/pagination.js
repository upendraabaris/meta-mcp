export class PaginationHelper {
    static buildPaginationParams(params) {
        const urlParams = new URLSearchParams();
        if (params.limit !== undefined && params.limit > 0) {
            urlParams.set("limit", params.limit.toString());
        }
        if (params.after) {
            urlParams.set("after", params.after);
        }
        if (params.before) {
            urlParams.set("before", params.before);
        }
        return urlParams;
    }
    static parsePaginatedResponse(response) {
        const hasNextPage = Boolean(response.paging?.next || response.paging?.cursors?.after);
        const hasPreviousPage = Boolean(response.paging?.previous || response.paging?.cursors?.before);
        return {
            data: response.data || [],
            paging: response.paging,
            hasNextPage,
            hasPreviousPage,
        };
    }
    static getNextPageParams(result, currentLimit) {
        if (!result.hasNextPage || !result.paging?.cursors?.after) {
            return null;
        }
        return {
            after: result.paging.cursors.after,
            limit: currentLimit,
        };
    }
    static getPreviousPageParams(result, currentLimit) {
        if (!result.hasPreviousPage || !result.paging?.cursors?.before) {
            return null;
        }
        return {
            before: result.paging.cursors.before,
            limit: currentLimit,
        };
    }
    static async *fetchAllPages(fetchPage, initialParams = {}, maxPages = 100) {
        let currentParams = { ...initialParams };
        let pageCount = 0;
        while (pageCount < maxPages) {
            const result = await fetchPage(currentParams);
            yield result.data;
            pageCount++;
            if (!result.hasNextPage) {
                break;
            }
            const nextParams = this.getNextPageParams(result, currentParams.limit);
            if (!nextParams) {
                break;
            }
            currentParams = { ...currentParams, ...nextParams };
        }
    }
    static async collectAllPages(fetchPage, initialParams = {}, maxPages = 50, maxItems = 5000) {
        const allItems = [];
        for await (const pageData of this.fetchAllPages(fetchPage, initialParams, maxPages)) {
            allItems.push(...pageData);
            if (allItems.length >= maxItems) {
                allItems.splice(maxItems); // Trim to max items
                break;
            }
        }
        return allItems;
    }
    static createBatchedRequests(items, batchSize = 50) {
        const batches = [];
        for (let i = 0; i < items.length; i += batchSize) {
            batches.push(items.slice(i, i + batchSize));
        }
        return batches;
    }
    static async processBatchedRequests(items, processor, batchSize = 50, delayMs = 1000) {
        const batches = this.createBatchedRequests(items, batchSize);
        const results = [];
        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            try {
                const batchResults = await processor(batch);
                results.push(...batchResults);
            }
            catch (error) {
                console.error(`Batch ${i + 1}/${batches.length} failed:`, error);
                throw error;
            }
            // Add delay between batches to respect rate limits
            if (i < batches.length - 1 && delayMs > 0) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
        return results;
    }
    static extractCursorFromUrl(url) {
        if (!url)
            return undefined;
        try {
            const urlObj = new URL(url);
            return (urlObj.searchParams.get("after") ||
                urlObj.searchParams.get("before") ||
                undefined);
        }
        catch {
            return undefined;
        }
    }
    static buildPageInfo(result) {
        return {
            hasNextPage: result.hasNextPage,
            hasPreviousPage: result.hasPreviousPage,
            startCursor: result.paging?.cursors?.before,
            endCursor: result.paging?.cursors?.after,
            totalCount: result.totalCount,
        };
    }
}
//# sourceMappingURL=pagination.js.map