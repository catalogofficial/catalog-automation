let path = require('path');
let dirnameFile = '/var/lib/jenkins/workspace/automation-suite/Images/';
let remote = require('../../../node_modules/selenium-webdriver/remote');
browser.setFileDetector(new remote.FileDetector());
let dictionary = require ('../../../Utils/DataFile.js');
let EC = protractor.ExpectedConditions;


function stylingPage() {

    this.uploadFiles = function(fileToUpload) {

        // element.all(by.css('input[type="file"]')).then(function(inputElements) {
        //     return inputElements.forEach(function(inputElement) {
        //         return inputElement.getAttribute('label').then(function(fileType){
        //             return inputElement.sendKeys(path.resolve(dirnameFile, dictionary.stylingScreen.files[fileType]));
        //         });
        //     });
        // });
        let file = path.resolve(dirnameFile, fileToUpload);
        dictionary.dataDictionary.fileElement.sendKeys(file);
        return browser.wait(EC.not(EC.presenceOf(dictionary.stylingScreen.loaderOnStyling)));
    };

    this.fillStylingScreen = function() {

        // this.uploadFiles('samplepdf.pdf');
        // this.uploadFiles(dictionary.stylingScreen.files.pdfFile);
        dictionary.stylingScreen.creativeSuggestions.sendKeys(dictionary.stylingScreen.creativeSuggestionsText);
        // this.uploadFiles('jpgFile1');
        // this.uploadFiles('jpgFile2');
        // dictionary.stylingScreen.colorSelection.click();
        dictionary.stylingScreen.favoriteInstagramHandle.sendKeys(dictionary.stylingScreen.favoriteInstagramHandleText);
        dictionary.stylingScreen.onlineBlogs.sendKeys(dictionary.stylingScreen.onlineBlogsText);
        dictionary.stylingScreen.pinterestBoards.sendKeys(dictionary.stylingScreen.pinterestBoardsText);
        dictionary.stylingScreen.brandedWebsites.sendKeys(dictionary.stylingScreen.brandWebsitesText);
        dictionary.dataDictionary.waitForElement(dictionary.stylingScreen.headingOnPayment);

    };
}

module.exports = new stylingPage();

