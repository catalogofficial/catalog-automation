let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let navigationPage = require('../PageObject/navigation-po');
let dirnameFile = '/var/lib/jenkins/workspace/automation-suite/Images/';
let path = require('path');
let EC = protractor.ExpectedConditions;
let sgpt = require('sg-protractor-tools');
let shotsPage = require('../PageObject/shots-po.js');
let shortCardPage = require('../PageObject/shotCard-po');
let rawDirnameFile = dirnameFile + 'Raw';
let dir;
let imageType;
let index;
let dictionary = require ('../../../Utils/DataFile.js');
brandDictionary = dictionary.dataDictionary;


function uploadWidgetPage() {

    this.verifyWidgetOpens = function (page, refreshFlag) {

        return new Promise(function(resolve, reject){

            browser.sleep(5000);
            data.reactShotList.navigateToUploadShotImage.click();
            browser.sleep(2000);
            data.uploadWidget.uploadButton.click();
            common.waitForElement(data.uploadWidget.captureTab);
            data.uploadWidget.captureTab.isDisplayed().then(async function(result){
                if(result){
                    browser.logger.info("Upload widget opened successfully from " + page + " page");
                    if(refreshFlag!== 1){
                        data.uploadWidget.getCloseOnWidget('Capture').click();
                        resolve();
                    }
                    else{
                        resolve();
                    }
                }
                else{
                    browser.logger.info("Some problem occurred while opening the upload widget from " + page + " page");

                }
            })
        });

    };

    this.multipleFileUpload = function (fileToUpload1, fileToUpload2, fileToUpload3, fileToUpload4, fileToUpload5, fileToUpload6, fileToUpload7,
                                        fileToUpload8, fileToUpload9, fileToUpload10, fileToUpload11)
    {

        let imagePath1 = path.resolve(dirnameFile, fileToUpload1);
        let imagePath2 = path.resolve(dirnameFile, fileToUpload2);
        let imagePath3 = path.resolve(dirnameFile, fileToUpload3);
        let imagePath4 = path.resolve(dirnameFile, fileToUpload4);
        let imagePath5 = path.resolve(dirnameFile, fileToUpload5);
        let imagePath6 = path.resolve(dirnameFile, fileToUpload6);
        let imagePath7 = path.resolve(dirnameFile, fileToUpload7);
        let imagePath8 = path.resolve(dirnameFile, fileToUpload8);
        let imagePath9 = path.resolve(dirnameFile, fileToUpload9);
        let imagePath10 = path.resolve(dirnameFile, fileToUpload10);
        let imagePath11 = path.resolve(dirnameFile, fileToUpload11);

        dictionary.dataDictionary.fileElement.sendKeys(imagePath1+ "\n" + imagePath2+ "\n" + imagePath3+ "\n" + imagePath4 +  "\n" + imagePath5+ "\n" + imagePath6 + "\n" + imagePath7 + "\n" + imagePath8 + "\n" + imagePath9 + "\n" + imagePath10+ "\n" + imagePath11);
        common.waitForElement(data.uploadWidget.progressLoader);
        data.uploadWidget.progressLoader.isDisplayed().then(async function(result){
            if(result){
                browser.logger.info("Images are uploading.....");
            }
            browser.wait(EC.not(EC.presenceOf(data.uploadWidget.progressLoader))).then(function(){
                browser.logger.info("Images uploaded successfully!!")
                data.uploadWidget.getCloseOnWidget('Capture').click();

            })
        });
    };

    this.verifyFileName = async function (fileName) {
        browser.sleep(2000);
        data.uploadWidget.searchOnWidget.click();
        data.reactGlobal.searchTextField.click();
        data.reactGlobal.searchTextField.sendKeys(fileName);
        browser.sleep(4000);
        browser.logger.info("Image with name " + fileName + " exists! Search performed successfully!");
        browser.logger.info("Clearing search field....");
        data.reactGlobal.searchTextField.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
        data.reactGlobal.searchTextField.sendKeys(protractor.Key.chord(protractor.Key.DELETE));
        common.waitForElement(data.uploadWidget.getThumbnailsUnderWidget(3))
        data.uploadWidget.getThumbnailsUnderWidget(3).isDisplayed().then(async function(result){
            if(result){
                browser.logger.info("Verified that the listing refreshes after clearing search!");
            }
            else{
                browser.logger.info("Some error occurred while clearing the search results!")
            }
        });
        // data.uploadWidget.getContentWithFileName(fileName).isDisplayed().then(async function(result){
        //     if(result){
        //         browser.logger.info("Image with name " + fileName + " exists! Search performed successfully!");
        //         browser.logger.info("Clearing search field....");
        //         data.reactGlobal.searchTextField.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
        //         data.reactGlobal.searchTextField.sendKeys(protractor.Key.chord(protractor.Key.DELETE));
        //             common.waitForElement(data.uploadWidget.getThumbnailsUnderWidget(3))
        //             data.uploadWidget.getThumbnailsUnderWidget(3).isDisplayed().then(async function(result){
        //                 if(result){
        //                     browser.logger.info("Verified that the listing refreshes after clearing search!");
        //                 }
        //                 else{
        //                     browser.logger.info("Some error occurred while clearing the search results!")
        //                 }
        //             });
        //     }
        //     else{
        //         browser.logger.info("Could not find image with name " + fileName + ". Something went wrong!!");
        //
        //     }
        // })


    };

    this.selectImageToMap = async function (max) {
        browser.logger.info("Selecting images.....")
        common.waitForElement(data.uploadWidget.getThumbnailsUnderWidget(2));
        let count1 = 0;
        for(i=2; i<max; i++){
            await browser.actions().mouseMove(data.uploadWidget.getThumbnailsUnderWidget(i)).click().perform();
            await data.uploadWidget.getSelectedImageCheck(i).isDisplayed().then(async function(result){
                if(result){
                    browser.logger.info("Image at position " + i + " successfully selected!");
                    count1++;
                }
                else{
                    browser.logger.info("Unable to select image at position " + i);
                }
            })
        }

        browser.logger.info("Total " + count1 + " images selected!");

    };

    this.verifyNoContentView = async function () {
        browser.logger.info("Verifying no contents under Selects.....")

        common.waitForElement(data.uploadWidget.emptyContentView);

        await data.uploadWidget.emptyContentView.isDisplayed().then(async function(result){
            if(result){
                browser.logger.info("No images exist under Selects tab initially!!");
            }
            else{
                browser.logger.info("Images are present under Selects tab!");
            }
        })
    };

    this.mapImagesToShot = async function () {
        browser.logger.info("Mapping images.....")
        await data.uploadWidget.getSelectedImageCheck(1).isDisplayed().then(async function(result) {

            data.uploadWidget.ctaOnWidget.click();
            browser.wait(EC.not(EC.presenceOf(data.uploadWidget.loaderOnSubmitting))).then(function () {
                browser.logger.info("Images mapped successfully!!")
            })
        })

    };

    this.verifyImagesUnderTab = async function (max) {
        return new Promise(async function(resolve, reject) {

            if (!isNaN(max)) {
                browser.logger.info("Verifying presence of mapped images.....")
                await common.waitForElement(data.uploadWidget.getThumbnailsUnderWidget(1));
                let count2 = 0;
                for (i = 1; i < max; i++) {
                    await data.uploadWidget.getThumbnailsUnderWidget(i).isDisplayed().then(async function (result) {
                        if (result) {
                            browser.logger.info("Image at position " + i + " successfully mapped under Select tab");
                            count2++;
                        }
                        else {
                            browser.logger.info("Was unable to map image at position " + i);
                        }
                    })
                }
                await browser.logger.info("Total " + count2 + " images mapped!");
                resolve(count2);
            }
            else if (max === 'Edits') {
                await common.waitForElement(data.uploadWidget.editOriginalFirstThumbnail);
                data.uploadWidget.editOriginalFirstThumbnail.isDisplayed().then(async function (result) {
                    if (result) {
                        browser.logger.info("Images successfully selected for Editing!");
                        resolve();
                    }
                    else {
                        browser.logger.info("Images could not be selected for editing!");
                    }
                });
            }
        });
    };


    this.minimizeWidget = function (tab) {
        return new Promise(function(resolve, reject) {

            data.uploadWidget.CRShotIDWidget.getText().then(function (ID1) {
                browser.logger.info("Minimizing.....");
                data.uploadWidget.getMinimizeOnWidget(tab).click().then(function () {
                    common.waitForElement(data.uploadWidget.minimizedWidget);
                    data.uploadWidget.minimizedWidget.isDisplayed().then(async function (result) {
                        if (result) {
                            browser.logger.info("Upload widget minimized!");
                        }
                        else {
                            browser.logger.info("Unable to minimize upload widget");
                        }
                        browser.logger.info("Verifying the title on minimized widget.....")
                        data.uploadWidget.titleOfMinimized.getText().then(function (minimizedTitle) {
                            if (minimizedTitle === tab) {
                                browser.logger.info("Titles match. Widget successfully minimized from " + minimizedTitle + " tab");
                                resolve(ID1);
                            }
                            else {
                                browser.logger.info("Titles dont match. Widget opened from some other tab!");
                            }
                        })

                    })
                });
            });
        })
    }

    this.maximizeOrCloseWidget = function (action, ID1) {
        if(action === 'Maximize') {
            browser.logger.info("Maximizing the widget.....")

            data.uploadWidget.getMinimizedWidgetStates(action).click().then(function () {
                browser.logger.info("Verifying the CR and shot ID.....")

                data.uploadWidget.CRShotIDWidget.getText().then(function (ID2) {
                    browser.logger.info("ID1 " + ID1 + " ID2 " + ID2)
                    if (ID1 === ID2) {
                        browser.logger.info("IDs match. Widget successfully maximized!!")
                    }
                    else {
                        browser.logger.info("Incorrect widget opened on maximizing!");
                    }
                })
            })
        }

        else if(action === 'Close') {
            browser.logger.info("Closing the minimized widget.....");

            data.uploadWidget.getMinimizedWidgetStates(action).click();
            browser.wait(EC.not(EC.presenceOf(data.uploadWidget.minimizedWidget))).then(function(){
                browser.logger.info("Closed the minimized widget!!");
            })
        }
    }

    this.uniqueIDForContent = function (image, number) {

        return new Promise(function(resolve, reject){

            shortCardPage.verifyShotNumber(data.uploadWidget.editOriginalThumbnail, data.uploadWidget.CRShotIDWidget)
                .then(function(shotCRNumber){
                    let crNumber = shotCRNumber.substring(3, 6);
                    let shotNumber = shotCRNumber.substring(12,15);
                    if(image === 'Original'){
                        imageType = 'O';
                    }
                    else{
                        imageType = image;
                    }
                    let uniqueID = crNumber + "-" + shotNumber + "-" +  number+ "-" + imageType;
                    resolve(uniqueID);

            })
        });

    };

    this.uploadEditedContent = function (file1, uploadElement, type) {
        if(type === 'RAW'){
            dir = rawDirnameFile;
        }
        else if(type === 'PNG/ JPG'){
            dir = dirnameFile;
        }

        browser.logger.info("Uploading edited " + type + " image.....");
        let imagePath1 = path.resolve(dir, file1);
        data.uploadWidget.returnFileUploadElement(uploadElement).sendKeys(imagePath1);
        // common.waitForElement(data.uploadWidget.progressLoader);
        data.uploadWidget.progressLoader.isDisplayed().then(async function(result){
            if(result){
                browser.logger.info(file1 + " image is uploading.....");
            }
            browser.wait(EC.not(EC.presenceOf(data.uploadWidget.progressLoader))).then(function(){
                browser.logger.info(file1 + " image uploaded successfully!!")
            })
        });


    };

};

module.exports = new uploadWidgetPage();
