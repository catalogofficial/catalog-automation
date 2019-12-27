let homePage = require('../PageObject/home_po');
let dictionary = require ('../../../Utils/DataFile.js');
let common = require('../../../Utils/common')


describe('Verify catalog home page', function () {

    beforeAll(function (done) {
        browser.logger.info('Loading catalog home page');
        common.getAdminUrl('brand-home')
        done();
    });

    afterAll(function () {
        dictionary.signUpPage.getPhotosButton.click();
    });

    it('Verify login button on home page', function () {
        expect(dictionary.loginPage.loginOnHome.isDisplayed()).toBe(true);
        browser.logger.info("Home page has login button")
    });

    it('Verify photographer button on home page', function () {
        expect(dictionary.loginPage.photographersButtonOnHome.isDisplayed()).toBe(true);
        browser.logger.info("Home page has photographers button")
    });

    it('Verify Sign up button on home page', function () {
        expect(dictionary.signUpPage.signUpButtonOnHome.isDisplayed()).toBe(true);
        browser.logger.info("Home page has sign up button")
    });

    it('Verify the top header on scroll on home page', function () {
        homePage.headerOnHomePage();
    });


});
