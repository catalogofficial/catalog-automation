let dictionary = require ('../../../Utils/DataFile.js');


describe('Verify selecting channels for a brand', function () {
    beforeAll(function (done) {
        expect(browser.getCurrentUrl()).toContain('order/channel');
        done();
    });

    afterAll(function () {
    dictionary.dataDictionary.waitForElement(dictionary.brandDetails.shotCards);
        expect(browser.getCurrentUrl()).toContain('/shot');

    });


    it('Verify that initially Continue button is disabled', () => {
        expect(dictionary.brandDetails.continueButton.isDisabled).toBe(dictionary.brandDetails.continueButton.isDisabled);
        browser.logger.info("Continue button is disabled until any channel is selected")
    });


    it('Verify by selecting multiple channels', () => {
        for(i=1; i<7; i++){
            $('div:nth-child(' + i + ') > label > div').click();
        }
        browser.logger.info("Selected multiple channels");
        dictionary.brandDetails.continueButton.click();

    });


});
