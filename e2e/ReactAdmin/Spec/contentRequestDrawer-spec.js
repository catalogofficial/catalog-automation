let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let contentRequestPage = require('../PageObject/contentRequest-po.js');


describe('Verify Content request edit drawer on React admin', function () {

    beforeAll(function () {
        expect(browser.getCurrentUrl()).toContain('content-requests');

    });


    it('Verify Opening of edit widget on the click of any row', function () {
        browser.logger.info("***********Verify opening of CR edit drawer***********");
        common.openDrawer(data.reactContentRequest.brandName, data.reactContentRequest.commentButton);
    });

    it('Verify by changing details in the drawer', function () {
        browser.logger.info("***********Verifying changing details inside the CR drawer***********")
        contentRequestPage.updateDataFromDrawer();
        contentRequestPage.setDate();
    });

    it('Verify status selected in edit drawer', function () {
        browser.logger.info("***********Verifying status of CR inside drawer***********");
        common.openDrawer(data.reactContentRequest.brandName, data.reactContentRequest.commentButton);
        let expectedStatus = data.reactContentRequest.status_1;
        contentRequestPage.verifyDataOnListing(data.reactContentRequest.statusDropDown, expectedStatus, 'Status')
            .then(function(status){
                console.log("Status of CR page inside drawer is: " + status)
            })
    });

    it('Verify brand selected in edit drawer', function () {
        browser.logger.info("***********Verifying brand of CR in edit drawer***********");
        // let expectedBrandName = data.reactGlobal.fakeData;
        let expectedBrandName = fakeData.randomFirstName;
        contentRequestPage.verifyDataOnListing(data.reactContentRequest.selectedBrand, expectedBrandName, 'Brand name')
            .then(function(brand){
                console.log("Brand of CR page inside drawer is: " + brand)
            })

    });

    it('Verify channel selected in edit drawer', function () {
        browser.logger.info("***********Verifying selected drawer inside edit drawer***********");
        let expectedChannel = data.reactContentRequest.channel;
        contentRequestPage.verifyDataOnListing(data.reactContentRequest.selectedChannel, expectedChannel, 'Channel name')
            .then(function(channel){
                console.log("Brand of CR page inside drawer is: " + channel)
            })

    });

});
