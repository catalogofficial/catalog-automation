let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let contentRequestPage = require('../PageObject/contentRequest-po.js');
let globalListing = require('../PageObject/globalListing-po');
let navigationPage = require('../PageObject/navigation-po');
let globalNavigation = data.globalListingPage.navigation;
let globalData = data.globalListingPage;


describe('Verify creating Talent, locations, products and props from React admin', function () {

    it('Verify creating a new config', async function () {
        await browser.logger.info("***********Verify creating a new talent***********");
        await navigationPage.goToPage(globalNavigation.location, globalData.createNew, "Location");
        await globalListing.createGlobal('location');
    });

});
