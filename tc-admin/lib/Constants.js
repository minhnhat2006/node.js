function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("REQUEST_METHOD_GET", 'GET');
define("REQUEST_METHOD_POST", 'POST');

define("API_PATH_AUTH", '/admin/auth');

define("API_PATH_APPROVAL", '/admin/approval');
define("API_PATH_APPROVAL_APPROVE", '/admin/approval?type=approve');

define("API_PATH_CONSOLE_GET_ACCESS_TOKEN", '/admin/console/get/token');
define("API_PATH_CONSOLE_CALL_API", '/admin/console?type=api');

define("API_PATH_USER", '/admin/user');
define("API_PATH_USER_DETAIL", '/admin/user/get/info');
define("API_PATH_USER_MEDIA_ITEMS", '/admin/user/get/media-items');
define("API_PATH_COLLECTION_MEDIA_ITEMS", '/admin/collection/get/collection-items');
define("API_PATH_COLLECTION_DELETED_MEDIA_ITEMS", '/admin/collection/get/collection-deleted-items');
define("API_PATH_TRENDING_COLLECTION_MEDIA_ITEMS", '/admin/collection/get/trending-collection-items');
define("API_PATH_USER_COLLECTION", '/admin/collection/get/user-collection');
define("API_PATH_PICK_COLLECTION", '/admin/collection?type=pick');
define("API_PATH_PICK_COLLECTION_TRENDING", '/admin/collection?type=picktrending');
define("API_PATH_USER_EMBRACING_LIST", '/admin/graph-builder/get/embracings');
define("API_PATH_USER_MEDIA_CREDIT", '/admin/user/get/media-credit');
define("API_PATH_USER_BLOG_CREDIT", '/admin/user/get/blog-credit');
define("API_PATH_USER_UPDATE", '/admin/user?type=update');
define("API_PATH_USER_UPDATE_PASSWORD", '/admin/user?type=changepass');
define("API_PATH_USER_DELETE", '/admin/user?type=delete');
define("API_PATH_USER_LOCK", '/admin/user?type=lock');
define("API_PATH_CREATE_COLLECTION", '/admin/user?type=create_collection');
define("API_PATH_USER_DELETE_MEDIA", '/admin/media?type=delete_media');
define("API_PATH_USER_SET_FLAG", '/admin/user?type=flag');
define("API_PATH_USER_WARN_MEDIA", '/admin/media?type=warn');
define("API_PATH_USER_GIVE_CREDIT_ON_TALLCAT_MEDIA", '/admin/user?type=credittcmedia');
define("API_PATH_USER_CREATE_COLLECTION_LIST", '/admin/user/get/collection-creators');
define("API_PATH_COLLECTION_REMOVE_MEDIA", '/admin/collection?type=remove_media');
define("API_PATH_COLLECTION_RESTORE_MEDIA", '/admin/collection?type=restore_media');
define("API_PATH_COLLECTION_PERMANENTLY_REMOVE_MEDIA", '/admin/collection?type=permanently_remove_media');
define("API_PATH_COLLECTION_ADD_MEDIA", '/admin/collection?type=add-media');
define("API_PATH_COLLECTION_MOVE_ORDER", '/admin/collection?type=move-order');
define("API_PATH_COLLECTION_UPDATE_SETTINGS", '/admin/collection?type=settings');
define("API_PATH_COLLECTION_REMOVE_CONTENTS", '/admin/collection?type=remove');
define("API_PATH_COLLECTION_SHOW_NOW", '/admin/collection?type=show');
define("API_PATH_COLLECTION_RESHOW", '/admin/collection?type=reshow');
define("API_PATH_TRENDING_COLLECTION_LOADMORE", '/admin/collection/get/loadmore');

define("API_PATH_GET_ADMIN1_LIST", '/admin/user/get/admin1-list');

