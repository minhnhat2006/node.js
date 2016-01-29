function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("CLIENT_REFRESH", 'refresh');
define("CLIENT_REDIRECT", 'redirect');
define("FLASH_MESSAGE_RESET", 'flashmessage_reset');

define("LOGIN_AUTH", 'authenticate');
define("LOGOUT", 'logout');

define("COMMON_GET_DATE", 'c_date');

define("APPROVAL_APPROVE", 'a_approve');

define("CONSOLE_GET_ACCESS_TOKEN", 'csl_getaccesstoken');
define("CONSOLE_CALL_API", 'csl_callapi');

define("MASS_MAILER_ADD", 'mm_add');
define("MASS_MAILER_DELETE", 'mm_delete');
define("MASS_MAILER_UPDATE", 'mm_update');
define("MASS_MAILER_SEND_MESSAGE", 'mm_send_msg');
define("MASS_MAILER_LIST_FOR_USER", 'mm_list_for_user');
define("MASS_MAILER_ADD_USER", 'mm_add_user');
define("MASS_MAILER_REMOVE_USER", 'mm_remove_user');

define("BLOG_UPDATE", 'blog_update');
define("BLOG_DELETE", 'blog_delete');

define("COMMENT_UPDATE", 'comment_update');
define("COMMENT_DELETE", 'comment_delete');

define("USER_GIVE_CREDIT_TALLCAT_MEDIA", 'user_givecreditmedia');
define("USER_WARN_MEDIA", 'user_warn');
define("USER_SET_FLAG", 'user_flag');
define("USER_DELETE_MEDIA", 'user_delmedia');
define("USER_UPDATE", 'user_update');
define("USER_UPDATE_PASSWORD", 'user_changepass');
define("USER_DELETE", 'user_delete');
define("USER_GET_LIST", 'user_list');
define("USER_LOCK", 'user_lock');
define("CREATE_COLLECTION", 'create_collection');
define("PICK_COLLECTION", 'pick_collection');
define("PICK_COLLECTION_TRENDING", 'pick_collection_trending');

define("ADMIN1_LIST", 'admin1_list');

define("FLAG_QUEUE_UNFLAG_ITEM", 'fq_unflag');
define("FLAG_QUEUE_DELETE_ITEM", 'fq_delete');
define("FLAG_QUEUE_SET_MATURE", 'fq_setmature');

define("FLAG_MESSAGE_UNFLAG_ITEM", 'fm_unflag');

define("GROUP_REPORT_UNREPORT_ITEM", 'gr_unreport');
define("GROUP_REPORT_DELETE_ITEM", 'gr_delete');
define("GROUP_REPORT_SET_MATURE", 'gr_setmature');
define("GROUP_MANAGER_SEND_MESSAGE", 'gr_send_msg');
define("GROUP_MANAGER_SET_FEATURE", 'gr_set_ft');
define("GROUP_MANAGER_BASE_NUMBER_USERS", 'gr_base_numbers');

define("STAFF_PICK_REMOVE", 'stp_remove');
define("STAFF_PICK_REPLACE", 'stp_replace');
define("STAFF_PICK_UPDATE_SETTINGS", 'stp_settings');
define("STAFF_PICK_RESHOW", 'stp_reshow');
define("STAFF_PICK_LOADMORE", 'stp_loadmore');
define("STAFF_PICK_SHOW_NOW", 'stp_shownow');
define("STAFF_PICK_DELETED_ITEMS", 'stp_deleted');
define("STAFF_PICK_RESTORE_ITEMS", 'stp_restore');

define("MOVEMENT_REMOVE_CONTENTS", 'mvi_remove');
define("MOVEMENT_INSPIRED_UPDATE_SETTINGS", 'mvi_settings');
define("MOVEMENT_INSPIRED_SHOW_NOW", 'mvi_show_now');
define("MOVEMENT_INSPIRED_RESHOW", 'mvi_reshow');
define("MOVEMENT_INSPIRED_LOADMORE", 'mvi_loadmore');
define("MOVEMENT_INSPIRED_GET_DELETED_ITEMS", 'mvi_deleted');
define("MOVEMENT_INSPIRED_RESTORE", 'mvi_restore_media');

