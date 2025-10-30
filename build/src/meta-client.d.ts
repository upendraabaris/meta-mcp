import { AuthManager } from "./utils/auth.js";
import { type PaginationParams, type PaginatedResult } from "./utils/pagination.js";
import type { Campaign, AdSet, Ad, AdCreative, AdInsights, CustomAudience, AdAccount, BatchRequest, BatchResponse } from "./types/meta-api.js";
export declare class MetaApiClient {
    private auth;
    constructor(auth?: AuthManager);
    get authManager(): AuthManager;
    private makeRequest;
    private buildQueryString;
    getAdAccounts(): Promise<AdAccount[]>;
    getCampaigns(accountId: string, params?: PaginationParams & {
        status?: string[];
        fields?: string[];
    }): Promise<PaginatedResult<Campaign>>;
    getCampaign(campaignId: string): Promise<Campaign>;
    createCampaign(accountId: string, campaignData: {
        name: string;
        objective: string;
        status?: string;
        daily_budget?: number;
        lifetime_budget?: number;
        start_time?: string;
        stop_time?: string;
        special_ad_categories?: string[];
        bid_strategy?: string;
        bid_cap?: number;
        is_budget_optimization_enabled?: boolean;
    }): Promise<{
        id: string;
    }>;
    updateCampaign(campaignId: string, updates: {
        name?: string;
        status?: string;
        daily_budget?: number;
        lifetime_budget?: number;
        start_time?: string;
        stop_time?: string;
    }): Promise<{
        success: boolean;
    }>;
    deleteCampaign(campaignId: string): Promise<{
        success: boolean;
    }>;
    getAdSets(params?: PaginationParams & {
        campaignId?: string;
        accountId?: string;
        status?: string;
        fields?: string[];
    }): Promise<PaginatedResult<AdSet>>;
    createAdSet(campaignId: string, adSetData: {
        name: string;
        daily_budget?: number;
        lifetime_budget?: number;
        optimization_goal: string;
        billing_event: string;
        bid_amount?: number;
        start_time?: string;
        end_time?: string;
        targeting?: any;
        status?: string;
        promoted_object?: {
            page_id?: string;
            pixel_id?: string;
            application_id?: string;
            object_store_url?: string;
            custom_event_type?: string;
        };
        attribution_spec?: Array<{
            event_type: string;
            window_days: number;
        }>;
        destination_type?: string;
        is_dynamic_creative?: boolean;
        use_new_app_click?: boolean;
        configured_status?: string;
        optimization_sub_event?: string;
        recurring_budget_semantics?: boolean;
    }): Promise<{
        id: string;
    }>;
    getInsights(objectId: string, params?: {
        level?: "account" | "campaign" | "adset" | "ad";
        date_preset?: string;
        time_range?: {
            since: string;
            until: string;
        };
        fields?: string[];
        breakdowns?: string[];
        limit?: number;
        after?: string;
    }): Promise<PaginatedResult<AdInsights>>;
    getCustomAudiences(accountId: string, params?: PaginationParams & {
        fields?: string[];
    }): Promise<PaginatedResult<CustomAudience>>;
    createCustomAudience(accountId: string, audienceData: {
        name: string;
        description?: string;
        subtype: string;
        customer_file_source?: string;
        retention_days?: number;
        rule?: any;
    }): Promise<{
        id: string;
    }>;
    createLookalikeAudience(accountId: string, audienceData: {
        name: string;
        origin_audience_id: string;
        country: string;
        ratio: number;
        description?: string;
    }): Promise<{
        id: string;
    }>;
    getAdCreatives(accountId: string, params?: PaginationParams & {
        fields?: string[];
    }): Promise<PaginatedResult<AdCreative>>;
    createAdCreative(accountId: string, creativeData: {
        name: string;
        object_story_spec: any;
        degrees_of_freedom_spec?: any;
    }): Promise<AdCreative>;
    createAd(adSetId: string, adData: {
        name: string;
        adset_id: string;
        creative: {
            creative_id: string;
        };
        status?: string;
    }): Promise<Ad>;
    getAds(params?: PaginationParams & {
        adsetId?: string;
        campaignId?: string;
        accountId?: string;
        status?: string;
        fields?: string[];
    }): Promise<PaginatedResult<Ad>>;
    getAdsByCampaign(campaignId: string, params?: PaginationParams & {
        status?: string[];
    }): Promise<PaginatedResult<Ad>>;
    getAdsByAccount(accountId: string, params?: PaginationParams & {
        status?: string[];
    }): Promise<PaginatedResult<Ad>>;
    getAdAccount(accountId: string): Promise<AdAccount>;
    getFundingSources(accountId: string): Promise<any[]>;
    getAccountBusiness(accountId: string): Promise<any>;
    getCustomAudience(audienceId: string): Promise<CustomAudience>;
    batchRequest(requests: BatchRequest[]): Promise<BatchResponse[]>;
    estimateAudienceSize(accountId: string, targeting: any, optimizationGoal: string): Promise<{
        estimate_mau: number;
        estimate_dau?: number;
    }>;
    generateAdPreview(creativeId: string, adFormat: string, productItemIds?: string[]): Promise<{
        body: string;
    }>;
    extractAccountIdFromObjectId(objectId: string): string | undefined;
    uploadImageFromUrl(accountId: string, imageUrl: string, imageName?: string): Promise<{
        hash: string;
        url: string;
        name: string;
    }>;
}
//# sourceMappingURL=meta-client.d.ts.map