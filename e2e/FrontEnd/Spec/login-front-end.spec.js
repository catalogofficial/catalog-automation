let loginPage = require('../PageObject/login_po');
let dictionary = require ('../../../Utils/DataFile.js');
let fakeData = require('../../../Utils/FakeData.js');


describe('Verify Login functionality', function () {

    beforeAll(function () {
        dictionary.dataDictionary.waitForElement(dictionary.loginPage.loginOnHome);
        dictionary.loginPage.loginOnHome.click();
        dictionary.dataDictionary.waitForElement(dictionary.loginPage.loginOrSignUpButton);
        browser.logger.info('Loading Login Page');
    });

    // it('Verify that login button is disabled until all fields are filled', function () {
    //     expect(dictionary.loginPage.loginOrSignUpButton.isDisabled).toBe(dictionary.loginPage.loginOrSignUpButton.isDisabled);
    //     browser.logger.info("Login button is disabled until all fields are filled!")
    // });
    //
    // it('Wrong credentials check', function () {
    //     loginPage.doLogin(fakeData.randomFirstName + "@mailinator.com", "123");
    // });

    it('Verify successful login', function () {
        console.log("***********Verifying log in on the new admin.....***********");
        loginPage.doLogin(fakeData.randomFirstName + "@mailinator.com", dictionary.signUpPage.userPassword);
        browser.wait(protractor.ExpectedConditions.urlContains('brands'), 7000);
        browser.logger.info('User successfully logged in!');
    });


});
