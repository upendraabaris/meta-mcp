import { SignJWT, jwtVerify } from 'jose';
import { AuthManager } from './auth.js';
// Vercel KV adapter
class VercelKVAdapter {
    kv;
    constructor() {
        // Dynamically import Vercel KV
        this.kv = null;
        this.initKV();
    }
    async initKV() {
        try {
            const { kv } = await import('@vercel/kv');
            this.kv = kv;
        }
        catch (error) {
            console.warn('Vercel KV not available:', error);
        }
    }
    async set(key, value, options) {
        if (!this.kv)
            await this.initKV();
        if (!this.kv)
            throw new Error('Vercel KV not available');
        await this.kv.set(key, value, options);
    }
    async get(key) {
        if (!this.kv)
            await this.initKV();
        if (!this.kv)
            throw new Error('Vercel KV not available');
        return await this.kv.get(key);
    }
    async del(key) {
        if (!this.kv)
            await this.initKV();
        if (!this.kv)
            throw new Error('Vercel KV not available');
        await this.kv.del(key);
    }
}
// Redis adapter
class RedisAdapter {
    client;
    isConnected = false;
    constructor() {
        this.client = null;
        this.initRedis();
    }
    async initRedis() {
        try {
            const { createClient } = await import('redis');
            this.client = createClient({
                url: process.env.REDIS_URL
            });
            this.client.on('error', (err) => {
                console.error('Redis error:', err);
                this.isConnected = false;
            });
            this.client.on('connect', () => {
                console.log('Redis connected');
                this.isConnected = true;
            });
            await this.client.connect();
        }
        catch (error) {
            console.warn('Redis not available:', error);
        }
    }
    async ensureConnected() {
        if (!this.client)
            await this.initRedis();
        if (!this.client)
            throw new Error('Redis not available');
        if (!this.isConnected) {
            try {
                await this.client.connect();
            }
            catch (error) {
                // Client might already be connected
                console.warn('Redis connection warning:', error);
            }
        }
    }
    async set(key, value, options) {
        await this.ensureConnected();
        const serialized = JSON.stringify(value);
        if (options?.ex) {
            await this.client.setEx(key, options.ex, serialized);
        }
        else {
            await this.client.set(key, serialized);
        }
    }
    async get(key) {
        await this.ensureConnected();
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }
    async del(key) {
        await this.ensureConnected();
        await this.client.del(key);
    }
}
// Storage factory
function createStorageAdapter() {
    if (process.env.REDIS_URL) {
        console.log('Using Redis storage adapter');
        return new RedisAdapter();
    }
    else if (process.env.KV_REST_API_URL) {
        console.log('Using Vercel KV storage adapter');
        return new VercelKVAdapter();
    }
    else {
        throw new Error('No storage configuration found. Set either REDIS_URL or KV_REST_API_URL');
    }
}
export class UserAuthManager {
    static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    static JWT_EXPIRY = '7d'; // 7 days
    static SESSION_PREFIX = 'user_session:';
    static TOKEN_PREFIX = 'user_tokens:';
    static storage = null;
    /**
     * Get storage adapter instance
     */
    static getStorage() {
        if (!this.storage) {
            this.storage = createStorageAdapter();
        }
        return this.storage;
    }
    /**
     * Create a JWT session token for a user
     */
    static async createSessionToken(userId) {
        const secret = new TextEncoder().encode(this.JWT_SECRET);
        const jwt = await new SignJWT({ userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(this.JWT_EXPIRY)
            .sign(secret);
        return jwt;
    }
    /**
     * Verify and decode a JWT session token
     */
    static async verifySessionToken(token) {
        try {
            const secret = new TextEncoder().encode(this.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            if (typeof payload.userId === 'string') {
                return { userId: payload.userId };
            }
            return null;
        }
        catch (error) {
            console.error('JWT verification failed:', error);
            return null;
        }
    }
    /**
     * Store user session data in storage
     */
    static async storeUserSession(session) {
        const storage = this.getStorage();
        const key = `${this.SESSION_PREFIX}${session.userId}`;
        await storage.set(key, session, { ex: 7 * 24 * 60 * 60 }); // 7 days expiry
    }
    /**
     * Get user session from storage
     */
    static async getUserSession(userId) {
        const storage = this.getStorage();
        const key = `${this.SESSION_PREFIX}${userId}`;
        const session = await storage.get(key);
        if (session) {
            // Update last used timestamp
            session.lastUsed = new Date();
            await this.storeUserSession(session);
        }
        return session;
    }
    /**
     * Store user Meta tokens securely
     */
    static async storeUserTokens(userId, tokens) {
        const storage = this.getStorage();
        const key = `${this.TOKEN_PREFIX}${userId}`;
        const tokenData = {
            ...tokens,
            updatedAt: new Date().toISOString(),
        };
        await storage.set(key, tokenData, { ex: 60 * 24 * 60 * 60 }); // 60 days expiry
    }
    /**
     * Get user Meta tokens
     */
    static async getUserTokens(userId) {
        const storage = this.getStorage();
        const key = `${this.TOKEN_PREFIX}${userId}`;
        return await storage.get(key);
    }
    /**
     * Create an AuthManager instance for a specific user
     */
    static async createUserAuthManager(userId) {
        const tokens = await this.getUserTokens(userId);
        if (!tokens) {
            return null;
        }
        const config = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            appId: process.env.META_APP_ID,
            appSecret: process.env.META_APP_SECRET,
            redirectUri: process.env.META_REDIRECT_URI,
            autoRefresh: true,
            apiVersion: process.env.META_API_VERSION,
            baseUrl: process.env.META_BASE_URL,
        };
        return new AuthManager(config);
    }
    /**
     * Delete user session and tokens
     */
    static async deleteUserData(userId) {
        const storage = this.getStorage();
        const sessionKey = `${this.SESSION_PREFIX}${userId}`;
        const tokenKey = `${this.TOKEN_PREFIX}${userId}`;
        await Promise.all([
            storage.del(sessionKey),
            storage.del(tokenKey)
        ]);
    }
    /**
     * Extract bearer token from Authorization header
     */
    static extractBearerToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.substring(7);
    }
    /**
     * Authenticate user from request headers
     */
    static async authenticateUser(authHeader) {
        const token = this.extractBearerToken(authHeader);
        if (!token) {
            return null;
        }
        const decoded = await this.verifySessionToken(token);
        if (!decoded) {
            return null;
        }
        return await this.getUserSession(decoded.userId);
    }
    /**
     * Generate OAuth state parameter with CSRF protection
     */
    static async generateOAuthState() {
        const crypto = await import('crypto');
        return crypto.randomBytes(32).toString('hex');
    }
    /**
     * Validate OAuth state parameter
     */
    static async validateOAuthState(state, sessionState) {
        return state === sessionState;
    }
    /**
     * Generate Meta OAuth authorization URL
     */
    static generateMetaOAuthUrl(state) {
        if (!process.env.META_APP_ID || !process.env.META_REDIRECT_URI) {
            throw new Error('META_APP_ID and META_REDIRECT_URI must be configured');
        }
        const scopes = [
            'ads_management',
            'ads_read',
            'business_management'
            // Note: 'read_insights' is included in ads_read
        ];
        const params = new URLSearchParams({
            client_id: process.env.META_APP_ID,
            redirect_uri: process.env.META_REDIRECT_URI,
            scope: scopes.join(','),
            response_type: 'code',
            state: state,
        });
        return `https://www.facebook.com/v23.0/dialog/oauth?${params.toString()}`;
    }
    /**
     * Exchange OAuth code for access token
     */
    static async exchangeCodeForTokens(code) {
        if (!process.env.META_APP_ID || !process.env.META_APP_SECRET || !process.env.META_REDIRECT_URI) {
            throw new Error('META_APP_ID, META_APP_SECRET, and META_REDIRECT_URI must be configured');
        }
        const params = new URLSearchParams({
            client_id: process.env.META_APP_ID,
            client_secret: process.env.META_APP_SECRET,
            redirect_uri: process.env.META_REDIRECT_URI,
            code: code,
        });
        const response = await fetch(`https://graph.facebook.com/v23.0/oauth/access_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Token exchange failed: ${error}`);
        }
        const data = await response.json();
        return {
            accessToken: data.access_token,
            tokenType: data.token_type || 'bearer',
            expiresIn: data.expires_in,
            scope: [], // Meta doesn't return scope in token response
        };
    }
    /**
     * Get user info from Meta using access token
     */
    static async getMetaUserInfo(accessToken) {
        const response = await fetch(`https://graph.facebook.com/v23.0/me?fields=id,name,email&access_token=${accessToken}`);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to get user info: ${error}`);
        }
        return await response.json();
    }
    /**
     * Refresh user's access token
     */
    static async refreshUserToken(userId) {
        const authManager = await this.createUserAuthManager(userId);
        if (!authManager) {
            return false;
        }
        try {
            const newToken = await authManager.refreshTokenIfNeeded();
            // Update stored tokens
            const tokens = await this.getUserTokens(userId);
            if (tokens) {
                tokens.accessToken = newToken;
                await this.storeUserTokens(userId, tokens);
            }
            return true;
        }
        catch (error) {
            console.error('Token refresh failed for user:', userId, error);
            return false;
        }
    }
}
//# sourceMappingURL=user-auth.js.map