define("API_PATH_COMMENT_LIST", '/admin/comment/get/comment-list');
define("API_PATH_COMMENT_DETAIL", '/admin/comment/get/comment-info');
define("API_PATH_COMMENT_UPDATE", '/admin/comment?type=update');
define("API_PATH_COMMENT_DELETE", '/admin/comment?type=delete');

define("API_PATH_BLOG_LIST", '/admin/blog');
define("API_PATH_BLOG_DETAIL", '/admin/blog/get/info');
define("API_PATH_BLOG_UPDATE", '/admin/blog?type=update');
define("API_PATH_BLOG_DELETE", '/admin/blog?type=delete');
define("API_PATH_BLOG_SEARCH", '/admin/blog/get/search');

define("API_PATH_CHANGE_LIST", '/admin/change/get/list');

define("API_PATH_FLAG_QUEUE_ITEMS", '/admin/flag-queue/get/list');
define("API_PATH_FLAG_QUEUE_UNFLAG_ITEM", '/admin/flag-queue?type=un_flag');
define("API_PATH_FLAG_QUEUE_SET_MATURE", '/admin/flag-queue?type=mark_mature');

define("API_PATH_FLAG_MESSAGE_UNFLAG_ITEM", '/admin/flag-message?type=un_flag');
define("API_PATH_FLAG_MESSAGE_ITEMS", '/admin/flag-message/get/list');

define("API_PATH_STAFF_PICK_ITEMS", '/admin/staff-pick/get/list');
define("API_PATH_STAFF_PICK_REMOVE", '/admin/staff-pick?type=remove');
define("API_PATH_STAFF_PICK_REPLACE", '/admin/staff-pick?type=replace');
define("API_PATH_STAFF_PICK_UPDATE_SETTINGS", '/admin/staff-pick?type=settings');
define("API_PATH_STAFF_PICK_RESHOW", '/admin/staff-pick?type=reshow');
define("API_PATH_STAFF_PICK_SHOWNOW", '/admin/staff-pick?type=show-now');
define("API_PATH_STAFF_PICK_RESTORE_MEDIA", '/admin/staff-pick?type=restore_media');

// define for movement inspired manager
define("API_PATH_MOVEMENT_INSPIRED_ITEMS", '/admin/creative-movement/get/list');
define("API_PATH_MOVEMENT_REMOVE_CONTENTS", '/admin/creative-movement?type=remove');
define("API_PATH_MOVEMENT_INSPIRED_UPDATE_SETTINGS", '/admin/creative-movement?type=settings');
define("API_PATH_MOVEMENT_INSPIRED_SHOW_NOW", '/admin/creative-movement?type=show');
define("API_PATH_MOVEMENT_INSPIRED_RESHOW", '/admin/creative-movement?type=reshow');
define("API_PATH_MOVEMENT_INSPIRED_RESTORE_MEDIA", '/admin/creative-movement?type=restore_media');

define("API_PATH_GRAPH_BUILDER_ADD_GRAPH", '/admin/graph-builder?type=addgraph');
define("API_PATH_GRAPH_BUILDER_ADD_EMBRACING", '/admin/graph-builder?type=add');
define("API_PATH_GRAPH_BUILDER_REMOVE_EMBRACING", '/admin/graph-builder?type=remove');

define("API_PATH_MASS_MAILER_LIST", '/admin/mass-mailer/get/list');
define("API_PATH_MASS_MAILER_LIST_FOR_USER", '/admin/mass-mailer/get/list-for-user');
define("API_PATH_MASS_MAILER_ADD_USER", '/admin/mass-mailer?type=add-user');
define("API_PATH_MASS_MAILER_REMOVE_USER", '/admin/mass-mailer?type=remove-user');
define("API_PATH_MASS_MAILER_ADD", '/admin/mass-mailer?type=add');
define("API_PATH_MASS_MAILER_DELETE", '/admin/mass-mailer?type=delete');
define("API_PATH_MASS_MAILER_UPDATE", '/admin/mass-mailer?type=update');
define("API_PATH_MASS_MAILER_SEND_MESSAGE", '/admin/mass-mailer?type=send');

