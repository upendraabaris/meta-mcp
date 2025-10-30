import { AuthManager } from './auth.js';
export interface UserSession {
    userId: string;
    email: string;
    name: string;
    metaUserId: string;
    accessToken: string;
    refreshToken?: string;
    tokenExpiration?: Date;
    createdAt: Date;
    lastUsed: Date;
}
export interface UserTokenData {
    accessToken: string;
    refreshToken?: string;
    tokenType: string;
    expiresIn?: number;
    scope: string[];
}
export declare class UserAuthManager {
    private static JWT_SECRET;
    private static JWT_EXPIRY;
    private static SESSION_PREFIX;
    private static TOKEN_PREFIX;
    private static storage;
    /**
     * Get storage adapter instance
     */
    private static getStorage;
    /**
     * Create a JWT session token for a user
     */
    static createSessionToken(userId: string): Promise<string>;
    /**
     * Verify and decode a JWT session token
     */
    static verifySessionToken(token: string): Promise<{
        userId: string;
    } | null>;
    /**
     * Store user session data in storage
     */
    static storeUserSession(session: UserSession): Promise<void>;
    /**
     * Get user session from storage
     */
    static getUserSession(userId: string): Promise<UserSession | null>;
    /**
     * Store user Meta tokens securely
     */
    static storeUserTokens(userId: string, tokens: UserTokenData): Promise<void>;
    /**
     * Get user Meta tokens
     */
    static getUserTokens(userId: string): Promise<UserTokenData | null>;
    /**
     * Create an AuthManager instance for a specific user
     */
    static createUserAuthManager(userId: string): Promise<AuthManager | null>;
    /**
     * Delete user session and tokens
     */
    static deleteUserData(userId: string): Promise<void>;
    /**
     * Extract bearer token from Authorization header
     */
    static extractBearerToken(authHeader: string | null): string | null;
    /**
     * Authenticate user from request headers
     */
    static authenticateUser(authHeader: string | null): Promise<UserSession | null>;
    /**
     * Generate OAuth state parameter with CSRF protection
     */
    static generateOAuthState(): Promise<string>;
    /**
     * Validate OAuth state parameter
     */
    static validateOAuthState(state: string, sessionState: string): Promise<boolean>;
    /**
     * Generate Meta OAuth authorization URL
     */
    static generateMetaOAuthUrl(state: string): string;
    /**
     * Exchange OAuth code for access token
     */
    static exchangeCodeForTokens(code: string): Promise<UserTokenData>;
    /**
     * Get user info from Meta using access token
     */
    static getMetaUserInfo(accessToken: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    /**
     * Refresh user's access token
     */
    static refreshUserToken(userId: string): Promise<boolean>;
}
//# sourceMappingURL=user-auth.d.ts.map