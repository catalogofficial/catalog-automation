let pg = require('pg');
let rows;
let config = require ('../conf/configuration');
db = config.conf.dbConnection;

exports.pgAdmin = {

    ConnectDatabase : function () {
        this.connectionString = {
            user: db.user,
            host: db.host,
            database: db.database,
            password: db.password,
            port: db.port,
        };
    },

    ExecuteQuery : function (queryToExecute, successCallBack) {
            let connectDatabase = new this.ConnectDatabase()
            let pgClient = new pg.Pool(connectDatabase.connectionString);

            pgClient.connect(function (err, client) {

                const query = client.query(new pg.Query(queryToExecute));
                query.on('row', row => successCallBack(row));

                query.on('end', (res) => {
                    console.log("ending");
                    pgClient.end()
                })
                query.on('error', (res) => {
                    console.log(res);
                })

            });
    }
};