define("API_PATH_VIRAL_USER_LIST", '/admin/viral/get/list');
define("API_PATH_VIRAL_SET", '/admin/viral?type=set');
define("API_PATH_VIRAL_REMOVE", '/admin/viral?type=remove');

define("API_PATH_NOTIFICATION_USER_LIST", '/admin/notifications/get/list');

define("API_PATH_GATHERING_LIST_ITEMS", '/admin/gathering-manager/get/list');

define("API_PATH_GATHERING_REPORTED_UNREPORTED_ITEM", '/admin/gathering-manager?type=un_report');
define("API_PATH_GATHERING_REPORTED_DELETE_ITEM", '/admin/gathering-manager?type=delete');
define("API_PATH_GATHERING_REPORTED_SET_MATURE", '/admin/gathering-manager?type=mark_mature');
define("API_PATH_GATHERING_MANAGER_SEND_MESSAGE", '/admin/gathering-manager?type=send');
define("API_PATH_GATHERING_MANAGER_SET_FEATURE", '/admin/gathering-manager?type=set_feature');
define("API_PATH_GATHERING_MANAGER_SET_BASE_NUMBER_USERS", '/admin/gathering-manager?type=set_base_number');

define("API_PATH_GATHERING_REPORTED_ITEMS", '/admin/gathering-manager/get/list_reported');

// define for stats here
define("API_PATH_STAT_COMMON_STAT", '/admin/statistic/post_type/common_stat');
define("API_PATH_STAT_GET_CONTENT_UPLOAD_BY_DAY", '/admin/statistic/post_type/media_upload_by_day');
define("API_PATH_STAT_MOST_VIEWED_PORTAL", '/admin/statistic/post_type/most_view_portal');
define("API_PATH_STAT_TOP_EMBRACING", '/admin/statistic/post_type/top_embracing');
define("API_PATH_STAT_TOP_EMBRACE", '/admin/statistic/post_type/top_embrace');
define("API_PATH_STAT_TOP_USED_TAGS", '/admin/statistic/post_type/top_tag');
define("API_PATH_STAT_TOP_CREATIV_CATEGORIES", '/admin/statistic/post_type/top_creativ_categories');
define("API_PATH_STAT_HIGHEST_VIEW_MEDIA", '/admin/statistic/post_type/highest_view_media');
define("API_PATH_STAT_HIGHEST_COMMENT_MEDIA", '/admin/statistic/post_type/highest_comment_media');
define("API_PATH_STAT_HIGHEST_INSPIRE_MEDIA", '/admin/statistic/post_type/highest_inspire_media');
define("API_PATH_STAT_BEANSTALKD_STAT", '/admin/statistic/post_type/beanstalkd_stat');
define("API_PATH_STAT_BEANSTALKD_STAT_FAILED", '/admin/statistic/post_type/beanstalkd_stat_failed');
define("API_PATH_STAT_REG", '/admin/statistic/post_type/registration');
define("API_PATH_STAT_REG_HOUR", '/admin/statistic/post_type/registration_hour');
define("API_PATH_STAT_INSPIRE_MEDIA", '/admin/statistic?type=inspire');


define("API_PATH_STAT_INTERVAL_DAY_REG", '/admin/statistic/post_type/day_regs');
define("API_PATH_STAT_INTERVAL_DAY_REG_BY_TYPE", '/admin/statistic/post_type/day_regsbytype');
define("API_PATH_STAT_INTERVAL_DAY_LOGIN", '/admin/statistic/post_type/day_login');
define("API_PATH_STAT_INTERVAL_DAY_PAGE_VIEW", '/admin/statistic/post_type/day_pageview');
define("API_PATH_STAT_INTERVAL_DAY_EMBRACE", '/admin/statistic/post_type/day_embrace');
define("API_PATH_STAT_INTERVAL_DAY_INSPIRE", '/admin/statistic/post_type/day_inspire');
define("API_PATH_STAT_INTERVAL_DAY_COMMENT", '/admin/statistic/post_type/day_comment');
define("API_PATH_STAT_INTERVAL_DAY_CONTENT_UPLOADED", '/admin/statistic/post_type/day_cntupload');



