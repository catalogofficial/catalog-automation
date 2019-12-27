let common = require ('../../../../Utils/common.js');
let data = require ('../../../../Utils/dataFile_React.js');
let pg = require('../../../../Utils/postgresDB.js');
let queries = require('../../../../Utils/queriesToRun');
let tenantPo = require('../PageObjectTenant/tenantDropDown-po');

describe('Verify whether tenant displayed in drop down are as in DB', function () {

    beforeAll(function () {
        common.waitForElement(data.reactContentRequest.viewShotList);
        common.waitForElement(data.reactGlobal.tenantDropDown);
        browser.isElementPresent(data.reactGlobal.tenantDropDown).then( function (result) {
            if (result) {
                console.log("Admin can see tenant drop down on the new admin!!");
            };
        });
    });

    it('Verify tenant names as in DB!', function () {
        console.log("***********Verifying if tenant names in drop down are as in DB.....***********");
        function getTenant (response) {
            tenantPo.verifyTenantNames(response['array']).then(function(message){
                console.log(message);
            });
        };
        pg.pgAdmin.ExecuteQuery(queries.queries.GET_TENANT_NAME, getTenant);
    });


});
