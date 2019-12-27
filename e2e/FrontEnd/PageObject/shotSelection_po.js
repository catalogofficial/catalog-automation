let dictionary = require ('../../../Utils/DataFile.js');
let fakeData = require('../../../Utils/FakeData.js');

function shotSelectionPage() {

    this.getShotSelectionAdd = function(i){

        return element(by.css('div:nth-child(' + i + ') > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-plus > span'));
    }
    this.addProducts = function (name) {

        dictionary.shotScreen.productTextBox.sendKeys(name);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        dictionary.dataDictionary.waitForElement(dictionary.shotScreen.crossOnProductTag);
        dictionary.shotScreen.productTextBox.sendKeys(fakeData.randomFirstName + " Spray");
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

    };

    this.addShots = function () {
        browser.sleep(7000);
        this.addProducts(fakeData.randomFirstName);
        for(let i = 1; i < 14; i++) {
            browser.actions().mouseMove(this.getShotSelectionAdd(i)).click();
            // this.getShotSelectionAdd(i).click();
            elem = element(by.css('div:nth-child(' + i + ') > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-plus > span'));
            browser.actions().mouseMove(elem).click().perform();
        }
        // dictionary.shotScreen.shotMinus.click();
        // dictionary.shotScreen.shotPlus2.click();

        dictionary.shotScreen.continueOnShots.click();
        browser.sleep(4000);
    };


};


module.exports = new shotSelectionPage();
