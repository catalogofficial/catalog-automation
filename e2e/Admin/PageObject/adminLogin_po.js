let dictionary = require ('../../../Utils/DataFile.js');
let EC = protractor.ExpectedConditions;

function adminLoginPage() {

    this.adminLogin = function (email, password) {
        dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.emailTextBox);
        dictionary.dataDictionary.emailTextBox.sendKeys(email);
        dictionary.dataDictionary.passwordTextBox.sendKeys(password);
        dictionary.dataDictionary.loginButton.click();
        browser.logger.info('Admin is successfully logged in through ' + email);
    };
}

module.exports = new adminLoginPage();
