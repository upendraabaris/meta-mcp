import { z } from "zod";
export declare const ListCampaignsSchema: z.ZodObject<{
    account_id: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "PAUSED", "DELETED", "ARCHIVED"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    account_id: string;
    status?: "ACTIVE" | "PAUSED" | "DELETED" | "ARCHIVED" | undefined;
    after?: string | undefined;
}, {
    account_id: string;
    status?: "ACTIVE" | "PAUSED" | "DELETED" | "ARCHIVED" | undefined;
    limit?: number | undefined;
    after?: string | undefined;
}>;
export declare const CreateCampaignSchema: z.ZodObject<{
    account_id: z.ZodString;
    name: z.ZodString;
    objective: z.ZodEnum<["OUTCOME_APP_PROMOTION", "OUTCOME_AWARENESS", "OUTCOME_ENGAGEMENT", "OUTCOME_LEADS", "OUTCOME_SALES", "OUTCOME_TRAFFIC"]>;
    status: z.ZodDefault<z.ZodEnum<["ACTIVE", "PAUSED"]>>;
    daily_budget: z.ZodOptional<z.ZodNumber>;
    lifetime_budget: z.ZodOptional<z.ZodNumber>;
    start_time: z.ZodOptional<z.ZodString>;
    stop_time: z.ZodOptional<z.ZodString>;
    special_ad_categories: z.ZodOptional<z.ZodArray<z.ZodEnum<["NONE", "EMPLOYMENT", "HOUSING", "CREDIT", "SOCIAL_ISSUES_ELECTIONS_POLITICS"]>, "many">>;
    bid_strategy: z.ZodOptional<z.ZodEnum<["LOWEST_COST_WITHOUT_CAP", "LOWEST_COST_WITH_BID_CAP", "COST_CAP"]>>;
    bid_cap: z.ZodOptional<z.ZodNumber>;
    budget_optimization: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "ACTIVE" | "PAUSED";
    account_id: string;
    objective: "OUTCOME_APP_PROMOTION" | "OUTCOME_AWARENESS" | "OUTCOME_ENGAGEMENT" | "OUTCOME_LEADS" | "OUTCOME_SALES" | "OUTCOME_TRAFFIC";
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    stop_time?: string | undefined;
    special_ad_categories?: ("NONE" | "EMPLOYMENT" | "HOUSING" | "CREDIT" | "SOCIAL_ISSUES_ELECTIONS_POLITICS")[] | undefined;
    bid_strategy?: "LOWEST_COST_WITHOUT_CAP" | "LOWEST_COST_WITH_BID_CAP" | "COST_CAP" | undefined;
    bid_cap?: number | undefined;
    budget_optimization?: boolean | undefined;
}, {
    name: string;
    account_id: string;
    objective: "OUTCOME_APP_PROMOTION" | "OUTCOME_AWARENESS" | "OUTCOME_ENGAGEMENT" | "OUTCOME_LEADS" | "OUTCOME_SALES" | "OUTCOME_TRAFFIC";
    status?: "ACTIVE" | "PAUSED" | undefined;
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    stop_time?: string | undefined;
    special_ad_categories?: ("NONE" | "EMPLOYMENT" | "HOUSING" | "CREDIT" | "SOCIAL_ISSUES_ELECTIONS_POLITICS")[] | undefined;
    bid_strategy?: "LOWEST_COST_WITHOUT_CAP" | "LOWEST_COST_WITH_BID_CAP" | "COST_CAP" | undefined;
    bid_cap?: number | undefined;
    budget_optimization?: boolean | undefined;
}>;
export declare const UpdateCampaignSchema: z.ZodObject<{
    campaign_id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "PAUSED", "ARCHIVED"]>>;
    daily_budget: z.ZodOptional<z.ZodNumber>;
    lifetime_budget: z.ZodOptional<z.ZodNumber>;
    start_time: z.ZodOptional<z.ZodString>;
    stop_time: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    campaign_id: string;
    name?: string | undefined;
    status?: "ACTIVE" | "PAUSED" | "ARCHIVED" | undefined;
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    stop_time?: string | undefined;
}, {
    campaign_id: string;
    name?: string | undefined;
    status?: "ACTIVE" | "PAUSED" | "ARCHIVED" | undefined;
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    stop_time?: string | undefined;
}>;
export declare const DeleteCampaignSchema: z.ZodObject<{
    campaign_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaign_id: string;
}, {
    campaign_id: string;
}>;
export declare const ListAdSetsSchema: z.ZodObject<{
    campaign_id: z.ZodOptional<z.ZodString>;
    account_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "PAUSED", "DELETED", "ARCHIVED"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    status?: "ACTIVE" | "PAUSED" | "DELETED" | "ARCHIVED" | undefined;
    after?: string | undefined;
    account_id?: string | undefined;
    campaign_id?: string | undefined;
}, {
    status?: "ACTIVE" | "PAUSED" | "DELETED" | "ARCHIVED" | undefined;
    limit?: number | undefined;
    after?: string | undefined;
    account_id?: string | undefined;
    campaign_id?: string | undefined;
}>;
export declare const CreateAdSetSchema: z.ZodObject<{
    campaign_id: z.ZodString;
    name: z.ZodString;
    daily_budget: z.ZodOptional<z.ZodNumber>;
    lifetime_budget: z.ZodOptional<z.ZodNumber>;
    optimization_goal: z.ZodString;
    billing_event: z.ZodString;
    bid_amount: z.ZodOptional<z.ZodNumber>;
    start_time: z.ZodOptional<z.ZodString>;
    end_time: z.ZodOptional<z.ZodString>;
    promoted_object: z.ZodOptional<z.ZodObject<{
        page_id: z.ZodOptional<z.ZodString>;
        pixel_id: z.ZodOptional<z.ZodString>;
        application_id: z.ZodOptional<z.ZodString>;
        object_store_url: z.ZodOptional<z.ZodString>;
        custom_event_type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        page_id?: string | undefined;
        pixel_id?: string | undefined;
        application_id?: string | undefined;
        object_store_url?: string | undefined;
        custom_event_type?: string | undefined;
    }, {
        page_id?: string | undefined;
        pixel_id?: string | undefined;
        application_id?: string | undefined;
        object_store_url?: string | undefined;
        custom_event_type?: string | undefined;
    }>>;
    attribution_spec: z.ZodDefault<z.ZodArray<z.ZodObject<{
        event_type: z.ZodDefault<z.ZodEnum<["CLICK_THROUGH", "VIEW_THROUGH"]>>;
        window_days: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        event_type: "CLICK_THROUGH" | "VIEW_THROUGH";
        window_days: number;
    }, {
        event_type?: "CLICK_THROUGH" | "VIEW_THROUGH" | undefined;
        window_days?: number | undefined;
    }>, "many">>;
    destination_type: z.ZodDefault<z.ZodEnum<["WEBSITE", "ON_AD", "FACEBOOK", "INSTAGRAM", "MESSENGER", "WHATSAPP", "UNDEFINED"]>>;
    is_dynamic_creative: z.ZodDefault<z.ZodBoolean>;
    use_new_app_click: z.ZodDefault<z.ZodBoolean>;
    configured_status: z.ZodDefault<z.ZodEnum<["ACTIVE", "PAUSED"]>>;
    optimization_sub_event: z.ZodDefault<z.ZodEnum<["NONE", "VIDEO_PLAY", "APP_INSTALL", "LINK_CLICK", "LEAD_GROUPED", "PURCHASE"]>>;
    recurring_budget_semantics: z.ZodDefault<z.ZodBoolean>;
    targeting: z.ZodDefault<z.ZodObject<{
        age_min: z.ZodOptional<z.ZodNumber>;
        age_max: z.ZodOptional<z.ZodNumber>;
        genders: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        geo_locations: z.ZodOptional<z.ZodObject<{
            countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            location_types: z.ZodDefault<z.ZodArray<z.ZodEnum<["home", "recent"]>, "many">>;
            regions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                key: string;
            }, {
                key: string;
            }>, "many">>;
            cities: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                radius: z.ZodOptional<z.ZodNumber>;
                distance_unit: z.ZodOptional<z.ZodEnum<["mile", "kilometer"]>>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }, {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            location_types: ("home" | "recent")[];
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        }, {
            countries?: string[] | undefined;
            location_types?: ("home" | "recent")[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        }>>;
        interests: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | undefined;
        }, {
            id: string;
            name?: string | undefined;
        }>, "many">>;
        behaviors: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | undefined;
        }, {
            id: string;
            name?: string | undefined;
        }>, "many">>;
        custom_audiences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        lookalike_audiences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        device_platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<["mobile", "desktop"]>, "many">>;
        publisher_platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<["facebook", "instagram", "messenger", "whatsapp"]>, "many">>;
        targeting_optimization: z.ZodDefault<z.ZodEnum<["none", "expansion_all"]>>;
        brand_safety_content_filter_levels: z.ZodDefault<z.ZodArray<z.ZodEnum<["FACEBOOK_STANDARD", "AN_STANDARD", "RESTRICTIVE"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        targeting_optimization: "none" | "expansion_all";
        brand_safety_content_filter_levels: ("FACEBOOK_STANDARD" | "AN_STANDARD" | "RESTRICTIVE")[];
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            location_types: ("home" | "recent")[];
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
        device_platforms?: ("mobile" | "desktop")[] | undefined;
        publisher_platforms?: ("facebook" | "instagram" | "messenger" | "whatsapp")[] | undefined;
    }, {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            location_types?: ("home" | "recent")[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
        device_platforms?: ("mobile" | "desktop")[] | undefined;
        publisher_platforms?: ("facebook" | "instagram" | "messenger" | "whatsapp")[] | undefined;
        targeting_optimization?: "none" | "expansion_all" | undefined;
        brand_safety_content_filter_levels?: ("FACEBOOK_STANDARD" | "AN_STANDARD" | "RESTRICTIVE")[] | undefined;
    }>>;
    status: z.ZodDefault<z.ZodEnum<["ACTIVE", "PAUSED"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "ACTIVE" | "PAUSED";
    campaign_id: string;
    optimization_goal: string;
    billing_event: string;
    attribution_spec: {
        event_type: "CLICK_THROUGH" | "VIEW_THROUGH";
        window_days: number;
    }[];
    destination_type: "WEBSITE" | "ON_AD" | "FACEBOOK" | "INSTAGRAM" | "MESSENGER" | "WHATSAPP" | "UNDEFINED";
    is_dynamic_creative: boolean;
    use_new_app_click: boolean;
    configured_status: "ACTIVE" | "PAUSED";
    optimization_sub_event: "NONE" | "PURCHASE" | "VIDEO_PLAY" | "APP_INSTALL" | "LINK_CLICK" | "LEAD_GROUPED";
    recurring_budget_semantics: boolean;
    targeting: {
        targeting_optimization: "none" | "expansion_all";
        brand_safety_content_filter_levels: ("FACEBOOK_STANDARD" | "AN_STANDARD" | "RESTRICTIVE")[];
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            location_types: ("home" | "recent")[];
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
        device_platforms?: ("mobile" | "desktop")[] | undefined;
        publisher_platforms?: ("facebook" | "instagram" | "messenger" | "whatsapp")[] | undefined;
    };
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    bid_amount?: number | undefined;
    end_time?: string | undefined;
    promoted_object?: {
        page_id?: string | undefined;
        pixel_id?: string | undefined;
        application_id?: string | undefined;
        object_store_url?: string | undefined;
        custom_event_type?: string | undefined;
    } | undefined;
}, {
    name: string;
    campaign_id: string;
    optimization_goal: string;
    billing_event: string;
    status?: "ACTIVE" | "PAUSED" | undefined;
    daily_budget?: number | undefined;
    lifetime_budget?: number | undefined;
    start_time?: string | undefined;
    bid_amount?: number | undefined;
    end_time?: string | undefined;
    promoted_object?: {
        page_id?: string | undefined;
        pixel_id?: string | undefined;
        application_id?: string | undefined;
        object_store_url?: string | undefined;
        custom_event_type?: string | undefined;
    } | undefined;
    attribution_spec?: {
        event_type?: "CLICK_THROUGH" | "VIEW_THROUGH" | undefined;
        window_days?: number | undefined;
    }[] | undefined;
    destination_type?: "WEBSITE" | "ON_AD" | "FACEBOOK" | "INSTAGRAM" | "MESSENGER" | "WHATSAPP" | "UNDEFINED" | undefined;
    is_dynamic_creative?: boolean | undefined;
    use_new_app_click?: boolean | undefined;
    configured_status?: "ACTIVE" | "PAUSED" | undefined;
    optimization_sub_event?: "NONE" | "PURCHASE" | "VIDEO_PLAY" | "APP_INSTALL" | "LINK_CLICK" | "LEAD_GROUPED" | undefined;
    recurring_budget_semantics?: boolean | undefined;
    targeting?: {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            location_types?: ("home" | "recent")[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
        device_platforms?: ("mobile" | "desktop")[] | undefined;
        publisher_platforms?: ("facebook" | "instagram" | "messenger" | "whatsapp")[] | undefined;
        targeting_optimization?: "none" | "expansion_all" | undefined;
        brand_safety_content_filter_levels?: ("FACEBOOK_STANDARD" | "AN_STANDARD" | "RESTRICTIVE")[] | undefined;
    } | undefined;
}>;
export declare const GetInsightsSchema: z.ZodObject<{
    object_id: z.ZodString;
    level: z.ZodEnum<["account", "campaign", "adset", "ad"]>;
    date_preset: z.ZodOptional<z.ZodEnum<["today", "yesterday", "this_week", "last_week", "this_month", "last_month", "this_quarter", "last_quarter", "this_year", "last_year", "lifetime"]>>;
    time_range: z.ZodOptional<z.ZodObject<{
        since: z.ZodString;
        until: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        since: string;
        until: string;
    }, {
        since: string;
        until: string;
    }>>;
    fields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    breakdowns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    object_id: string;
    level: "account" | "campaign" | "adset" | "ad";
    fields?: string[] | undefined;
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
    breakdowns?: string[] | undefined;
}, {
    object_id: string;
    level: "account" | "campaign" | "adset" | "ad";
    limit?: number | undefined;
    fields?: string[] | undefined;
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
    breakdowns?: string[] | undefined;
}>;
export declare const ComparePerformanceSchema: z.ZodObject<{
    object_ids: z.ZodArray<z.ZodString, "many">;
    level: z.ZodEnum<["campaign", "adset", "ad"]>;
    date_preset: z.ZodOptional<z.ZodEnum<["today", "yesterday", "this_week", "last_week", "this_month", "last_month", "this_quarter", "last_quarter", "this_year", "last_year", "lifetime"]>>;
    time_range: z.ZodOptional<z.ZodObject<{
        since: z.ZodString;
        until: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        since: string;
        until: string;
    }, {
        since: string;
        until: string;
    }>>;
    metrics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    level: "campaign" | "adset" | "ad";
    object_ids: string[];
    metrics: string[];
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
}, {
    level: "campaign" | "adset" | "ad";
    object_ids: string[];
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
    metrics?: string[] | undefined;
}>;
export declare const ExportInsightsSchema: z.ZodObject<{
    object_id: z.ZodString;
    level: z.ZodEnum<["account", "campaign", "adset", "ad"]>;
    format: z.ZodDefault<z.ZodEnum<["csv", "json"]>>;
    date_preset: z.ZodOptional<z.ZodEnum<["today", "yesterday", "this_week", "last_week", "this_month", "last_month", "this_quarter", "last_quarter", "this_year", "last_year", "lifetime"]>>;
    time_range: z.ZodOptional<z.ZodObject<{
        since: z.ZodString;
        until: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        since: string;
        until: string;
    }, {
        since: string;
        until: string;
    }>>;
    fields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    breakdowns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    object_id: string;
    level: "account" | "campaign" | "adset" | "ad";
    format: "csv" | "json";
    fields?: string[] | undefined;
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
    breakdowns?: string[] | undefined;
}, {
    object_id: string;
    level: "account" | "campaign" | "adset" | "ad";
    fields?: string[] | undefined;
    time_range?: {
        since: string;
        until: string;
    } | undefined;
    date_preset?: "today" | "yesterday" | "this_week" | "last_week" | "this_month" | "last_month" | "this_quarter" | "last_quarter" | "this_year" | "last_year" | "lifetime" | undefined;
    breakdowns?: string[] | undefined;
    format?: "csv" | "json" | undefined;
}>;
export declare const ListAudiencesSchema: z.ZodObject<{
    account_id: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<["custom", "lookalike", "saved"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    account_id: string;
    type?: "custom" | "lookalike" | "saved" | undefined;
    after?: string | undefined;
}, {
    account_id: string;
    type?: "custom" | "lookalike" | "saved" | undefined;
    limit?: number | undefined;
    after?: string | undefined;
}>;
export declare const CreateCustomAudienceSchema: z.ZodObject<{
    account_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    subtype: z.ZodEnum<["CUSTOM", "WEBSITE", "APP", "OFFLINE_CONVERSION", "CLAIM", "PARTNER", "VIDEO", "BAG_OF_ACCOUNTS", "STUDY_RULE_AUDIENCE", "FOX"]>;
    customer_file_source: z.ZodOptional<z.ZodEnum<["USER_PROVIDED_ONLY", "PARTNER_PROVIDED_ONLY", "BOTH_USER_AND_PARTNER_PROVIDED"]>>;
    retention_days: z.ZodOptional<z.ZodNumber>;
    rule: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    name: string;
    subtype: "WEBSITE" | "CUSTOM" | "APP" | "OFFLINE_CONVERSION" | "CLAIM" | "PARTNER" | "VIDEO" | "BAG_OF_ACCOUNTS" | "STUDY_RULE_AUDIENCE" | "FOX";
    account_id: string;
    description?: string | undefined;
    customer_file_source?: "USER_PROVIDED_ONLY" | "PARTNER_PROVIDED_ONLY" | "BOTH_USER_AND_PARTNER_PROVIDED" | undefined;
    retention_days?: number | undefined;
    rule?: any;
}, {
    name: string;
    subtype: "WEBSITE" | "CUSTOM" | "APP" | "OFFLINE_CONVERSION" | "CLAIM" | "PARTNER" | "VIDEO" | "BAG_OF_ACCOUNTS" | "STUDY_RULE_AUDIENCE" | "FOX";
    account_id: string;
    description?: string | undefined;
    customer_file_source?: "USER_PROVIDED_ONLY" | "PARTNER_PROVIDED_ONLY" | "BOTH_USER_AND_PARTNER_PROVIDED" | undefined;
    retention_days?: number | undefined;
    rule?: any;
}>;
export declare const CreateLookalikeAudienceSchema: z.ZodObject<{
    account_id: z.ZodString;
    name: z.ZodString;
    origin_audience_id: z.ZodString;
    country: z.ZodString;
    ratio: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    account_id: string;
    origin_audience_id: string;
    country: string;
    ratio: number;
    description?: string | undefined;
}, {
    name: string;
    account_id: string;
    origin_audience_id: string;
    country: string;
    ratio: number;
    description?: string | undefined;
}>;
export declare const EstimateAudienceSizeSchema: z.ZodObject<{
    account_id: z.ZodString;
    targeting: z.ZodObject<{
        age_min: z.ZodOptional<z.ZodNumber>;
        age_max: z.ZodOptional<z.ZodNumber>;
        genders: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        geo_locations: z.ZodOptional<z.ZodObject<{
            countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            regions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                key: string;
            }, {
                key: string;
            }>, "many">>;
            cities: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                radius: z.ZodOptional<z.ZodNumber>;
                distance_unit: z.ZodOptional<z.ZodEnum<["mile", "kilometer"]>>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }, {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        }, {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        }>>;
        interests: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | undefined;
        }, {
            id: string;
            name?: string | undefined;
        }>, "many">>;
        behaviors: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | undefined;
        }, {
            id: string;
            name?: string | undefined;
        }>, "many">>;
        custom_audiences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        lookalike_audiences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
    }, {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
    }>;
    optimization_goal: z.ZodString;
}, "strip", z.ZodTypeAny, {
    account_id: string;
    optimization_goal: string;
    targeting: {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
    };
}, {
    account_id: string;
    optimization_goal: string;
    targeting: {
        age_min?: number | undefined;
        age_max?: number | undefined;
        genders?: number[] | undefined;
        geo_locations?: {
            countries?: string[] | undefined;
            regions?: {
                key: string;
            }[] | undefined;
            cities?: {
                key: string;
                radius?: number | undefined;
                distance_unit?: "mile" | "kilometer" | undefined;
            }[] | undefined;
        } | undefined;
        interests?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        behaviors?: {
            id: string;
            name?: string | undefined;
        }[] | undefined;
        custom_audiences?: string[] | undefined;
        lookalike_audiences?: string[] | undefined;
    };
}>;
export declare const GenerateAuthUrlSchema: z.ZodObject<{
    scopes: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    state: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    scopes: string[];
    state?: string | undefined;
}, {
    state?: string | undefined;
    scopes?: string[] | undefined;
}>;
export declare const ExchangeCodeSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const RefreshTokenSchema: z.ZodObject<{
    short_lived_token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    short_lived_token?: string | undefined;
}, {
    short_lived_token?: string | undefined;
}>;
export declare const GenerateSystemTokenSchema: z.ZodObject<{
    system_user_id: z.ZodString;
    scopes: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    expiring_token: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    scopes: string[];
    system_user_id: string;
    expiring_token: boolean;
}, {
    system_user_id: string;
    scopes?: string[] | undefined;
    expiring_token?: boolean | undefined;
}>;
export declare const ListCreativesSchema: z.ZodObject<{
    account_id: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    account_id: string;
    after?: string | undefined;
}, {
    account_id: string;
    limit?: number | undefined;
    after?: string | undefined;
}>;
export declare const CreateAdCreativeSchema: z.ZodObject<{
    account_id: z.ZodString;
    name: z.ZodString;
    page_id: z.ZodString;
    message: z.ZodString;
    headline: z.ZodOptional<z.ZodString>;
    picture: z.ZodOptional<z.ZodString>;
    image_hash: z.ZodOptional<z.ZodString>;
    video_id: z.ZodOptional<z.ZodString>;
    call_to_action_type: z.ZodOptional<z.ZodEnum<["LEARN_MORE", "SHOP_NOW", "SIGN_UP", "DOWNLOAD", "BOOK_TRAVEL", "LISTEN_MUSIC", "WATCH_VIDEO", "GET_QUOTE", "CONTACT_US", "APPLY_NOW", "GET_DIRECTIONS", "CALL_NOW", "MESSAGE_PAGE", "SUBSCRIBE", "BOOK_NOW", "ORDER_NOW", "DONATE_NOW", "SAY_THANKS", "SELL_NOW", "SHARE", "OPEN_LINK", "LIKE_PAGE", "FOLLOW_PAGE", "FOLLOW_USER", "REQUEST_TIME", "VISIT_PAGES_FEED", "USE_APP", "PLAY_GAME", "INSTALL_APP", "USE_MOBILE_APP", "INSTALL_MOBILE_APP", "OPEN_MOVIES", "AUDIO_CALL", "VIDEO_CALL", "GET_OFFER", "GET_OFFER_VIEW", "BUY_NOW", "ADD_TO_CART", "SELL", "GIFT_WRAP", "MAKE_AN_OFFER"]>>;
    link_url: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    instagram_actor_id: z.ZodOptional<z.ZodString>;
    adlabels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enable_standard_enhancements: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    enhancement_features: z.ZodOptional<z.ZodObject<{
        enhance_cta: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        image_brightness_and_contrast: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        text_improvements: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        image_templates: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enhance_cta: boolean;
        image_brightness_and_contrast: boolean;
        text_improvements: boolean;
        image_templates: boolean;
    }, {
        enhance_cta?: boolean | undefined;
        image_brightness_and_contrast?: boolean | undefined;
        text_improvements?: boolean | undefined;
        image_templates?: boolean | undefined;
    }>>;
    attachment_style: z.ZodDefault<z.ZodOptional<z.ZodEnum<["link", "album"]>>>;
    caption: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    message: string;
    account_id: string;
    page_id: string;
    link_url: string;
    enable_standard_enhancements: boolean;
    attachment_style: "link" | "album";
    description?: string | undefined;
    headline?: string | undefined;
    picture?: string | undefined;
    image_hash?: string | undefined;
    video_id?: string | undefined;
    call_to_action_type?: "LEARN_MORE" | "SHOP_NOW" | "SIGN_UP" | "DOWNLOAD" | "BOOK_TRAVEL" | "LISTEN_MUSIC" | "WATCH_VIDEO" | "GET_QUOTE" | "CONTACT_US" | "APPLY_NOW" | "GET_DIRECTIONS" | "CALL_NOW" | "MESSAGE_PAGE" | "SUBSCRIBE" | "BOOK_NOW" | "ORDER_NOW" | "DONATE_NOW" | "SAY_THANKS" | "SELL_NOW" | "SHARE" | "OPEN_LINK" | "LIKE_PAGE" | "FOLLOW_PAGE" | "FOLLOW_USER" | "REQUEST_TIME" | "VISIT_PAGES_FEED" | "USE_APP" | "PLAY_GAME" | "INSTALL_APP" | "USE_MOBILE_APP" | "INSTALL_MOBILE_APP" | "OPEN_MOVIES" | "AUDIO_CALL" | "VIDEO_CALL" | "GET_OFFER" | "GET_OFFER_VIEW" | "BUY_NOW" | "ADD_TO_CART" | "SELL" | "GIFT_WRAP" | "MAKE_AN_OFFER" | undefined;
    instagram_actor_id?: string | undefined;
    adlabels?: string[] | undefined;
    enhancement_features?: {
        enhance_cta: boolean;
        image_brightness_and_contrast: boolean;
        text_improvements: boolean;
        image_templates: boolean;
    } | undefined;
    caption?: string | undefined;
}, {
    name: string;
    message: string;
    account_id: string;
    page_id: string;
    link_url: string;
    description?: string | undefined;
    headline?: string | undefined;
    picture?: string | undefined;
    image_hash?: string | undefined;
    video_id?: string | undefined;
    call_to_action_type?: "LEARN_MORE" | "SHOP_NOW" | "SIGN_UP" | "DOWNLOAD" | "BOOK_TRAVEL" | "LISTEN_MUSIC" | "WATCH_VIDEO" | "GET_QUOTE" | "CONTACT_US" | "APPLY_NOW" | "GET_DIRECTIONS" | "CALL_NOW" | "MESSAGE_PAGE" | "SUBSCRIBE" | "BOOK_NOW" | "ORDER_NOW" | "DONATE_NOW" | "SAY_THANKS" | "SELL_NOW" | "SHARE" | "OPEN_LINK" | "LIKE_PAGE" | "FOLLOW_PAGE" | "FOLLOW_USER" | "REQUEST_TIME" | "VISIT_PAGES_FEED" | "USE_APP" | "PLAY_GAME" | "INSTALL_APP" | "USE_MOBILE_APP" | "INSTALL_MOBILE_APP" | "OPEN_MOVIES" | "AUDIO_CALL" | "VIDEO_CALL" | "GET_OFFER" | "GET_OFFER_VIEW" | "BUY_NOW" | "ADD_TO_CART" | "SELL" | "GIFT_WRAP" | "MAKE_AN_OFFER" | undefined;
    instagram_actor_id?: string | undefined;
    adlabels?: string[] | undefined;
    enable_standard_enhancements?: boolean | undefined;
    enhancement_features?: {
        enhance_cta?: boolean | undefined;
        image_brightness_and_contrast?: boolean | undefined;
        text_improvements?: boolean | undefined;
        image_templates?: boolean | undefined;
    } | undefined;
    attachment_style?: "link" | "album" | undefined;
    caption?: string | undefined;
}>;
export declare const PreviewAdSchema: z.ZodObject<{
    creative_id: z.ZodString;
    ad_format: z.ZodEnum<["DESKTOP_FEED_STANDARD", "MOBILE_FEED_STANDARD", "MOBILE_FEED_BASIC", "MOBILE_BANNER", "MOBILE_MEDIUM_RECTANGLE", "MOBILE_FULLWIDTH", "MOBILE_INTERSTITIAL", "INSTAGRAM_STANDARD", "INSTAGRAM_STORY"]>;
    product_item_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ad_format: "DESKTOP_FEED_STANDARD" | "MOBILE_FEED_STANDARD" | "MOBILE_FEED_BASIC" | "MOBILE_BANNER" | "MOBILE_MEDIUM_RECTANGLE" | "MOBILE_FULLWIDTH" | "MOBILE_INTERSTITIAL" | "INSTAGRAM_STANDARD" | "INSTAGRAM_STORY";
    creative_id: string;
    product_item_ids?: string[] | undefined;
}, {
    ad_format: "DESKTOP_FEED_STANDARD" | "MOBILE_FEED_STANDARD" | "MOBILE_FEED_BASIC" | "MOBILE_BANNER" | "MOBILE_MEDIUM_RECTANGLE" | "MOBILE_FULLWIDTH" | "MOBILE_INTERSTITIAL" | "INSTAGRAM_STANDARD" | "INSTAGRAM_STORY";
    creative_id: string;
    product_item_ids?: string[] | undefined;
}>;
export declare const TroubleshootCreativeSchema: z.ZodObject<{
    issue_description: z.ZodString;
    creative_type: z.ZodOptional<z.ZodEnum<["image", "video", "carousel", "collection"]>>;
}, "strip", z.ZodTypeAny, {
    issue_description: string;
    creative_type?: "image" | "video" | "carousel" | "collection" | undefined;
}, {
    issue_description: string;
    creative_type?: "image" | "video" | "carousel" | "collection" | undefined;
}>;
export declare const AnalyzeCreativesSchema: z.ZodObject<{
    account_id: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    account_id: string;
}, {
    account_id: string;
    limit?: number | undefined;
}>;
export declare const CreativeValidationEnhancedSchema: z.ZodObject<{
    account_id: z.ZodString;
    name: z.ZodString;
    page_id: z.ZodString;
    message: z.ZodString;
    headline: z.ZodOptional<z.ZodString>;
    picture: z.ZodOptional<z.ZodString>;
    image_hash: z.ZodOptional<z.ZodString>;
    video_id: z.ZodOptional<z.ZodString>;
    call_to_action_type: z.ZodOptional<z.ZodEnum<["LEARN_MORE", "SHOP_NOW", "SIGN_UP", "DOWNLOAD", "BOOK_TRAVEL", "LISTEN_MUSIC", "WATCH_VIDEO", "GET_QUOTE", "CONTACT_US", "APPLY_NOW", "GET_DIRECTIONS", "CALL_NOW", "MESSAGE_PAGE", "SUBSCRIBE", "BOOK_NOW", "ORDER_NOW", "DONATE_NOW", "SAY_THANKS", "SELL_NOW", "SHARE", "OPEN_LINK", "LIKE_PAGE", "FOLLOW_PAGE", "FOLLOW_USER", "REQUEST_TIME", "VISIT_PAGES_FEED", "USE_APP", "PLAY_GAME", "INSTALL_APP", "USE_MOBILE_APP", "INSTALL_MOBILE_APP", "OPEN_MOVIES", "AUDIO_CALL", "VIDEO_CALL", "GET_OFFER", "GET_OFFER_VIEW", "BUY_NOW", "ADD_TO_CART", "SELL", "GIFT_WRAP", "MAKE_AN_OFFER"]>>;
    link_url: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    instagram_actor_id: z.ZodOptional<z.ZodString>;
    adlabels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enable_standard_enhancements: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    enhancement_features: z.ZodOptional<z.ZodObject<{
        enhance_cta: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        image_brightness_and_contrast: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        text_improvements: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        image_templates: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enhance_cta: boolean;
        image_brightness_and_contrast: boolean;
        text_improvements: boolean;
        image_templates: boolean;
    }, {
        enhance_cta?: boolean | undefined;
        image_brightness_and_contrast?: boolean | undefined;
        text_improvements?: boolean | undefined;
        image_templates?: boolean | undefined;
    }>>;
    attachment_style: z.ZodDefault<z.ZodOptional<z.ZodEnum<["link", "album"]>>>;
    caption: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    message: string;
    account_id: string;
    page_id: string;
    enable_standard_enhancements: boolean;
    attachment_style: "link" | "album";
    description?: string | undefined;
    headline?: string | undefined;
    picture?: string | undefined;
    image_hash?: string | undefined;
    video_id?: string | undefined;
    call_to_action_type?: "LEARN_MORE" | "SHOP_NOW" | "SIGN_UP" | "DOWNLOAD" | "BOOK_TRAVEL" | "LISTEN_MUSIC" | "WATCH_VIDEO" | "GET_QUOTE" | "CONTACT_US" | "APPLY_NOW" | "GET_DIRECTIONS" | "CALL_NOW" | "MESSAGE_PAGE" | "SUBSCRIBE" | "BOOK_NOW" | "ORDER_NOW" | "DONATE_NOW" | "SAY_THANKS" | "SELL_NOW" | "SHARE" | "OPEN_LINK" | "LIKE_PAGE" | "FOLLOW_PAGE" | "FOLLOW_USER" | "REQUEST_TIME" | "VISIT_PAGES_FEED" | "USE_APP" | "PLAY_GAME" | "INSTALL_APP" | "USE_MOBILE_APP" | "INSTALL_MOBILE_APP" | "OPEN_MOVIES" | "AUDIO_CALL" | "VIDEO_CALL" | "GET_OFFER" | "GET_OFFER_VIEW" | "BUY_NOW" | "ADD_TO_CART" | "SELL" | "GIFT_WRAP" | "MAKE_AN_OFFER" | undefined;
    link_url?: string | undefined;
    instagram_actor_id?: string | undefined;
    adlabels?: string[] | undefined;
    enhancement_features?: {
        enhance_cta: boolean;
        image_brightness_and_contrast: boolean;
        text_improvements: boolean;
        image_templates: boolean;
    } | undefined;
    caption?: string | undefined;
}, {
    name: string;
    message: string;
    account_id: string;
    page_id: string;
    description?: string | undefined;
    headline?: string | undefined;
    picture?: string | undefined;
    image_hash?: string | undefined;
    video_id?: string | undefined;
    call_to_action_type?: "LEARN_MORE" | "SHOP_NOW" | "SIGN_UP" | "DOWNLOAD" | "BOOK_TRAVEL" | "LISTEN_MUSIC" | "WATCH_VIDEO" | "GET_QUOTE" | "CONTACT_US" | "APPLY_NOW" | "GET_DIRECTIONS" | "CALL_NOW" | "MESSAGE_PAGE" | "SUBSCRIBE" | "BOOK_NOW" | "ORDER_NOW" | "DONATE_NOW" | "SAY_THANKS" | "SELL_NOW" | "SHARE" | "OPEN_LINK" | "LIKE_PAGE" | "FOLLOW_PAGE" | "FOLLOW_USER" | "REQUEST_TIME" | "VISIT_PAGES_FEED" | "USE_APP" | "PLAY_GAME" | "INSTALL_APP" | "USE_MOBILE_APP" | "INSTALL_MOBILE_APP" | "OPEN_MOVIES" | "AUDIO_CALL" | "VIDEO_CALL" | "GET_OFFER" | "GET_OFFER_VIEW" | "BUY_NOW" | "ADD_TO_CART" | "SELL" | "GIFT_WRAP" | "MAKE_AN_OFFER" | undefined;
    link_url?: string | undefined;
    instagram_actor_id?: string | undefined;
    adlabels?: string[] | undefined;
    enable_standard_enhancements?: boolean | undefined;
    enhancement_features?: {
        enhance_cta?: boolean | undefined;
        image_brightness_and_contrast?: boolean | undefined;
        text_improvements?: boolean | undefined;
        image_templates?: boolean | undefined;
    } | undefined;
    attachment_style?: "link" | "album" | undefined;
    caption?: string | undefined;
}>;
export declare const UploadImageFromUrlSchema: z.ZodObject<{
    account_id: z.ZodString;
    image_url: z.ZodString;
    image_name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    account_id: string;
    image_url: string;
    image_name?: string | undefined;
}, {
    account_id: string;
    image_url: string;
    image_name?: string | undefined;
}>;
export type ListCampaignsParams = z.infer<typeof ListCampaignsSchema>;
export type CreateCampaignParams = z.infer<typeof CreateCampaignSchema>;
export type UpdateCampaignParams = z.infer<typeof UpdateCampaignSchema>;
export type DeleteCampaignParams = z.infer<typeof DeleteCampaignSchema>;
export type ListAdSetsParams = z.infer<typeof ListAdSetsSchema>;
export type CreateAdSetParams = z.infer<typeof CreateAdSetSchema>;
export type GetInsightsParams = z.infer<typeof GetInsightsSchema>;
export type ComparePerformanceParams = z.infer<typeof ComparePerformanceSchema>;
export type ExportInsightsParams = z.infer<typeof ExportInsightsSchema>;
export type ListAudiencesParams = z.infer<typeof ListAudiencesSchema>;
export type CreateCustomAudienceParams = z.infer<typeof CreateCustomAudienceSchema>;
export type CreateLookalikeAudienceParams = z.infer<typeof CreateLookalikeAudienceSchema>;
export type EstimateAudienceSizeParams = z.infer<typeof EstimateAudienceSizeSchema>;
export type ListCreativesParams = z.infer<typeof ListCreativesSchema>;
export type CreateAdCreativeParams = z.infer<typeof CreateAdCreativeSchema>;
export type PreviewAdParams = z.infer<typeof PreviewAdSchema>;
export type GenerateAuthUrlParams = z.infer<typeof GenerateAuthUrlSchema>;
export type ExchangeCodeParams = z.infer<typeof ExchangeCodeSchema>;
export type RefreshTokenParams = z.infer<typeof RefreshTokenSchema>;
export type GenerateSystemTokenParams = z.infer<typeof GenerateSystemTokenSchema>;
export type TroubleshootCreativeParams = z.infer<typeof TroubleshootCreativeSchema>;
export type AnalyzeCreativesParams = z.infer<typeof AnalyzeCreativesSchema>;
export type CreativeValidationEnhancedParams = z.infer<typeof CreativeValidationEnhancedSchema>;
export type UploadImageFromUrlParams = z.infer<typeof UploadImageFromUrlSchema>;
//# sourceMappingURL=mcp-tools.d.ts.map