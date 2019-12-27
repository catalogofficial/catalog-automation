let contentRequestPage = require('../../PageObject/contentRequest-po.js');
let navigationPage = require('../../PageObject/navigation-po');
let fakeData = require('../../../../Utils/FakeData.js');
let common = require ('../../../../Utils/common.js');
let data = require ('../../../../Utils/dataFile_React.js');
let tenantPo = require('../PageObjectTenant/tenantDropDown-po');
let brandsPo = require('../PageObjectTenant/brands-po');
let queries = require('../../../../Utils/queriesToRun');


describe('Verify creating a new brand from the new react admin under a particular tenant!', function () {

    beforeAll(function () {
        browser.sleep(6000);
        browser.get(common.getAdminUrl('admin-brands'));
    });

    it('Verify that admin successfully landed on brand page on new admin', async function () {
        await browser.logger.info("***********Verifying title of brand page***********");
        await contentRequestPage.verifyDataOnListing(data.reactGlobal.titleLeft, data.brands.brandsTitle, 'Brands')
            .then(function(title){
                console.log("Title of Brand page is: " + title)
            })
    });

    it('Verify switching tenant', async function () {
        await browser.logger.info("***********Verifying switching tenant***********");
        await tenantPo.searchTenant(fakeData.randomFirstName + " Tenant");
        // await tenantPo.searchTenant("Walter Tenant");

    });

    it('Verify tenant remains even after page refresh', async function () {
        await browser.logger.info("***********Refreshing webpage and verifying tenant.....***********");
        browser.refresh();
        await tenantPo.returnSelectedTenant(fakeData.randomFirstName + " Tenant")
        // await tenantPo.returnSelectedTenant("Walter Tenant")

    });

    it('Verify creating brand under this tenant', async function () {
        await browser.logger.info("***********Verifying brand creation under this tenant.....***********");
        await brandsPo.createBrand(fakeData.randomFirstName + " Brand")
            .then(function(message){
                console.log(message);
            })
    });

    it('Verify adding details to brand', async function () {
        await browser.logger.info("***********Verifying adding details to brand.....***********");
        await brandsPo.addBrandDetails(fakeData.randomFirstName);
    });

    it("Verify tenant of added brand in DB", async function () {
        await browser.logger.info("***********Verifying tenant of brand from DB.....***********");
        await brandsPo.verifyDbTenant(queries.queryParams.returnBrandTenant(
            fakeData.randomFirstName + " Brand"), "Brand").then(function(dbTenant){
            expect(dbTenant).toEqual(fakeData.randomFirstName + " Tenant");
            // expect(dbTenant).toEqual("Walter Tenant");
        })
    })

    it("Verify tenant of added user in DB", async function () {
        await browser.logger.info("***********Verifying tenant of user from DB.....***********");
        await brandsPo.verifyDbTenant(queries.queryParams.
        returnUserTenant(fakeData.randomFirstName + "@mailinator.com"), "User").then(function(dbTenant){
        // await brandsPo.verifyDbTenant(queries.queryParams.
        // returnUserTenant("Walter@mailinator.com"), "User").then(function(dbTenant){
            expect(dbTenant).toEqual(fakeData.randomFirstName + " Tenant");
            // expect(dbTenant).toEqual("Walter Tenant");
        })
    })
});
