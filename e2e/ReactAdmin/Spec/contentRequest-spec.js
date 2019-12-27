let contentRequestPage = require('../PageObject/contentRequest-po.js');
let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
data.categories = data.categories.category_1 + ', ' + data.categories.category_2 + ', ' + data.categories.category_3 + ', ' + data.categories.category_4 + ', ' + data.categories.category_5 + ', ' + data.categories.category_6 + ', ' + data.categories.category_7 + ', ' + data.categories.category_8 + ', ' + data.categories.category_9;

describe('Verify Content request page on React admin', function () {

    beforeAll(function () {
        common.waitForElement(data.reactContentRequest.crNavigation);
        data.reactContentRequest.crNavigation.click();
        common.waitForElement(data.reactContentRequest.viewShotList);
        if(data.reactContentRequest.viewShotList){
            browser.logger.info('Admin is on content request listing page');
        }else{
            browser.logger.info("Admin couldn't reach the CR listing page");
        }
    });

    it('Verify the page title', async function () {
        await browser.logger.info("***********Verifying title of content request page***********");
        await contentRequestPage.verifyDataOnListing(data.reactGlobal.titleLeft, data.reactContentRequest.crTitle, 'Title')
            .then(function(title){
                console.log("Title of CR page is: " + title)
            })

    });

    it('Verify orders of CRs in the listing', async function () {
        await browser.logger.info("***********Verifying the order of CRs in the listing***********");
        await contentRequestPage.arrayOfIds()
            .then(contentRequestPage.verifySortingOrder).then(function(message){
                console.log(message)
            })
    });

    it('Search for CR based on brand', async function () {
        await browser.logger.info("***********Verifying searching through the list of CRs***********");
        await common.search(data.reactContentRequest.searchFieldCR, fakeData.randomFirstName, data.reactContentRequest.viewShotList)
            .then(function(brand){
                console.log("Search successfully performed for brand: " + brand)
            })
    });

    it('Verify brand name and creator email on CR listing page', async function () {
        await browser.logger.info("***********Verifying brand and creator email***********");
        // let expectedBrandName = "Name: " + data.reactGlobal.fakeData;
        let expectedBrandName = "Name: " + fakeData.randomFirstName;

        await contentRequestPage.verifyDataOnListing(data.reactContentRequest.brandName, expectedBrandName, 'Brand name')
            .then(function(brand){
                console.log("Content request belongs to brand : " + brand)
            })

        // let expectedCreatorName = "Creator: " + data.reactGlobal.fakeData + " (" + data.reactGlobal.fakeData + "@mailinator.com)";
        let expectedCreatorName = "Creator: " + fakeData.randomFirstName + " (" + fakeData.randomFirstName + "@mailinator.com)";

        await contentRequestPage.verifyDataOnListing(data.reactContentRequest.crCreator, expectedCreatorName, 'Creator name')
            .then(function(creator){
                console.log("Creator of CR is: " + creator)
            })

    });

    // it('Verify category of CR', async function () {
    //     await browser.logger.info("***********Verifying the categories of CRs***********");
    //     let expectedCategories = data.categories;
    //     await contentRequestPage.verifyDataOnListing(data.reactContentRequest.categories, expectedCategories, 'Categories')
    //         .then(function(category){
    //             console.log("CR belongs to category: " + category)
    //         })
    // });

    it('Verify status of CR', async function () {
        await browser.logger.info("***********Verifying status of CR***********");
        let expectedStatus = data.reactContentRequest.status_1;
        await contentRequestPage.verifyDataOnListing(data.reactContentRequest.status, expectedStatus, 'Status')
            .then(function(status){
                console.log("Status of CR is: " + status)
            })
    });

    it('Verify Submission date of CR', async function () {
        await browser.logger.info("***********Verifying submission date of CRs***********");
        await common.returnCurrentDate().then(async function (expectedSubmission) {
            console.log("Current date is: " + expectedSubmission);
            await contentRequestPage.verifyDataOnListing(data.reactContentRequest.submissionDate, expectedSubmission, 'Submission date')
                .then(function(date){
                    console.log("CR was submitted on: " + date)
                })
        });
    });


});
