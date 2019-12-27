let fakeData = require('../../../Utils/FakeData.js');
let dictionary = require ('../../../Utils/DataFile.js');


function signUpPage() {

    this.termsAndConditionsValidation = function (randomName) {
        dictionary.signUpPage.nameTextBox.sendKeys(randomName);
        dictionary.loginPage.emailTextBox.sendKeys(randomName + '@mailinator.com');
        dictionary.loginPage.passwordTextBox.sendKeys('123');
    };

    this.invalidPasswordCheck = function (randomName) {
        dictionary.signUpPage.nameTextBox.sendKeys(randomName);
        dictionary.loginPage.emailTextBox.sendKeys(randomName + '@mailinator.com');
        dictionary.loginPage.passwordTextBox.sendKeys('123');
        dictionary.signUpPage.termsAndConditionsCheckBox.click();
        dictionary.loginPage.loginOrSignUpButton.click();
        dictionary.dataDictionary.waitForElement(dictionary.signUpPage.invalidPasswordError);
    };

    this.existingUserCheck = function (randomName) {
        dictionary.signUpPage.nameTextBox.sendKeys(randomName);
        dictionary.loginPage.emailTextBox.sendKeys(dictionary.signUpPage.existingUser);
        dictionary.loginPage.passwordTextBox.sendKeys('123');
        dictionary.signUpPage.termsAndConditionsCheckBox.click();
        dictionary.loginPage.loginOrSignUpButton.click();
        dictionary.dataDictionary.waitForElement(dictionary.signUpPage.existingUserError);
    };

    this.customSignUp = function (randomName) {
        dictionary.signUpPage.nameTextBox.sendKeys(randomName);
        dictionary.loginPage.emailTextBox.sendKeys(randomName + '@mailinator.com');
        dictionary.loginPage.passwordTextBox.sendKeys(dictionary.signUpPage.userPassword);
        dictionary.signUpPage.termsAndConditionsCheckBox.click();
        dictionary.loginPage.loginOrSignUpButton.click();
        browser.sleep(2000);
        dictionary.dataDictionary.waitForElement(dictionary.signUpPage.nameTextBox);

    }
};


module.exports = new signUpPage();
