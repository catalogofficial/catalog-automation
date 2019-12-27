let contentRequestPage = require('../PageObject/contentRequest-po.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let navigationPage = require('../PageObject/navigation-po');
let uploadWidgetPage = require('../PageObject/uploadWidget-po');
let frontEndLogin = require('../../FrontEnd/PageObject/login_po.js');
let dictionary = require ('../../../Utils/DataFile.js');
let contentLibraryPage = require ('../../FrontEnd/PageObject/contentLibrary_po');
let shortCardPage = require('../../ReactAdmin/PageObject/shotCard-po');
let productionCalendarPage = require('../PageObject/productionCalendar-po.js');
let shotsPage = require('../PageObject/shots-po.js');
let fakeData = require('../../../Utils/FakeData.js');
let config = require ('../../../conf/configuration');
let brandLoginURL = common.getAdminUrl('brand-home') + common.getAdminUrl('brand-login');



brandDictionary = dictionary.dataDictionary;


describe('Verify the upload photos in a shot functionality', function () {

    // beforeAll(function () {
    //     navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactContentRequest.viewShotList, "Content Request");
    //     data.reactContentRequest.viewShotList.click();
    //     common.waitForElement(data.reactShotList.shotStatus);
    //     common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
    //     uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
    //     data.uploadWidget.editsTab.click();
    //
    // });


    it('Verify upload widget opens from kanban page', function () {
        browser.logger.info("***********Opening widget from kanban page***********");
        navigationPage.goToPage(data.kanban.kanbanNavigation, data.kanban.returnDraggableElement(2,1), "Kanban");
        common.openDrawer(data.kanban.returnDraggableElement(2,1), data.uploadWidget.uploadButton);
        uploadWidgetPage.verifyWidgetOpens("Kanban");
    });

    // it('Verify upload widget opens from production calendar page', async function () {
    //     browser.logger.info("***********Opening widget from production calendar page***********");
    //     await data.productionCalendar.productionCalendarNavigation.click();
    //     await productionCalendarPage.getShotCard('Backlog').then(async function(id) {
    //
    //         navigationPage.goToPage(data.productionCalendar.productionCalendarNavigation, data.productionCalendar.returnShotCardInCalendar(id), "Production Calendar");
    //         common.openDrawer(data.productionCalendar.returnShotCardInCalendar(id), data.uploadWidget.uploadButton);
    //         uploadWidgetPage.verifyWidgetOpens("Production Calendar");
    //     });
    // });

    it('Verify upload widget opens from shot listing page', function () {
        browser.logger.info("***********Opening widget from shot listing page***********");
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactContentRequest.viewShotList, "Content Request");
        data.reactContentRequest.viewShotList.click();
        common.waitForElement(data.reactShotList.shotStatus);
        common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
        uploadWidgetPage.verifyWidgetOpens("Shot listing");
    });

    it('Verify by adding a new shot to test fresh data on widget!', function () {
        browser.logger.info("***********Creating a new shot***********");
        data.reactShotList.addNewShotDropDown.click().then(function(){
            data.reactShotList.returnNewShotCategory('Product: Stylized Hero').click();
            browser.sleep(300);
            browser.logger.info("Added new shot to CR!!");

        })
    });

    it('Verify content request and shot ID on edit drawer', function () {
        browser.logger.info("***********Verifying the CR and Shot ID on upload widget***********");
        browser.sleep(1500);
        shotsPage.verifyCRShotID("Shot listing", 1);
    });

    it('Verify uploading content under Capture tab', function () {
        browser.logger.info("***********Uploading images under Capture tab***********");
        //Comment this while running whole script together
        // uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
        uploadWidgetPage.multipleFileUpload("test1.jpg", "test2.jpg", "test3.jpg", "test4.jpg", "test5.jpg", "test6.jpg", "test8.jpg", "test9.jpg", "test10.jpg", "test11.jpg", "123456.jpg");
    });

    it('Verify searching through the list of uploaded content', async function () {
        await browser.logger.info("***********Verify searching through uploaded content***********");
        await uploadWidgetPage.verifyWidgetOpens("Shot listing", 1).then(async function(){
            await common.waitForElement(data.uploadWidget.getThumbnailsUnderWidget(1));
            browser.sleep(1000);
            await uploadWidgetPage.verifyFileName("test2");
        });
    });

    it('Verify Map content button is disabled until an image is selected', async function () {
        await browser.logger.info("***********Verify Map content button is disabled until an image is selected***********");
        // uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);

        if(expect(data.uploadWidget.ctaOnWidget.isEnabled()).toBe(false)) {
            browser.logger.info("CTA on widget is disabled until images are selected!");
        }
        else{
            browser.logger.info("CTA is not disabled even when images are not selected!")
        }

    });

    it('Verify selecting images in a shot under Captures tab', async function () {
        await browser.logger.info("***********Verify selecting images in a shot under Captures tab***********");
        //Comment this while running whole script together
        // uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
        await uploadWidgetPage.selectImageToMap(11);
    });

    it('Verify that no images exist under Select initially', async function () {
        await browser.logger.info("***********Verify that no images exist under Select initially***********");
        await data.uploadWidget.selectsTab.click();
        await uploadWidgetPage.verifyNoContentView();
    });

    it('Verify mapping selected images in a tab', async function () {
        await browser.logger.info("***********Verify mapping selected images in a tab***********");
        //Un-comment this while running whole script together
        await data.uploadWidget.captureTab.click();
        await uploadWidgetPage.mapImagesToShot();
    });

    it('Verify mapped images fall under Select tab', async function () {
        await browser.logger.info("***********Verify mapped images fall under Select tab***********");
        await data.uploadWidget.selectsTab.click();
        await uploadWidgetPage.verifyImagesUnderTab(10);
    });

    // it('Verify minimizing and maximizing the widget', async function () {
    //     await browser.logger.info("***********Verify minimizing and maximizing the widget***********");
    //     await uploadWidgetPage.minimizeWidget('Selects').then(async function(ID1){
    //         await uploadWidgetPage.maximizeOrCloseWidget('Maximize', ID1);
    //     })
    // });
    //
    // it('Verify minimizing and maximizing the widget', async function () {
    //     await browser.logger.info("***********Verify minimizing and maximizing the widget***********");
    //     await uploadWidgetPage.minimizeWidget('Selects');
    //     await uploadWidgetPage.maximizeOrCloseWidget('Close');
    // });

    it('Verify selecting images under Selects tab', async function () {
        await browser.logger.info("***********Verify selecting images under Selects tab***********");
        // data.uploadWidget.getCloseOnWidget('Capture').click();
        //Un-comment this while running whole script together
        // await uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
        await data.uploadWidget.selectsTab.click();
        await data.uploadWidget.selectsTab.click();
        await uploadWidgetPage.selectImageToMap(10);
        await uploadWidgetPage.mapImagesToShot();

    });

    it('Verify selected images fall under Edits tab', async function () {
        await browser.logger.info("***********Verify selected images fall under Edits tab***********");
        await data.uploadWidget.editsTab.click();
        await uploadWidgetPage.verifyImagesUnderTab('Edits');
    });

    it('Verify presence of download and cross icons on hover over original image', async function () {
        await browser.logger.info("***********Verify presence of download icon on hover over original image***********");
        browser.actions().mouseMove(data.uploadWidget.editOriginalThumbnail).perform();
        common.isElementPresent(data.uploadWidget.downloadOnHover, 'Download button');
        common.isElementPresent(data.uploadWidget.closeOnHover, 'Cross icon');
        data.uploadWidget.downloadOnHover.click();
        browser.sleep(2000);
    })

    it('Verify unique IDs on hover over original image', async function () {
        await browser.logger.info("***********Verify presence of download icon on hover over original image***********");
        await browser.actions().mouseMove(data.uploadWidget.editOriginalThumbnail).perform();
        await uploadWidgetPage.uniqueIDForContent('Original', 9).then(async function(expectedContentID){
            await common.verifyText(expectedContentID, data.uploadWidget.uniqueIDOnHover, "Unique IDs");
        })
    })

    it('Verify deleting an original image', async function () {
        await browser.logger.info("***********Verify cross icon click***********");
        await browser.actions().mouseMove(data.uploadWidget.editOriginalThumbnail).perform();
        await data.uploadWidget.closeOnHover.click().then(async function(){
            browser.sleep(3000);
            await browser.actions().mouseMove(data.uploadWidget.editOriginalThumbnail).perform();
            uploadWidgetPage.uniqueIDForContent('Original', 7).then(async function(expectedContentID2){
                common.isElementPresent(data.uploadWidget.uniqueIDOnHover, 'Unique ID');
                await common.verifyText(expectedContentID2, data.uploadWidget.uniqueIDOnHover, "Unique IDs")
                    .then(function(actual){
                        console.log("Image successfully deleted on the click of cross icon!");
                    })
            })
        })
    })

    it('Verify deleted images fall back under Selects tab', async function () {
        await browser.logger.info("***********Verify deleted images fall back under Selects tab***********");
        data.uploadWidget.selectsTab.click();
        uploadWidgetPage.verifyImagesUnderTab(3).then(function(count){
            if(count === 2){
                console.log("Deleted image falls back under Selects tab!")
            }
        })
    })

    it('Verify uploading RAW edited photos', async function () {
        await browser.logger.info("***********Verify uploading RAW edited photos***********");
        data.uploadWidget.editsTab.click();
        uploadWidgetPage.uploadEditedContent("test1.psd", 0, "RAW");
        uploadWidgetPage.uploadEditedContent("test2.psd", 1, "RAW");
        uploadWidgetPage.uploadEditedContent("test3.psd", 2, "RAW");
        expect(data.uploadWidget.returnAddVersionButton(0).isEnabled()).toBe(false);
        console.log("Add new variant button is diabled until JPG/PNG images are uploaded!")
    })

    it('Verify close icon on original image disappears when edited ones are uploaded', async function () {
        await browser.logger.info("***********Verify close icon on original image disappears***********");
        await browser.actions().mouseMove(data.uploadWidget.editOriginalThumbnail).perform();
        common.isElementPresent(data.uploadWidget.returnCloseOnHover(0), 'Cross icon');
    })



    it('Verify unique ID on edited RAW image', async function () {
        await browser.logger.info("***********Verify unique ID on edited RAW image***********");
        await browser.actions().mouseMove(data.uploadWidget.returnEditedThumbnail(0)).perform();
        uploadWidgetPage.uniqueIDForContent('E1', 7).then(async function (expectedContentID2) {
            common.waitForElement(data.uploadWidget.returnUniqueIDOnHover(1));
            common.isElementPresent(data.uploadWidget.returnUniqueIDOnHover(1), 'Unique ID');
            await common.verifyText(expectedContentID2, data.uploadWidget.returnUniqueIDOnHover(1), "Unique IDs")
                .then(function (actual) {
                    console.log("Unique ID successfully assigned to Edited RAW image!: " + actual);
                })

        })
    })

    it('Verify uploading JPG/PNG edited photos', async function () {
        await browser.logger.info("***********Verify uploading JPG/PNG edited photos***********");
        uploadWidgetPage.uploadEditedContent("test77.jpg", 0, "PNG/ JPG");
        uploadWidgetPage.uploadEditedContent("test9.jpg", 0, "PNG/ JPG");
        uploadWidgetPage.uploadEditedContent("test8.jpg", 0, "PNG/ JPG");
        expect(data.uploadWidget.returnAddVersionButton(0).isEnabled()).toBe(true);
        console.log("Add new variant button is enabled now!")

    })

    it('Verify unique ID on edited JPG/PNG image', async function () {
        await browser.logger.info("***********Verify unique ID on edited JPG/PNG image***********");
        await browser.actions().mouseMove(data.uploadWidget.returnEditedThumbnail(1)).perform();
        uploadWidgetPage.uniqueIDForContent('P1', 7).then(async function (expectedContentID2) {
            common.waitForElement(data.uploadWidget.returnUniqueIDOnHover(2));
            common.isElementPresent(data.uploadWidget.returnUniqueIDOnHover(2), 'Unique ID');
            await common.verifyText(expectedContentID2, data.uploadWidget.returnUniqueIDOnHover(2), "Unique IDs")
                .then(function (actual) {
                    console.log("Unique ID successfully assigned to Edited JPG/PNG image!: " + actual);

                })

        })
    })

    // // it('Verify adding edited RAW variants', async function () {
    // //     await browser.logger.info("***********Verify adding edited RAW variants***********");
    // //     data.uploadWidget.returnAddVersionButton(0).click().then(function(){
    // //         uploadWidgetPage.uploadEditedContent("test4.psd", 0, "RAW");
    // //
    // //     })
    // // })

    it('Verify adding edited JPG/PNG variants', async function () {
        await browser.logger.info("***********Verify adding edited JPG/PNG variants***********");
        data.uploadWidget.returnAddVersionButton(0).click().then(function() {
            uploadWidgetPage.uploadEditedContent("test5.jpg", 1, "PNG/ JPG");
        })

    })

    // // it('Verify deleting edited RAW image ', async function () {
    // //     await browser.logger.info("***********Verify adding edited JPG/PNG variants***********");
    // //     await browser.actions().mouseMove(data.uploadWidget.returnEditedThumbnail(2)).perform();
    // //     await data.uploadWidget.returnCloseOnHover(2).click().then(function(){
    // //         console.log("Edited RAW image deleted successfully!")
    // //     })
    // // })
    //
    it('Verify changing status of an edited JPG/PNG image ', async function () {
        await browser.logger.info("***********Verify default status of an image***********");
        //Comment this before running entire script!
        // data.uploadWidget.editsTab.click();
        common.waitForElement(data.uploadWidget.returnStatusInDrawer(1, 2));
        data.uploadWidget.returnStatusInDrawer(1, 2).click().then(function(){
            console.log("Status of image successfully changed to Available")
        })
    })

    it('Verify changing status of CR to Ready for images to be available in library! ', async function () {
        await browser.logger.info("***********Changing status of CR to Ready***********");
        data.uploadWidget.getCloseOnWidget('Edits').click();
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactContentRequest.viewShotList, "Content Request");
        contentRequestPage.changeStatusOfCR('Ready', data.reactGlobal.CRStatus.status7);
        data.reactContentRequest.viewShotList.click();
        browser.sleep(2500);
        common.waitForElement(data.reactShotList.shotStatus);
        common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
        uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
        data.uploadWidget.editsTab.click();
    })


    it('Verify Available content in content library ', async function () {
        await browser.logger.info("***********Verifying content in content library***********");
        browser.executeScript("return window.open(arguments[0], '_blank')", brandLoginURL);
        browser.getAllWindowHandles().then(async function (handles) {
            await browser.sleep(3000);

            await browser.switchTo().window(handles[1]);
                    common.waitForElement(brandDictionary.returnImageOnLibrary(1))

                    contentLibraryPage.applyFilter(data.reactGlobal.contentStatus.status2);
                    browser.switchTo().window(handles[0]);
                    common.waitForElement(data.uploadWidget.returnEditedThumbnail(1));
                    browser.actions().mouseMove(data.uploadWidget.returnEditedThumbnail(1)).perform();
                    common.waitForElement(data.uploadWidget.returnUniqueIDOnHover(2));
                    common.isElementPresent(data.uploadWidget.returnUniqueIDOnHover(2), 'Unique ID');
                    shortCardPage.verifyShotNumber(data.uploadWidget.returnEditedThumbnail(1), data.uploadWidget.returnUniqueIDOnHover(2))
                        .then(function (uniqueID) {
                            console.log("Content ID on react admin is: " + uniqueID);
                            browser.switchTo().window(handles[1]);
                            common.waitForElement(brandDictionary.returnImageOnLibrary(1));
                            browser.actions().mouseMove(brandDictionary.returnImageOnLibrary(1)).perform();
                            common.waitForElement(brandDictionary.contentID);
                            common.isElementPresent(brandDictionary.contentID, "Content ID on hover in library")
                            common.verifyText(uniqueID, brandDictionary.contentID, "Unique Ids")
                                .then(function (actual) {
                                    console.log("Image successfully marked Available. Content ID is: " + actual);
                                })
                        })

                // })
        })
    });

    it('Verify Free content in content library ', async function () {
        await browser.logger.info("***********Verifying content in content library***********");
        browser.getAllWindowHandles().then(async function (handles) {
            await browser.switchTo().window(handles[0]);
            data.uploadWidget.returnStatusInDrawer(2, 3).click().then(function(){
                console.log("Status of image successfully changed to Free")
            })
            browser.sleep(1000);
            await browser.switchTo().window(handles[1]);
            contentLibraryPage.applyFilter(data.reactGlobal.contentStatus.status3);
            browser.switchTo().window(handles[0]);
            common.waitForElement(data.uploadWidget.returnEditedThumbnail(2));
            browser.actions().mouseMove(data.uploadWidget.returnEditedThumbnail(2)).perform();
            common.waitForElement(data.uploadWidget.returnUniqueIDOnHover(3));
            common.isElementPresent(data.uploadWidget.returnUniqueIDOnHover(3), 'Unique ID');
            shortCardPage.verifyShotNumber(data.uploadWidget.returnEditedThumbnail(2), data.uploadWidget.returnUniqueIDOnHover(3))
                .then(function (uniqueID2) {
                    console.log("Content ID on react admin is: " + uniqueID2);
                    browser.switchTo().window(handles[1]);
                    browser.actions().mouseMove(brandDictionary.returnImageOnLibrary(1)).perform();
                    dictionary.dataDictionary.imageThumbnail.click();
                    common.waitForElement(dictionary.dataDictionary.downloadImage)
                    dictionary.dataDictionary.downloadImage.click();
                    common.waitForElement(dictionary.dataDictionary.originalImage)
                    dictionary.dataDictionary.originalImage.getText().then(function(dimensions){
                        if(dimensions !== 'Original (0x0)'){
                            console.log("Images has dimensions!")
                        }
                        else{
                            console.log("Dimensions missing in image!")
                        }
                        browser.sleep(2000);
                        dictionary.dataDictionary.closeDownloadDrawer.click();
                    })
                    common.waitForElement(brandDictionary.returnImageOnLibrary(1));
                    browser.actions().mouseMove(brandDictionary.returnImageOnLibrary(1)).perform();
                    common.waitForElement(brandDictionary.contentID);
                    common.isElementPresent(brandDictionary.contentID, "Content ID on hover in library")
                    common.verifyText(uniqueID2, brandDictionary.contentID, "Unique Ids")
                        .then(function (actual) {
                            console.log("Image successfully marked Free. Content ID is: " + actual);
                        })

                    browser.close();
                    browser.switchTo().window(handles[0]);
                    browser.refresh();

                })

        })
    });


});
