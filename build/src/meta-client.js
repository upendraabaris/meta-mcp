import fetch from "node-fetch";
import { AuthManager } from "./utils/auth.js";
import { globalRateLimiter } from "./utils/rate-limiter.js";
import { MetaApiErrorHandler, retryWithBackoff, } from "./utils/error-handler.js";
import { PaginationHelper, } from "./utils/pagination.js";
export class MetaApiClient {
    auth;
    constructor(auth) {
        this.auth = auth || AuthManager.fromEnvironment();
    }
    get authManager() {
        return this.auth;
    }
    async makeRequest(endpoint, method = "GET", body, accountId, isWriteCall = false) {
        const url = `${this.auth.getBaseUrl()}/${this.auth.getApiVersion()}/${endpoint}`;
        // Check rate limit if we have an account ID
        if (accountId) {
            await globalRateLimiter.checkRateLimit(accountId, isWriteCall);
        }
        return retryWithBackoff(async () => {
            const headers = this.auth.getAuthHeaders();
            const requestOptions = {
                method,
                headers,
            };
            if (body && method !== "GET") {
                if (typeof body === "string") {
                    requestOptions.body = body;
                    headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
                else {
                    requestOptions.body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }
            }
            const response = await fetch(url, requestOptions);
            return MetaApiErrorHandler.handleResponse(response);
        }, `${method} ${endpoint}`);
    }
    buildQueryString(params) {
        const urlParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    urlParams.set(key, JSON.stringify(value));
                }
                else if (typeof value === "object") {
                    urlParams.set(key, JSON.stringify(value));
                }
                else {
                    urlParams.set(key, String(value));
                }
            }
        }
        return urlParams.toString();
    }
    // Account Methods
    async getAdAccounts() {
        const allAccounts = [];
        let nextUrl = "me/adaccounts?fields=id,name,account_status,balance,currency,timezone_name,business&limit=100";
        // Fetch all pages of accounts
        while (nextUrl) {
            const response = await this.makeRequest(nextUrl);
            allAccounts.push(...response.data);
            // Check if there's a next page
            if (response.paging?.next) {
                // Extract the relative path from the full URL
                const nextPageUrl = new URL(response.paging.next);
                nextUrl = nextPageUrl.pathname.substring(1) + nextPageUrl.search; // Remove leading '/'
            }
            else {
                nextUrl = undefined;
            }
        }
        return allAccounts;
    }
    // Campaign Methods
    async getCampaigns(accountId, params = {}) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const { status, fields, ...paginationParams } = params;
        const queryParams = {
            fields: fields?.join(",") ||
                "id,name,objective,status,effective_status,created_time,updated_time,start_time,stop_time,budget_remaining,daily_budget,lifetime_budget",
            ...paginationParams,
        };
        if (status) {
            queryParams.effective_status = JSON.stringify([status]);
        }
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${formattedAccountId}/campaigns?${query}`, "GET", null, formattedAccountId);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    async getCampaign(campaignId) {
        return this.makeRequest(`${campaignId}?fields=id,name,objective,status,effective_status,created_time,updated_time,start_time,stop_time,budget_remaining,daily_budget,lifetime_budget,account_id`);
    }
    async createCampaign(accountId, campaignData) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const body = this.buildQueryString(campaignData);
        return this.makeRequest(`${formattedAccountId}/campaigns`, "POST", body, formattedAccountId, true);
    }
    async updateCampaign(campaignId, updates) {
        const body = this.buildQueryString(updates);
        return this.makeRequest(campaignId, "POST", body, undefined, true);
    }
    async deleteCampaign(campaignId) {
        return this.makeRequest(campaignId, "DELETE", null, undefined, true);
    }
    // Ad Set Methods
    async getAdSets(params = {}) {
        const { campaignId, accountId, status, fields, ...paginationParams } = params;
        let endpoint;
        if (campaignId) {
            endpoint = `${campaignId}/adsets`;
        }
        else if (accountId) {
            const formattedAccountId = this.auth.getAccountId(accountId);
            endpoint = `${formattedAccountId}/adsets`;
        }
        else {
            throw new Error("Either campaignId or accountId must be provided");
        }
        const queryParams = {
            fields: fields?.join(",") ||
                "id,name,campaign_id,status,effective_status,created_time,updated_time,start_time,end_time,daily_budget,lifetime_budget,bid_amount,billing_event,optimization_goal",
            ...paginationParams,
        };
        if (status) {
            queryParams.effective_status = JSON.stringify([status]);
        }
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${endpoint}?${query}`, "GET", null, accountId ? this.auth.getAccountId(accountId) : undefined);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    async createAdSet(campaignId, adSetData) {
        // First, get the campaign to find its account_id
        const campaign = await this.getCampaign(campaignId);
        const accountId = campaign.account_id;
        if (!accountId) {
            throw new Error("Unable to determine account ID from campaign");
        }
        const formattedAccountId = this.auth.getAccountId(accountId);
        // Ensure campaign_id is included in the request body
        const requestData = {
            ...adSetData,
            campaign_id: campaignId,
        };
        const body = this.buildQueryString(requestData);
        // Enhanced debugging for ad set creation
        console.log("=== AD SET CREATION DEBUG ===");
        console.log("Campaign ID:", campaignId);
        console.log("Account ID:", accountId);
        console.log("Formatted Account ID:", formattedAccountId);
        console.log("Request Data Object:", JSON.stringify(requestData, null, 2));
        console.log("Request Body (URL-encoded):", body);
        console.log("API Endpoint:", `${formattedAccountId}/adsets`);
        console.log("===========================");
        try {
            const result = await this.makeRequest(`${formattedAccountId}/adsets`, "POST", body, formattedAccountId, true);
            console.log("=== AD SET CREATION SUCCESS ===");
            console.log("Created Ad Set ID:", result.id);
            console.log("==============================");
            return result;
        }
        catch (error) {
            console.log("=== AD SET CREATION ERROR ===");
            console.log("Error object:", error);
            if (error instanceof Error) {
                console.log("Error message:", error.message);
                // Try to parse error response if it's JSON
                try {
                    const errorData = JSON.parse(error.message);
                    console.log("Parsed error data:", JSON.stringify(errorData, null, 2));
                    if (errorData.error) {
                        console.log("Meta API Error Details:");
                        console.log("- Message:", errorData.error.message);
                        console.log("- Code:", errorData.error.code);
                        console.log("- Type:", errorData.error.type);
                        console.log("- Error Subcode:", errorData.error.error_subcode);
                        console.log("- FBTrace ID:", errorData.error.fbtrace_id);
                        if (errorData.error.error_data) {
                            console.log("- Error Data:", JSON.stringify(errorData.error.error_data, null, 2));
                        }
                        if (errorData.error.error_user_title) {
                            console.log("- User Title:", errorData.error.error_user_title);
                        }
                        if (errorData.error.error_user_msg) {
                            console.log("- User Message:", errorData.error.error_user_msg);
                        }
                    }
                }
                catch (parseError) {
                    console.log("Could not parse error as JSON, raw message:", error.message);
                }
            }
            console.log("============================");
            throw error;
        }
    }
    // Insights Methods
    async getInsights(objectId, params = {}) {
        const queryParams = {
            fields: params.fields?.join(",") ||
                "impressions,clicks,spend,reach,frequency,ctr,cpc,cpm,actions,cost_per_action_type",
            ...params,
        };
        if (params.time_range) {
            queryParams.time_range = params.time_range;
        }
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${objectId}/insights?${query}`);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    // Custom Audience Methods
    async getCustomAudiences(accountId, params = {}) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const { fields, ...paginationParams } = params;
        const queryParams = {
            fields: fields?.join(",") ||
                "id,name,description,subtype,approximate_count,data_source,retention_days,creation_time,operation_status",
            ...paginationParams,
        };
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${formattedAccountId}/customaudiences?${query}`, "GET", null, formattedAccountId);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    async createCustomAudience(accountId, audienceData) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const body = this.buildQueryString(audienceData);
        return this.makeRequest(`${formattedAccountId}/customaudiences`, "POST", body, formattedAccountId, true);
    }
    async createLookalikeAudience(accountId, audienceData) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const body = this.buildQueryString({
            ...audienceData,
            subtype: "LOOKALIKE",
            lookalike_spec: {
                ratio: audienceData.ratio,
                country: audienceData.country,
                type: "similarity",
            },
        });
        return this.makeRequest(`${formattedAccountId}/customaudiences`, "POST", body, formattedAccountId, true);
    }
    // Creative Methods
    async getAdCreatives(accountId, params = {}) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const { fields, ...paginationParams } = params;
        const queryParams = {
            fields: fields?.join(",") ||
                "id,name,title,body,image_url,video_id,call_to_action,object_story_spec",
            ...paginationParams,
        };
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${formattedAccountId}/adcreatives?${query}`, "GET", null, formattedAccountId);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    async createAdCreative(accountId, creativeData) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const body = this.buildQueryString(creativeData);
        return this.makeRequest(`${formattedAccountId}/adcreatives`, "POST", body, formattedAccountId, true);
    }
    // Ad Management
    async createAd(adSetId, adData) {
        console.log("=== CREATE AD DEBUG ===");
        console.log("Ad Set ID:", adSetId);
        console.log("Ad Data:", JSON.stringify(adData, null, 2));
        const body = this.buildQueryString(adData);
        console.log("Request body:", body);
        console.log("API endpoint:", `${adSetId}/ads`);
        try {
            const result = await this.makeRequest(`${adSetId}/ads`, "POST", body, undefined, // Don't pass account ID for rate limiting since we don't have it
            true);
            console.log("Create ad success:", JSON.stringify(result, null, 2));
            console.log("=====================");
            return result;
        }
        catch (error) {
            console.log("=== CREATE AD ERROR ===");
            console.log("Error object:", error);
            if (error instanceof Error) {
                console.log("Error message:", error.message);
                // Try to parse Meta API error response
                try {
                    const errorData = JSON.parse(error.message);
                    console.log("Parsed Meta API error:", JSON.stringify(errorData, null, 2));
                    if (errorData.error) {
                        console.log("Meta API Error Details:");
                        console.log("- Message:", errorData.error.message);
                        console.log("- Code:", errorData.error.code);
                        console.log("- Type:", errorData.error.type);
                        console.log("- Error Subcode:", errorData.error.error_subcode);
                        console.log("- FBTrace ID:", errorData.error.fbtrace_id);
                    }
                }
                catch (parseError) {
                    console.log("Could not parse error as JSON, raw message:", error.message);
                }
            }
            console.log("=====================");
            throw error;
        }
    }
    // Ad Methods
    async getAds(params = {}) {
        const { adsetId, campaignId, accountId, status, fields, ...paginationParams } = params;
        let endpoint;
        if (adsetId) {
            endpoint = `${adsetId}/ads`;
        }
        else if (campaignId) {
            endpoint = `${campaignId}/ads`;
        }
        else if (accountId) {
            const formattedAccountId = this.auth.getAccountId(accountId);
            endpoint = `${formattedAccountId}/ads`;
        }
        else {
            throw new Error("Either adsetId, campaignId, or accountId must be provided");
        }
        const queryParams = {
            fields: fields?.join(",") ||
                "id,name,adset_id,campaign_id,status,effective_status,created_time,updated_time,creative",
            ...paginationParams,
        };
        if (status) {
            queryParams.effective_status = JSON.stringify([status]);
        }
        const query = this.buildQueryString(queryParams);
        const response = await this.makeRequest(`${endpoint}?${query}`, "GET", null, accountId ? this.auth.getAccountId(accountId) : undefined);
        return PaginationHelper.parsePaginatedResponse(response);
    }
    async getAdsByCampaign(campaignId, params = {}) {
        const queryParams = {
            fields: "id,name,status,effective_status,created_time,adset_id,creative",
            limit: params.limit || 25,
            after: params.after,
            before: params.before,
        };
        if (params.status) {
            queryParams.status = JSON.stringify(params.status);
        }
        const query = this.buildQueryString(queryParams);
        const result = await this.makeRequest(`${campaignId}/ads?${query}`, "GET", undefined, undefined);
        return PaginationHelper.parsePaginatedResponse(result);
    }
    async getAdsByAccount(accountId, params = {}) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const queryParams = {
            fields: "id,name,status,effective_status,created_time,adset_id,creative",
            limit: params.limit || 25,
            after: params.after,
            before: params.before,
        };
        if (params.status) {
            queryParams.status = JSON.stringify(params.status);
        }
        const query = this.buildQueryString(queryParams);
        const result = await this.makeRequest(`${formattedAccountId}/ads?${query}`, "GET", undefined, formattedAccountId);
        return PaginationHelper.parsePaginatedResponse(result);
    }
    // Account and Business Methods
    async getAdAccount(accountId) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const queryParams = {
            fields: "id,name,account_status,currency,timezone_name,funding_source_details,business",
        };
        const query = this.buildQueryString(queryParams);
        return this.makeRequest(`${formattedAccountId}?${query}`, "GET", undefined, formattedAccountId);
    }
    async getFundingSources(accountId) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        try {
            const result = await this.makeRequest(`${formattedAccountId}/funding_source_details`, "GET", undefined, formattedAccountId);
            return result.data || [];
        }
        catch (error) {
            // Return empty array if no permission to access funding sources
            return [];
        }
    }
    async getAccountBusiness(accountId) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        try {
            return await this.makeRequest(`${formattedAccountId}/business`, "GET", undefined, formattedAccountId);
        }
        catch (error) {
            // Return empty object if no business info available
            return {};
        }
    }
    async getCustomAudience(audienceId) {
        const queryParams = {
            fields: "id,name,description,approximate_count,delivery_status,operation_status",
        };
        const query = this.buildQueryString(queryParams);
        return this.makeRequest(`${audienceId}?${query}`, "GET");
    }
    // Batch Operations
    async batchRequest(requests) {
        const body = this.buildQueryString({
            batch: JSON.stringify(requests),
        });
        return this.makeRequest("", "POST", body, undefined, true);
    }
    // Utility Methods
    async estimateAudienceSize(accountId, targeting, optimizationGoal) {
        const formattedAccountId = this.auth.getAccountId(accountId);
        const queryParams = {
            targeting_spec: targeting,
            optimization_goal: optimizationGoal,
        };
        const query = this.buildQueryString(queryParams);
        return this.makeRequest(`${formattedAccountId}/delivery_estimate?${query}`, "GET", null, formattedAccountId);
    }
    async generateAdPreview(creativeId, adFormat, productItemIds) {
        const queryParams = {
            ad_format: adFormat,
        };
        if (productItemIds && productItemIds.length > 0) {
            queryParams.product_item_ids = productItemIds;
        }
        const query = this.buildQueryString(queryParams);
        return this.makeRequest(`${creativeId}/previews?${query}`);
    }
    // Helper method to get account ID for rate limiting
    extractAccountIdFromObjectId(objectId) {
        // Try to extract account ID from campaign/adset/ad ID patterns
        const campaign = objectId.match(/^(\d+)$/);
        if (campaign) {
            // For direct campaign/adset/ad IDs, we can't determine the account
            // This would need to be provided by the caller or cached
            return undefined;
        }
        // If it's already a formatted account ID
        if (objectId.startsWith("act_")) {
            return objectId;
        }
        return undefined;
    }
    // Image Upload for v23.0 compliance
    async uploadImageFromUrl(accountId, imageUrl, imageName) {
        try {
            const formattedAccountId = this.auth.getAccountId(accountId);
            console.log("=== IMAGE UPLOAD FROM URL DEBUG ===");
            console.log("Account ID:", formattedAccountId);
            console.log("Image URL:", imageUrl);
            console.log("Image Name:", imageName);
            // Download the image from the URL
            console.log("Downloading image from URL...");
            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) {
                throw new Error(`Failed to download image: ${imageResponse.status} ${imageResponse.statusText}`);
            }
            const imageBuffer = await imageResponse.arrayBuffer();
            const imageBlob = new Blob([imageBuffer], {
                type: imageResponse.headers.get("content-type") || "image/jpeg",
            });
            console.log("Image downloaded, size:", imageBuffer.byteLength, "bytes");
            console.log("Content type:", imageResponse.headers.get("content-type"));
            // Generate filename if not provided
            const filename = imageName || `uploaded_image_${Date.now()}.jpg`;
            // Create FormData for upload
            const formData = new FormData();
            formData.append("filename", imageBlob, filename);
            formData.append("access_token", this.auth.getAccessToken());
            console.log("Uploading to Meta API...");
            console.log("Endpoint:", `https://graph.facebook.com/v22.0/${formattedAccountId}/adimages`);
            // Upload to Meta API
            const uploadResponse = await fetch(`https://graph.facebook.com/v23.0/${formattedAccountId}/adimages`, {
                method: "POST",
                body: formData,
            });
            const uploadResult = (await uploadResponse.json());
            console.log("Upload response:", JSON.stringify(uploadResult, null, 2));
            if (!uploadResponse.ok) {
                console.log("Upload failed with status:", uploadResponse.status);
                throw new Error(`Image upload failed: ${JSON.stringify(uploadResult)}`);
            }
            // Extract image hash from response
            const images = uploadResult.images;
            if (!images || Object.keys(images).length === 0) {
                throw new Error("No image hash returned from Meta API");
            }
            // Get the first (and usually only) image result
            const imageKey = Object.keys(images)[0];
            const imageResult = images[imageKey];
            if (!imageResult.hash) {
                throw new Error("No hash found in image upload response");
            }
            console.log("Image uploaded successfully!");
            console.log("Image hash:", imageResult.hash);
            console.log("Image URL:", imageResult.url);
            console.log("===================================");
            return {
                hash: imageResult.hash,
                url: imageResult.url || imageUrl,
                name: filename,
            };
        }
        catch (error) {
            console.log("=== IMAGE UPLOAD ERROR ===");
            console.log("Error:", error);
            console.log("=========================");
            throw error;
        }
    }
}
//# sourceMappingURL=meta-client.js.map