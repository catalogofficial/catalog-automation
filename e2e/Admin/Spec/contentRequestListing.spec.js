let contentRequestListingPage = require('../PageObject/contentRequestListing_po');
let dictionary = require ('../../../Utils/DataFile.js');
let contentRequestDetailPage = require('../PageObject/contentRequestDetail_po');
let contentListingPage = require('../PageObject/contentListing_po');
let fakeData = require('../../../Utils/FakeData.js');
let adminLoginPage = require('../PageObject/adminLogin_po.js');
let common = require ('../../../Utils/common.js');


describe('Verify opening content requests for which payment has/ has not been made', function () {

    beforeAll(function (done) {
        let url = dictionary.dataDictionary.contentRequestsUrl;
        browser.executeScript("return window.open(arguments[0], '_blank')", url);
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
                if (result) {
                    adminLoginPage.adminLogin(dictionary.dataDictionary.adminEmail, dictionary.dataDictionary.adminPassword);
                };
            });
            // browser.driver.close();
            // browser.switchTo().window(handles[0]);
        });


        // if(expect(browser.getCurrentUrl()).toContain("brand_id=")){
        //     browser.logger.info("Admin is on brand specific content request listing")
        //
        // }
        // dictionary.dataDictionary.getAdminUrl('content requests' + "?brand_id=" + fakeData.randomFirstName);

        done();
    });

    // beforeEach(function () {
    //
    //     dictionary.dataDictionary.getAdminUrl('content requests');
    //     dictionary.dataDictionary.selectRequestedValueInDropDown(dictionary.dataDictionary.brandDropDown, fakeData.randomFirstName);
    //     expect(browser.getCurrentUrl()).toContain(fakeData.randomFirstName);
    //
    // });

    afterAll(function () {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.driver.close();
            browser.switchTo().window(handles[0]);
        });
        // let url = browser.get(common.getAdminUrl('admin-home'));
        // browser.executeScript("return window.open(arguments[0], '_blank')", url);
        // browser.getAllWindowHandles().then(function (handles) {
        //     browser.switchTo().window(handles[1]);
        //     common.waitForElement(data.reactLogin.logInButton);
        //     browser.logger.info('New (React) Login Page successfully loaded!');
        //
        // });

    });


    // it('Go to content request payment for which has not been received and verify its details', function () {
    //     expect(browser.getCurrentUrl()).toContain('=Automation');
    //     dictionary.dataDictionary.selectDropdownbyNum(dictionary.dataDictionary.paymentDropDown, 2);
    //     expect(browser.getCurrentUrl()).toContain('order_type=' + dictionary.dataDictionary.orderTypeForPaymentNotReceived);
    //     contentRequestListingPage.checkStatusOfRequestInListing(dictionary.dataDictionary.unPaidContentRequest);
    //     dictionary.dataDictionary.editButton.click();
    //     expect(browser.getCurrentUrl()).toContain('contentrequest/' + dictionary.dataDictionary.unPaidContentRequest + '/change/');
    //     contentRequestDetailPage.uploadContent();
    //     expect(browser.getCurrentUrl()).toContain('contentrequest/' + dictionary.dataDictionary.unPaidContentRequest + '/change/');
    //     contentRequestDetailPage.viewContent(dictionary.dataDictionary.unPaidContentRequest);
    //     browser.logger.info("--------------Possible transitions from unpublished state when payment has not been received--------------");
    //     expect(browser.getCurrentUrl()).toContain('content/content/?content_request__id__exact=');
    //     contentListingPage.checkAllPossibleTransitions();
    // });

    it('Mark payment received as true for content requested created from front end', function () {
        dictionary.dataDictionary.searchTextBox.sendKeys(fakeData.randomFirstName);
        dictionary.dataDictionary.searchButton.click();
        dictionary.dataDictionary.editButton.click();
        dictionary.dataDictionary.paymentReceivedFlag.click();
        dictionary.dataDictionary.saveAndContinueButton.click();
        dictionary.dataDictionary.adminLogOut.click();
        browser.sleep(2000);
    });

    // it('Go to content request payment for which has been received and verify its details', function () {
    //     dictionary.dataDictionary.selectDropdownbyNum(dictionary.dataDictionary.paymentDropDown, 1);
    //     expect(browser.getCurrentUrl()).toContain('order_type=' + dictionary.dataDictionary.orderTypeForPaymentReceived);
    //     // contentRequestListingPage.checkStatusOfRequestInListing(dictionary.dataDictionary.paidContentRequest);
    //     contentRequestListingPage.checkStatusOfRequestInListing();
    //     dictionary.dataDictionary.editButton.click();
    //     expect(browser.getCurrentUrl()).toContain('contentrequest/');
    //     // contentRequestDetailPage.uploadContent();
    //     // expect(browser.getCurrentUrl()).toContain('contentrequest/');
    //     // //Get ID of pre-paid order
    //     // contentRequestDetailPage.verifyOrderCreated();
    //     // expect(browser.getCurrentUrl()).toContain('contentrequest/');
    //     // contentRequestDetailPage.viewContent();
    //     // browser.logger.info("--------------Possible transitions from unpublished state when payment has been received--------------");
    //     // expect(browser.getCurrentUrl()).toContain('content/content/?content_request__id__exact=');
    //     // contentListingPage.checkAllPossibleTransitions();
    //
    // });

});

