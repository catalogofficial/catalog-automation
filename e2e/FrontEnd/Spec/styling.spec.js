let stylingPage = require('../PageObject/styling_po');
let dictionary = require ('../../../Utils/DataFile.js');
let fakeData = require('../../../Utils/FakeData.js');

describe('Verify styling screen!', function () {
    beforeAll(function (done) {
        dictionary.dataDictionary.waitForElement(dictionary.stylingScreen.creativeSuggestions);
        expect(browser.getCurrentUrl()).toContain('/styling');
        done();
    });
    //
    // afterAll(function () {
    //
    //     expect(browser.getCurrentUrl()).toContain('payment');
    // });

    it('Verify continue button is always enabled on styling screen', () => {
        expect(dictionary.stylingScreen.continueOnStyling.isEnabled()).toBe(dictionary.stylingScreen.continueOnStyling.isEnabled());
        browser.logger.info("Continue button is always enabled since all fields are optional!")
    });
    //
    //
    // it('Verify by filling in all fields', () => {
    //     stylingPage.fillStylingScreen();
    //     dictionary.dataDictionary.waitForElement(dictionary.brandDetails.errorOnBrandDetail);
    //     browser.logger.info("Submitted all styling details!");
    // });

    it('Verify while clicking on Continue button on styling', () => {
        dictionary.stylingScreen.continueOnStyling.click();
    });


});
