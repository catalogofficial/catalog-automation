let path = require('path');
let dirnameFile = '/var/lib/jenkins/workspace/automation-suite/Images/';
let remote = require('../../../node_modules/selenium-webdriver/remote');
browser.setFileDetector(new remote.FileDetector());
let dictionary = require ('../../../Utils/DataFile.js');
function uploadContent() {

    this.multipleFileUpload = function (fileToUpload1, fileToUpload2, fileToUpload3, fileToUpload4, fileToUpload5, fileToUpload6) {

        let imagePath1 = path.resolve(dirnameFile, fileToUpload1);
        let imagePath2 = path.resolve(dirnameFile, fileToUpload2);
        let imagePath3 = path.resolve(dirnameFile, fileToUpload3);
        let imagePath4 = path.resolve(dirnameFile, fileToUpload4);
        let imagePath5 = path.resolve(dirnameFile, fileToUpload5);
        let imagePath6 = path.resolve(dirnameFile, fileToUpload6);
        browser.logger.info("Path of image 1 is : " + imagePath1);
        dictionary.dataDictionary.fileElement.sendKeys(imagePath1+ "\n" + imagePath2+ "\n" + imagePath3+ "\n" + imagePath4 +  "\n" + imagePath5+ "\n" + imagePath6);
    };

    this.afterUploadClick = function() {

        //Verify after upload screen (disabled states) and success screen
        browser.logger.info("Upload button is enabled!");
        dictionary.dataDictionary.uploadButton.click();
        dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.progressBar);
        expect(dictionary.dataDictionary.progressBar.isDisplayed()).toBeTruthy();
        expect(dictionary.dataDictionary.crossIcon.isDisplayed()).toEqual(false);
        expect(dictionary.dataDictionary.uploadButton.isEnabled()).toBe(false);
        browser.sleep(3000);
        dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.successMessageAfterUpload);
        browser.logger.info("Content successfully uploaded!!");

    };
}

module.exports = new uploadContent();