define("TRENDING_COLLECTION_CONTENTS", 'tci_remove');
define("TRENDING_COLLECTION_UPDATE_SETTINGS", 'tci_settings');
define("TRENDING_COLLECTION_SHOW_NOW", 'tci_show_now');
define("TRENDING_COLLECTION_RESHOW", 'tci_reshow');
define("TRENDING_COLLECTION_LOADMORE", 'tci_loadmore');

define("VIRAL_SET", 'viral_set');
define("VIRAL_REMOVE", 'viral_remove');

define("GRAPH_BUILDER_GET_EMBRACINGS", 'grapbld_getembracings');
define("GRAPH_BUILDER_ADD_GRAPH", 'grapbld_addgraph');
define("GRAPH_BUILDER_ADD", 'grapbld_add');
define("GRAPH_BUILDER_REMOVE", 'grapbld_remove');

define("STATS_GET_INTERVAL_REGISTRATIONS", 'stats_day_regs');
define("STATS_GET_INTERVAL_REGISTRATIONS_BY_TYPE", 'stats_day_regsbytype');
define("STATS_GET_INTERVAL_LOGIN", 'stats_day_login');
define("STATS_GET_INTERVAL_PAGE_VIEW", 'stats_day_pageview');
define("STATS_GET_INTERVAL_EMBRACE", 'stats_day_embrace');
define("STATS_GET_INTERVAL_INSPIRE", 'stats_day_inspire');
define("STATS_GET_INTERVAL_COMMENT", 'stats_day_comment');
define("STATS_GET_INTERVAL_CONTENT_UPLOADED", 'stats_day_cntupload');

define("STATS_GET_INTERVAL_MONTH_REGISTRATIONS", 'stats_month_regs');
define("STATS_GET_INTERVAL_MONTH_REGISTRATIONS_BY_TYPE", 'stats_month_regsbytype');
define("STATS_GET_INTERVAL_MONTH_LOGIN", 'stats_month_login');
define("STATS_GET_INTERVAL_MONTH_PAGE_VIEW", 'stats_month_pageview');
define("STATS_GET_INTERVAL_MONTH_EMBRACE", 'stats_month_embrace');
define("STATS_GET_INTERVAL_MONTH_INSPIRE", 'stats_month_inspire');
define("STATS_GET_INTERVAL_MONTH_COMMENT", 'stats_month_comment');

define("STATS_GET_MOST_VIEWED_PORTALS", 'stats_mostviewportal');
define("STATS_GET_HIGHEST_COMMENTED_CONTENT", 'stats_highestcommentcontent');
define("STATS_GET_HIGHEST_VIEWED_CONTENT", 'stats_highestviewcontent');
define("STATS_GET_HIGHEST_INSPIRED_CONTENT", 'stats_highestinspirecontent');
define("STATS_GET_TOP_15_EMBRACING", 'stats_top15embracing');
define("STATS_GET_TOP_15_EMBRACE", 'stats_top15embrace');
define("STATS_GET_TOP_TAGS", 'stats_top50tags');
define("STATS_GET_TOP_CREATIV", 'stats_top50creativ');
define("STATS_GET_BEANSTALKD", 'stats_beanstalkd');

define("STAT_CONTENT_UPLOAD_BY_DAY", 'content_upload_by_day');
define("DELETE_MEDIA", 'delete_media');
define("COLLECTION_REMOVE_MEDIA", 'collection_remove_media');
define("COLLECTION_RESTORE_MEDIA", 'collection_restore_media');
define("COLLECTION_PERMANENTLY_REMOVE_MEDIA", 'collection_permanently_remove_media');
define("COLLECTION_ADD_MEDIA", 'collection_add_media');
define("COLLECTION_MOVE_ORDER", 'collection_move_order');
define("COLLECTION_GET_ITEMS", 'collection_get_items');
define("COLLECTION_GET_DELETED_ITEMS", 'collection_get_deleted_items');

define("CONTENT_UPLOADED_BY_DAY", 'upload_by_day');
define("INSPIRE_MEDIA", 'inspire_media');

define("FILTER_BUILDER_ADD", 'fltb_add');
define("FILTER_BUILDER_DELETE", 'fltb_delete');
define("FILTER_BUILDER_UPDATE", 'fltb_update');
define("FILTER_BUILDER_RUN", 'fltb_run');

define("MAGAZINE_COVER_SAVE", 'issue_cover_save');
define("MAGAZINE_CONTENT_SAVE", 'issue_content_save');