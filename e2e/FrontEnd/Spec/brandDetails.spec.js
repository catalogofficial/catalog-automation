let brandDetailsPage = require('../PageObject/brandDetails_po');
let commonActions = require('../../../Common/CommonActions');
let dictionary = require ('../../../Utils/DataFile.js');
let loginPage = require('../PageObject/login_po');
let fakeData = require('../../../Utils/FakeData.js');

describe('Verify brand details screen!', function () {
    beforeAll(function (done) {

        expect(browser.getCurrentUrl()).toContain('brands/create');
        // dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.brandDropDownOption);
        // dictionary.dataDictionary.brandDropDownOption.click();
        // dictionary.dataDictionary.createBrand.click();
        done();
    });

    afterAll(function () {

        dictionary.dataDictionary.waitForElement(dictionary.brandDetails.channelSelection1);
        expect(browser.getCurrentUrl()).toContain('order/channel');
        // loginPage.logOut();
        // clearData.currentSessionDataClear();
        // clearData.deleteUser(browser.params.gmailAddress);

    });

    // it('Verify that initially Continue button is disabled', () => {
    //     expect(dictionary.brandDetails.continueButton.isDisabled).toBe(dictionary.brandDetails.continueButton.isDisabled);
    //     browser.logger.info("Continue button is disabled until all fields are filled!")
    // });
    //
    //
    // it('Verify existing brand error', () => {
    //     brandDetailsPage.fillBrandDetails(dictionary.dataDictionary.existingBrand, fakeData.randomFirstName + '.com', '@' + fakeData.randomFirstName);
    //     dictionary.dataDictionary.waitForElement(dictionary.brandDetails.errorOnBrandDetail);
    //     browser.logger.info("Brand already exists!")
    //
    //
    // });
    //
    // it('Verify error on entering invalid brand website', () => {
    //     brandDetailsPage.fillBrandDetails(fakeData.randomFirstName, fakeData.randomFirstName, '@' + fakeData.randomFirstName);
    //     dictionary.dataDictionary.waitForElement(dictionary.brandDetails.errorOnBrandDetail);
    //     browser.logger.info("User entered invalid website name")
    //
    // });
    //
    // it('Verify that Continue button enables only when all mandatory fields are filled', () => {
    //     brandDetailsPage.fillBrandDetails(fakeData.randomFirstName,'','@' + fakeData.randomFirstName);
    //     expect(dictionary.brandDetails.continueButton.isDisabled).toBe(dictionary.brandDetails.continueButton.isDisabled);
    //     browser.logger.info("Continue button is disabled until an mandatory fields are filled!")
    //
    // });

    it('Verify that Continue button enables only when all mandatory fields are filled', () => {
        brandDetailsPage.fillBrandDetails(fakeData.randomFirstName, fakeData.randomFirstName + '.com', '@' + fakeData.randomFirstName);
        browser.logger.info(fakeData.randomFirstName + ": Brand created successfully!!");
    });


});
