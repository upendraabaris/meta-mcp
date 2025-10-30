import type { MetaApiConfig } from "../types/meta-api.js";
export declare class AuthManager {
    private config;
    constructor(config: MetaApiConfig);
    private validateConfig;
    getAccessToken(): string;
    getApiVersion(): string;
    getBaseUrl(): string;
    getAuthHeaders(): Record<string, string>;
    validateToken(): Promise<boolean>;
    static fromEnvironment(): AuthManager;
    refreshTokenIfNeeded(): Promise<string>;
    getAccountId(accountIdOrNumber: string): string;
    extractAccountNumber(accountId: string): string;
    /**
     * Generate OAuth authorization URL for user consent
     */
    generateAuthUrl(scopes?: string[], state?: string): string;
    /**
     * Exchange authorization code for access token
     */
    exchangeCodeForToken(code: string): Promise<{
        accessToken: string;
        tokenType: string;
        expiresIn?: number;
    }>;
    /**
     * Exchange short-lived token for long-lived token
     */
    exchangeForLongLivedToken(shortLivedToken?: string): Promise<{
        accessToken: string;
        tokenType: string;
        expiresIn: number;
    }>;
    /**
     * Check if token is expired or will expire soon
     */
    isTokenExpiring(bufferMinutes?: number): boolean;
    /**
     * Automatically refresh token if needed
     */
    autoRefreshToken(): Promise<string>;
    /**
     * Generate system user access token (for server-to-server apps)
     */
    generateSystemUserToken(systemUserId: string, scopes?: string[], expiringToken?: boolean): Promise<{
        accessToken: string;
        tokenType: string;
        expiresIn?: number;
    }>;
    /**
     * Get token info and validation details
     */
    getTokenInfo(): Promise<{
        appId: string;
        userId?: string;
        scopes: string[];
        expiresAt?: Date;
        isValid: boolean;
    }>;
}
//# sourceMappingURL=auth.d.ts.map