let commonActions = require('../../../Common/CommonActions.js');
let dictionary = require ('../../../Utils/DataFile.js');



function loginPage() {


    this.doLogin = function (email, password) {
        return new Promise(function (resolve, reject) {

            dictionary.loginPage.emailTextBox.clear();
            dictionary.loginPage.emailTextBox.sendKeys(email);
            dictionary.loginPage.passwordTextBox.clear();
            dictionary.loginPage.passwordTextBox.sendKeys(password);
            dictionary.loginPage.loginOrSignUpButton.click();
            // dictionary.loginPage.loginOrSignUpButton.click().then(function () {
            //     dictionary.dataDictionary.waitForElement(dictionary.loginPage.errorOnLogin);
            //     browser.logger.info('User entered wrong login credentials!');
            // });
            if (dictionary.loginPage.errorOnLogin) {
                browser.logger.info('User entered wrong login credentials!')
            }
            else {
                browser.wait(protractor.ExpectedConditions.urlContains('brands'), 7000);
                browser.logger.info('User successfully logged in!');
            }
        });
    };


    this.doLoginFE = function (email, password) {
        return new Promise(function (resolve, reject) {

            dictionary.loginPage.emailTextBox.sendKeys(email);
            dictionary.loginPage.passwordTextBox.sendKeys(password);
            expect(dictionary.loginPage.loginOrSignUpButton.isEnabled).toBe(dictionary.loginPage.loginOrSignUpButton.isEnabled);
            dictionary.loginPage.loginOrSignUpButton.click().then(function () {
                browser.wait(protractor.ExpectedConditions.urlContains('brands'), 7000);
                browser.logger.info('User successfully logged in!');
                resolve();
            });
        });
    };


    this.logOut = function () {

        dictionary.dataDictionary.waitForElement(dictionary.brandDetails.userProfileDropDown);
        dictionary.brandDetails.userProfileDropDown.click();
        dictionary.brandDetails.signOutOption.click().then(function () {
            dictionary.dataDictionary.waitForUrlToChange(dictionary.brandUrl.home);
            browser.logger.info('User successfully logged out!!');
            dictionary.dataDictionary.waitForElement(dictionary.loginPage.loginOnHome);
        })
    };

};

module.exports = new loginPage();
