exports.queries = {

    SELECT_USER_QUERY : "select username from user_user where is_staff = 't' and " +
    "is_superuser = 't' and is_active = 't' and tenant_id = 1 order by id desc limit 1;",
    GET_USER_NAME : "select concat(first_name, ' ', last_name) as fullname from user_user where is_staff = 't' and is_active = 't' order by id desc limit 1;",
    DONE_QUERY : 'select count(*) from shot where (schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\') > (current_date::timestamp at time zone \'utc\' at time zone \'pdt\') - interval \'7 days\' and status = \'DONE\';',
    PHOTOSHOOT_QUERY : 'select COUNT(*) from shot where DATE(schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\') = DATE(current_date::timestamp at time zone \'pdt\') and status = \'PHOTOSHOOT\';',
    SELECTION_QUERY : 'select COUNT(*) from shot where (DATE(schedule_on::timestamp at time zone \'utc\' at time zone \'pst\') <= DATE(current_date::timestamp at time zone \'pst\') or schedule_on isnull) and status = \'SELECTION\';',
    EDITING_QUERY : 'select COUNT(*) from shot where (DATE(schedule_on::timestamp at time zone \'utc\' at time zone \'pst\') <= DATE(current_date::timestamp at time zone \'pst\') or schedule_on isnull) and status = \'EDITING\';',
    BACKLOG_QUERY : 'select count(*) from shot_details SD inner join shot S ON SD.shot_id = S.id where (S.schedule_on IS NULL and S.status = \'BACKLOG\') OR (((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE < (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) AND S.status = \'PHOTOSHOOT\');',
    GET_SPILLED_CARD_ID: 'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where\n' +
    '(((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE < (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) AND S.status = \'PHOTOSHOOT\') limit 1;',
    GET_CRID_SPILLED_SHOT : 'SELECT content_request_id FROM shot where id in (\n' +
    'SELECT shot_id from shot_details where id in (\n' +
    'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where\n' +
    '(((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE < (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) AND S.status = \'PHOTOSHOOT\') limit 1));',
    GET_BACKLOG_CARD_ID : 'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where (S.schedule_on IS NULL and S.status = \'BACKLOG\') limit 1;',
    GET_CRID_BACKLOG_SHOT : 'SELECT content_request_id FROM shot where id in (\n' +
    'SELECT shot_id from shot_details where id in (\n' +
    'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where\n' +
    '(((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE < (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) AND S.status = \'PHOTOSHOOT\') limit 1));',
    GET_CURRENT_CALENDAR : 'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where ((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE = (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) limit 1;',
    GET_CRID_CURRENT_CALENDAR : 'SELECT content_request_id FROM shot where id in (\n' +
    'SELECT shot_id from shot_details where id in(\n' +
    'select SD.id from shot_details SD inner join shot S ON SD.shot_id = S.id where ((S.schedule_on::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE = (now()::timestamp at time zone \'utc\' at time zone \'pdt\')::DATE) limit 1));',
    GET_TENANT_NAME : 'SELECT ARRAY(select name from tenant order by name asc limit 10);',

};

exports.queryParams = {

    returnBusinessUsers : function (user) {
        BUSINESS_USERS = "select username from user_user where " +
        "(admin_access = 't' or is_staff = 't') and username like '%" + user + "%' " +
        "order by id desc limit 1;";
        return BUSINESS_USERS;
    },

    returnBrandTenant : function (brand){
        BRAND_TENANT = "select distinct name from tenant where id in " +
            "(select tenant_id from brand_brand where name = '" + brand + "');";
        return BRAND_TENANT;
    },

    returnUserTenant : function (user) {
        USER_TENANT = "select distinct name from tenant where id in " +
            "(select tenant_id from user_user where username = '" + user + "');"
        return USER_TENANT;
    },

    returnCRTenant : function (crID) {
        CR_TENANT = "select distinct name from tenant where id in (select tenant_id " +
            "from content_contentrequest where id = " + crID + ');';
        return CR_TENANT;
    },

    returnShotTenant : function (shotNumber) {
        SHOT_TENANT = "select name from tenant where id in (select tenant_id " +
            "from shot where shot_number = '" + shotNumber + "');"
        return SHOT_TENANT;
    },

    returnUserEmail : function (username) {
        USER_NAME = "select username from user_user where concat(first_name, last_name) " +
            "like '%" + username + "%';";
        return USER_NAME;
    }
}