define("API_PATH_STAT_INTERVAL_MONTH_REG", '/admin/statistic/post_type/month_regs');
define("API_PATH_STAT_INTERVAL_MONTH_REG_BY_TYPE", '/admin/statistic/post_type/month_regsbytype');
define("API_PATH_STAT_INTERVAL_MONTH_LOGIN", '/admin/statistic/post_type/month_login');
define("API_PATH_STAT_INTERVAL_MONTH_PAGE_VIEW", '/admin/statistic/post_type/month_pageview');
define("API_PATH_STAT_INTERVAL_MONTH_EMBRACE", '/admin/statistic/post_type/month_embrace');
define("API_PATH_STAT_INTERVAL_MONTH_INSPIRE", '/admin/statistic/post_type/month_inspire');
define("API_PATH_STAT_INTERVAL_MONTH_COMMENT", '/admin/statistic/post_type/month_comment');

define("API_PATH_GET_MEDIA", '/admin/media/post_type/search_media');
define("API_PATH_DELETE_MEDIA", '/admin/media');

define("API_PATH_REPORT_DATA", '/admin/report/get/report');
define("API_PATH_REPORT_COUNTRY_LIST", '/admin/report/get/countries');
define("API_PATH_REPORT_COUNTRY_GROWTH", '/admin/report/get/country-growth');

define("API_PATH_FILTER_BUILDER_COUNTRIES", '/admin/filter-builder/get/countries');
define("API_PATH_FILTER_BUILDER_STATES", '/admin/filter-builder/get/states');
define("API_PATH_FILTER_BUILDER_LIST", '/admin/filter-builder/get/list');
define("API_PATH_FILTER_BUILDER_DETAIL", '/admin/filter-builder/get/info');
define("API_PATH_FILTER_BUILDER_ADD", '/admin/filter-builder?type=add');
define("API_PATH_FILTER_BUILDER_UPDATE", '/admin/filter-builder?type=update');
define("API_PATH_FILTER_BUILDER_DELETE", '/admin/filter-builder?type=delete');
define("API_PATH_FILTER_BUILDER_RUN", '/admin/filter-builder?type=run');

define("API_PATH_MAGAZINE_GET_BY_ID", '/admin/magazine?type=issue-by-id');
define("API_PATH_MAGAZINE_COVER_SAVE", '/admin/magazine?type=save-cover');
define("API_PATH_MAGAZINE_CONTENT_SAVE", '/admin/magazine?type=save-content');
/**
 * Page titles
 */
define("PAGE_TITLE_POSTFIX", ' - Admin Control Panel');

/**
 * Default values
 */
define("CONTROLLER_ACTION_DEFAULT", 'index');
define("DEFAULT_PAGE_PARAM", 'page');
define("DEFAULT_PAGE_ROW_COUNT", 'rowcount');
define("DEFAULT_PAGE_ROW_TOTAL", 'rowtotal');
define("DEFAULT_PAGE_PARAM", 'page');
define("DEFAULT_PAGE_COUNT", 20);
define("DEFAULT_PAGE_RANGE", 5);
define("DEFAULT_MOVEMENT_ACTION", 'inspire');
define("DEFAULT_CURATOR_PAGE_COUNT", 40);

/**
 * Rest API param names
 */
define("RES_APPROVAL_LIST", 'list');
define("RES_USER_LIST", 'list');
define("RES_USER_DETAIL", 'info');
define("RES_USER_USER_DATA", 'user');
define("RES_COLLECTION_DATA", 'collection');
define("RES_USER_MEDIA_ITEMS", 'list');

define("RES_BLOG_LIST", 'list');
define("RES_BLOG_DETAIL", 'info');

define("RES_COMMENT_DETAIL", 'comment');

