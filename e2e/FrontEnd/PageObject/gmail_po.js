let commonActions = require('../../../Common/CommonActions.js');
let dictionary = require ('../../../Utils/DataFile.js');


function gmailPage() {


    this.presenceOfGmailButton = function () {

        expect(dictionary.gmail.continueWithGmailButton.isEnabled()).toBe(true);
    }

    this.registerWithGmail = function (email, password) {
        // dictionary.gmail.continueWithGmailButton.click();
        dictionary.gmail.gmailTextBox.sendKeys(email);
        dictionary.gmail.gmailNextButton.click();
        dictionary.dataDictionary.waitForElement(dictionary.gmail.gmailPasswordTextBox);
        dictionary.gmail.gmailPasswordTextBox.sendKeys(password);
        dictionary.gmail.passwordNextButton.click();
    }



}

module.exports = new gmailPage();
