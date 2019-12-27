let contentRequestPage = require('../../PageObject/contentRequest-po.js');
let navigationPage = require('../../PageObject/navigation-po');
let fakeData = require('../../../../Utils/FakeData.js');
let common = require ('../../../../Utils/common.js');
let data = require ('../../../../Utils/dataFile_React.js');
let tenantPo = require('../PageObjectTenant/tenantDropDown-po');
let brandsPo = require('../PageObjectTenant/brands-po');
let crPo = require('../PageObjectTenant/contentRequest-po');
let queries = require('../../../../Utils/queriesToRun');


describe('Verify creating a new CR from the new react admin under a particular tenant!', function () {

    beforeAll(function () {
        browser.sleep(6000);
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.brands.createBrandCTA, "Content Request");
    });

    it('Verify that admin successfully lands on CR page on new admin', async function () {
        await browser.logger.info("***********Verifying title of CR page***********");
        await contentRequestPage.verifyDataOnListing(data.reactGlobal.titleLeft,
            data.reactContentRequest.crTitle, 'Content Request')
            .then(function(title){
                console.log("Title of page is: " + title)
            })
    });

    // it('Verify TEST', async function () {
    //     await browser.logger.info("***********Verifying switching tenant***********");
    //     common.waitForElement(data.reactGlobal.titleLeft);
    //     await tenantPo.searchTenant("Polly Tenant");
    //     common.waitForElement(data.reactContentRequest.viewShotList);
    // });

    it('Verify tenant remains even after page refresh', async function () {
        await browser.logger.info("***********Refreshing webpage and verifying tenant.....***********");
        browser.refresh();
        await tenantPo.returnSelectedTenant(fakeData.randomFirstName + " Tenant")
        // await tenantPo.returnSelectedTenant("Walter Tenant")

    });

    it('Verify creating CR under this tenant', async function () {
        await browser.logger.info("***********Verifying brand creation under this tenant.....***********");
        await crPo.createCR(fakeData.randomFirstName + " Brand")
            .then(function(message){
                console.log(message);
            })
    });

    it("Verify tenant of added CR in DB", async function () {
        await browser.logger.info("***********Verifying tenant of CR from DB.....***********");
        data.reactContentRequest.crIDListing.getText().then(async function(crId){
            await brandsPo.verifyDbTenant(queries.queryParams.returnCRTenant(
                crId), "Content Request").then(function(dbTenant){
                expect(dbTenant).toEqual(fakeData.randomFirstName + " Tenant");
                // expect(dbTenant).toEqual("Walter Tenant");
            })
        })

    })

    it('Verify adding shots to the CR', async function () {
        await browser.logger.info("***********Verifying adding shots to CR.....***********");
        await crPo.addShots();
    });

    it("Verify tenant of added shots in DB", async function () {
        await browser.logger.info("***********Verifying tenant of user from DB.....***********");
        data.reactContentRequest.viewShotList.click();
        common.waitForElement(data.reactShotList.shotStatus);
        data.reactShotList.shotStatus.getText().then(async function(shotNumber){
            expect(shotNumber).toContain('10');
            console.log("Shots added successfully!!")
            await brandsPo.verifyDbTenant(queries.queryParams.
            returnShotTenant(shotNumber), "Shots").then(function(dbTenant){
                expect(dbTenant).toEqual(fakeData.randomFirstName + " Tenant");
                // expect(dbTenant).toEqual("Polly Tenant");
            })
        })

    })
});
