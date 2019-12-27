let data = require ('../../../../Utils/dataFile_React.js');
let common = require ('../../../../Utils/common.js');
let fakeData = require('../../../../Utils/FakeData.js');
let queries = require('../../../../Utils/queriesToRun');
let pg = require('../../../../Utils/postgresDB.js');


function createCR() {
    return new Promise(function(resolve, reject) {
        data.brands.createBrandCTA.click();
        common.waitForElement(data.reactContentRequest.crId);
        browser.isElementPresent(data.reactContentRequest.crId)
            .then( function (result) {
                if (result) {
                    resolve("CR added successfully under selected tenant!")
                }
                else{
                    reject('Some error occurred while creating CR!')
                }
            });
    });
}

function addShots() {
    return new Promise(function(resolve) {
        common.waitForElement(data.reactContentRequest.brandInCRListing);
        data.reactContentRequest.brandInCRListing.click();
        common.waitForElement(data.reactContentRequest.commentButton);
        browser.actions().mouseMove(data.reactContentRequest.commentButton).perform();
        browser.sleep(3000);
        data.reactContentRequest.addShotCategory.click();
        common.waitForElement(data.reactContentRequest.shotCategoryDropDown);
        data.reactContentRequest.shotCategoryDropDown.click();
        common.waitForElement(data.reactContentRequest.returnSelectedCategory(1))
        data.reactContentRequest.returnSelectedCategory(1).click();
        data.reactContentRequest.shotCount.clear();
        data.reactContentRequest.shotCount.sendKeys(10);
        data.reactContentRequest.crStatusDropDown.click();
        common.waitForElement(data.reactContentRequest.returnCRStatus(3));
        data.reactContentRequest.returnCRStatus(3).click();
        browser.sleep(3000);
        resolve();
    });
}


module.exports.createCR = createCR;
module.exports.addShots = addShots;