define("RES_COMMENT_MEDIA", 'media');
define("RES_COMMENT_LIST", 'comments');

define("RES_FLAG_QUEUE_ITEMS", 'list');

define("RES_FLAG_MESSAGE_ITEMS", 'list')

define("RES_STAFF_PICK_SELECTED", 'set');
define("RES_STAFF_PICK_HISTORY", 'hisset');
define("RES_STAFF_PICK_NOT_SELECTED", 'notset');
define("RES_STAFF_PICK_EXPIRE", 'expire');
define("RES_STAFF_PICK_EXPIRE_NUMBER", "expiretime");
define("RES_STAFF_PICK_CONFIG_MEDIA_SIZE", "mediasize");
define("RES_STAFF_PICK_CONFIG_COLLECTION_SIZE", "collectionsize");
define("RES_STAFF_PICK_CONFIG_REL_DATE", "relsdate");
define("RES_STAFF_PICK_MEDIA_TYPE", 'media_type');

define("RES_MASS_MAILER_LIST", 'massmailers');
define("RES_MASS_MAILER_USER_LIST", 'users');
define("RES_MASS_MAILER_USER_LIST_COUNT", 'users_total');
define("RES_MASS_MAILER_ID", 'mid');
define("RES_MASS_MAILER_USER_PAGE", 'upage');

define("RES_VIRAL_USER_LIST", 'list');

define("RES_NOTIFICATION_USER_COUNT", 'count');

define("RES_GATHERING_REPORTED_ITEMS", 'list');

define("RES_FILTER_BUILDER_ID", 'id');
define("RES_FILTER_BUILDER_COUNTRIES", 'countries');
define("RES_FILTER_BUILDER_STATES", 'states');
define("RES_FILTER_BUILDER_LIST", 'filters');
define("RES_FILTER_BUILDER_DETAIL", 'info');
define("RES_FILTER_BUILDER_CONTENT", 'ctn');
define("RES_FILTER_BUILDER_USER", 'users');


define("RES_MOVEMENT_INSPIRED_SELECTED", 'set');
define("RES_MOVEMENT_INSPIRED_HISTORY", 'hisset');
define("RES_MOVEMENT_INSPIRED_QUEUE", 'notset');
define("RES_MOVEMENT_INSPIRED_TIMESTAMP", 'timestamp');
define("RES_MOVEMENT_INSPIRED_CONFIG_NUMBER", "expiretime");
define("RES_MOVEMENT_INSPIRED_CONFIG_ACTIVE_SIZE", "mediasize");
define("RES_MOVEMENT_INSPIRED_MEDIA_TYPE", "media_type");
define("RES_MOVEMENT_ACTION_TYPE", 'action_type');
define("RES_MOVEMENT_INSPIRED_EXPIRE", 'expire');
define("RES_MOVEMENT_INSPIRED_REL_DATE", "relsdate");

define("RES_TRENDING_COLLECTION_ITEMS_SELECTED", 'set');
define("RES_TRENDING_COLLECTION_ITEMS_HISTORY", 'hisset');
define("RES_TRENDING_COLLECTION_ITEMS_QUEUE", 'notset');
define("RES_TRENDING_COLLECTION_ITEMS_TIMESTAMP", 'timestamp');
define("RES_TRENDING_COLLECTION_ITEMS_CONFIG_NUMBER", "expiretime");
define("RES_TRENDING_COLLECTION_ITEMS_CONFIG_ACTIVE_SIZE", "mediasize");
define("RES_TRENDING_COLLECTION_ITEMS_EXPIRE", 'expire');
define("RES_TRENDING_COLLECTION_ITEMS_REL_DATE", "relsdate");

/**
 * Request parameters
 */
