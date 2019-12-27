exports.conf = {

    dirName: "/home/parul/Protractor Automation/catalog-automation",
    spec:
        [
            "/e2e/Specs/login-spec.js"

        ],
    baseURLReact : "https://admin-staging.catalog.cc/",
    // baseURLReact : "https://admin.catalog.cc/",
    baseURLDjango : "https://api-staging.catalog.cc/admin/",
    brandURL : "http://staging.catalog.cc",
    // brandURL : "http://catalog.cc",
    loginBrand : "/auth/login",
    dbConnection: {
        user: 'postgres',
        host: 'staging-catalog.czjhp5bklmv4.us-west-1.rds.amazonaws.com',
        // host: 'production-unity.czjhp5bklmv4.us-west-1.rds.amazonaws.com',
        database: 'stag_catalog',
        // database: 'catalog',
        password: 'D3v3l0pm3nt',
        port: 5432,
    }
};
