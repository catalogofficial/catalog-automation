let navigationPage = require('../../PageObject/navigation-po');
let data = require ('../../../../Utils/dataFile_React.js');
let notificationsPo = require('../PageObjectTenant/notifications-po');
let fakeData = require('../../../../Utils/FakeData.js');
let common = require ('../../../../Utils/common');
let sgpt = require('sg-protractor-tools');
let pg = require('../../../../Utils/postgresDB.js');
let queries = require('../../../../Utils/queriesToRun');
let logout = require('../../../ReactAdmin/PageObject/login-po');
let uploadWidgetPage = require('../../PageObject/uploadWidget-po');
let contentRequestPage = require('../../PageObject/contentRequest-po.js');
let EC = protractor.ExpectedConditions;
let test = "Alayna";
// let test = fakeData.randomFirstName;
let gmailUrl = "https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";

describe('Verify bulk update shot fields from the new admin', function () {

    beforeAll(function () {
        browser.sleep(6000);
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.brands.createBrandCTA, "Content Request");
    });

    it('Enter shot list of a CR', async function () {
        await browser.logger.info("***********Verifying searching through the list of CRs***********");
        common.waitForElement(data.reactGlobal.searchIcon);
        // await common.search(data.reactContentRequest.searchFieldCR, fakeData.randomFirstName + " Brand", data.reactContentRequest.viewShotList)
        await common.search(data.reactContentRequest.searchFieldCR, test + " Brand", data.reactContentRequest.viewShotList)
            .then(function(brand){
                console.log("Search successfully performed for brand: " + brand);
                common.waitForElement(data.reactContentRequest.viewShotList);
                data.reactContentRequest.viewShotList.click();
                common.waitForElement(data.reactShotList.shotStatus);
            })
    });

    it('Verify opening upload widget', function () {
        console.log("***********Verifying opening CR drawer***********");
        data.reactShotList.shotStatus.click();
        common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
        uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
    });


});