define("PARAM_USER_SEARCH_STATUS", 'is_search');
define("PARAM_USER_SEARCH_TEXT", 's_user');
define("PARAM_USER_USER_STATUS", 'user_status');
define("PARAM_USER_CREATE_COLLECTION", 'collection_creators');
define("PARAM_PICK_COLLECTION", 'pick_collection');
define("PARAM_USER_USER_TYPE", 'user_type');
define("PARAM_USER_USER_COUNTRY", 'user_country');
define("PARAM_USER_USER_ADMIN1", 'admin1');
define("PARAM_USER_SORT", 'sort');
define("PARAM_USER_SORT_BY_USER_CREATED", 'created');
define("PARAM_USER_SORT_BY_USER_LAST_LOGIN", 'lastlogin');
define("PARAM_USER_SORT_BY_USER_LAST_UPDATE", 'lastupdate');
define("PARAM_USER_SORT_BY_NUMBER_OF_LOGINS", 'numberoflogin');
define("PARAM_USER_ORDER", 'order');
define("PARAM_USER_USER_ID", 'user');
define("PARAM_COLLECTION_ID", 'id');

define("PARAM_BLOG_ID", 'id');

define("PARAM_COMMENT_MEDIA_ID", 'media');
define("PARAM_COMMENT_MEDIA_TYPE", 'mtype');
define("PARAM_COMMENT_KEY", 'key');

define("PARAM_CHANGE_SEARCH", 'q');

define("PARAM_FLAG_QUEUE_ORDER", 'order');

define("PARAM_VIRAL_USER_VIRAL", 'user_viral');

define("PARAM_MASS_MAILER_PAGE_USER", 'upage');
define("PARAM_MASS_MAILER_ID", 'id');

define("PARAM_REPORT_DATE_FROM", 'from');
define("PARAM_REPORT_DATE_TO", 'to');

define("PARAM_GROUP_MANAGER_LIST_ORDER", 'list');
define("PARAM_GROUP_MANAGER_ORDER_BY_REPORT", 'order_reported');
define("PARAM_GROUP_MANAGER_SEARCH_TEXT", 's_gather');
define("PARAM_GROUP_MANAGER_FEATURED", 'featured_gather');
define("PARAM_GROUP_REPORTED_ORDER", 'order');

define("PARAM_FILTER_BUILDER_ID", 'id');
define("PARAM_FILTER_BUILDER_NAME", 'name');
define("PARAM_FILTER_BUILDER_VALUE", 'val');
define("PARAM_FILTER_BUILDER_RUN", 'test');
define("PARAM_FILTER_BUILDER_ITEM_INDEX", 'index');


/**
 * Object fields
 */
define("FIELD_USER_SUBPATH", 'subpath');
define("FIELD_USER_NAME", 'name');
define("FIELD_COLLECTION_TITLE", 'title');
define("FIELD_COMMENT_COMMENT", 'comment');

/**
 * Define stat constant here
 */
define("COMMON_STAT", "common_stat");
define("MEDIA_UPLOAD_BY_DAY", 'media_upload_by_day');
define("MOST_VIEW_PORTAL", 'most_view_portal');
define("TOP_EMBRACING", 'top_embracing');
define("TOP_EMBRACE", 'top_embrace');
define("TOP_TAG", 'top_tag');
define("TOP_TAG_DETAIL", 'top_tag_detail');
define("HIGHEST_VIEW_MEDIA", 'highest_view_media');
define("HIGHEST_INSPIRE_MEDIA", 'highest_inspire_media');
define("HIGHEST_COMMENT_MEDIA", 'highest_comment_media');
define("BEANSTALKD_STAT", 'beanstalkd_stat');
define("STAT_DEFAULT_MEDIA_TYPE", 'photo');
define("STAT_MEDIA_TYPE", 'media_type');
define("ITEM_PER_PAGE", 'item_per_page');
define("DATE_CREATED", 'date');
define("STAT_RECORD_LIMIT", 'limit');
define("SEARCH_CRITERIA", 'q');
define("STAT_REG_FROM", 'from');
define("STAT_REG_TO", 'to');

/**
 * Magazine
 */
define("ISSUE_ID", 'id');
