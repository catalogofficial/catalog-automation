let data = require ('../../../../Utils/dataFile_React.js');
let dictionary = require ('../../../../Utils/DataFile.js');

let common = require ('../../../../Utils/common.js');
const tenantNames =[];
let counter = 0;
let fakeData = require('../../../../Utils/FakeData.js');
let sgpt = require('sg-protractor-tools');
let pg = require('../../../../Utils/postgresDB.js');
let queries = require('../../../../Utils/queriesToRun');
let EC = protractor.ExpectedConditions;
let adminLogin = require('../../PageObject/login-po');
let gmailLogin = require('../../../FrontEnd/PageObject/gmail_po');

function openCommentView(lightBoxFlag) {
    return new Promise(function(resolve, reject) {
        if(lightBoxFlag === 'lightBoxTrue'){
            data.comments.lightboxTextArea.click();
            sgpt.scroll.scrollTo(data.comments.cancelCta);
            browser.actions().mouseMove(data.comments.cancelCta).perform();
            resolve();
        }

        else if(lightBoxFlag === 'libraryContent'){
            data.comments.textAreaFrontEnd.click();
            sgpt.scroll.scrollTo(data.comments.cancelCtaFrontEnd);
            browser.actions().mouseMove(data.comments.cancelCtaFrontEnd).perform();
            resolve();
        }

        else{
            sgpt.scroll.scrollTo(data.reactContentRequest.commentButton);
            data.reactContentRequest.commentButton.click();
            sgpt.scroll.scrollTo(data.comments.cancelCta);
            browser.actions().mouseMove(data.comments.cancelCta).perform();
            resolve();
        }

    });
}

function closeNotificationPanel(verifyElementAfterClose) {
    return new Promise(function(resolve, reject) {
        common.waitForElement(data.comments.closeNotificationPanel);
        data.comments.closeNotificationPanel.click();
        // common.waitForElement(verifyElementAfterClose);
    });
}

function verifyCommentView(comment) {
    return new Promise(function(resolve, reject) {
        data.comments.returnCommentBody(1).getText().then(function(commentText){
            console.log("Actual: " + commentText + " Expected: " + comment)
            if(commentText.includes(comment)){
                console.log("Comment successfully made in the 1st position!")
                resolve();
                // resolve("Comment successfully made in the 1st position!")
            }
            else {
                console.log("Some error occurred while placing the comment!");
                reject()
            }
        })
    });
}

function verifyTaggedComments(businessUsersFromDb, comment, source) {
    return new Promise(function(resolve, reject) {

        if(source === 'lightbox') {
            data.comments.textArea = data.comments.lightboxTextArea;
        }

        console.log("Business users from DB are: " + businessUsersFromDb)
        browser.sleep(5000);
        data.comments.textArea.sendKeys("@");
        browser.sleep(3000);
        data.comments.textArea.sendKeys(businessUsersFromDb);
        browser.sleep(2000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        data.comments.textArea.sendKeys(" ");
        placeComment(comment, source);

    });
}

function placeComment(comment, source) {
    return new Promise(function(resolve, reject) {
        if(source === 'lightbox') {
            data.comments.lightboxTextArea.sendKeys(" " + comment);
            data.comments.saveCta.click().then(function(){
                browser.wait(EC.not(EC.presenceOf(data.comments.saveCta))).then(function(){
                    verifyCommentView(comment);
                });
            })
        }
        else if(source === 'lightboxLibrary'){
            data.comments.lightboxTextArea.sendKeys(" " + comment);
            data.comments.addCtaFrontEnd.click().then(function(){
                verifyCommentView(comment);
            });
        }
        else{
            data.comments.textArea.sendKeys(" " + comment);
            data.comments.saveCta.click().then(function(){
                browser.wait(EC.not(EC.presenceOf(data.comments.saveCta))).then(function(){
                    verifyCommentView(comment);
                });
            })
        }

    });
}

function verifyDataInNotificationPanel(elementToVerify, textToVerify, whatToVerify) {
    return new Promise(function(resolve, reject) {
        data.comments.bellIcon.click();
        common.waitForElement(elementToVerify);
        elementToVerify.getText().then(function(actualText){
            if(actualText.includes(textToVerify)){
                resolve(whatToVerify + " matches in notification panel!")
            }
            else {
                reject("Could not match " + whatToVerify + " in notification panel!")
            }
        })

    });
}

function verifyNotificationNavigation(verifyInUrl, flag) {
    return new Promise(function (resolve, reject) {

        data.comments.bellIcon.click().then(function(){
            common.waitForElement(data.comments.returnCommentInNotificationPanel(2));
            data.comments.returnCommentInNotificationPanel(2).click();
            if(flag === 'lightboxMode'){
                common.waitForElement(data.uploadWidget.commentIcon);
                browser.isElementPresent(data.uploadWidget.commentIcon).then( function (result) {
                    if (result) {
                        expect(browser.getCurrentUrl()).toContain(verifyInUrl);
                        resolve("Re-direction from notification successful!!");
                    }

                    else{
                        reject("Some error occurred in re-direction from notification! ONE");
                    }
                });

            }

            else{
                common.waitForElement(data.reactContentRequest.commentButton);
                browser.isElementPresent(data.reactContentRequest.commentButton).then( function (result) {
                    if (result) {
                        expect(browser.getCurrentUrl()).toContain(verifyInUrl);
                        resolve("Re-direction from notification successful!!");
                    }

                    else{
                        reject("Some error occurred in re-direction from notification! TWO");
                    }
                });

            }

        })
    });
}

function verifyEmailNotification(url, waitForElement, verifyUrl) {
    return new Promise(function (resolve, reject) {
        browser.get(url);
        browser.isElementPresent(dictionary.gmail.gmailTextBox).then( function (result) {
            if (result) {
                gmailLogin.registerWithGmail(data.reactLogin.validUser, data.reactLogin.validPassword2);
                common.waitForElement(data.reactLogin.gmailInbox(0));
                data.reactLogin.gmailInbox(0).click().then(function(){
                    browser.sleep(5000);
                    common.waitForElement(data.reactLogin.viewCommentEmailCta);
                    data.reactLogin.viewCommentEmailCta.click();
                    browser.getAllWindowHandles().then(function (handles) {
                        browser.switchTo().window(handles[1]).then(function () {
                            browser.isElementPresent(data.reactLogin.userName).then( function (result) {
                                if (result) {
                                    common.waitForElement(data.reactLogin.userName);
                                    data.reactLogin.userName.sendKeys(data.reactLogin.validUser);
                                    data.reactLogin.password.sendKeys(data.reactLogin.validPassword);
                                    data.reactLogin.logInButton.click();
                                };
                                common.waitForElement(waitForElement);

                                browser.isElementPresent(waitForElement).then( function (result) {
                                    if (result) {
                                        expect(browser.getCurrentUrl()).toContain(verifyUrl);
                                        resolve("Re-direction from email notification successful!!");
                                    }

                                    else{
                                        reject("Some error occurred in re-direction from email notification! ONE");
                                    }
                                });
                            });

                        });
                    });
                })
            }

            else{
                console.log("Could not connect with gmail...");
            }
        });

    });
}

function openCommentViewOfImage(thumbnailIndex, zoomIconIndex, flag) {
    return new Promise(async function(resolve, reject) {
        common.waitForElement(data.uploadWidget.firstPublicThumbnail);
        await browser.actions().mouseMove(data.uploadWidget.firstPublicThumbnail)
            .mouseMove(data.uploadWidget.firstPublicThumbnail).perform();
        await expect(data.uploadWidget.returnZoomIconOnThumbnail(zoomIconIndex).isDisplayed()).toBeTruthy();
        data.uploadWidget.returnZoomIconOnThumbnail(zoomIconIndex).click().then(function(){
            browser.sleep(2000);
            expect(data.uploadWidget.commentIcon.isDisplayed()).toBeTruthy();
            data.uploadWidget.commentIcon.click().then(function () {
                expect(data.uploadWidget.previewMode.isDisplayed()).toBeTruthy();
                console.log("Comment mode opened successfully!");
                placeMarkup(flag);
            })
        })
    });
}

function placeMarkup(flag) {
    return new Promise(async function(resolve, reject) {
        if(flag === 'libraryContent'){
            data.comments.lightboxTextArea = data.comments.textAreaFrontEnd;
            // data.uploadWidget.lightboxImage = dictionary.dataDictionary.freeTag;
        }

        await browser.actions().mouseMove(data.uploadWidget.lightboxImage).perform();
        data.uploadWidget.lightboxImage.click().then(function(){
            expect(data.comments.lightboxTextArea.isDisplayed()).toBeTruthy();
            openCommentView(flag);
        })

    });
}

module.exports.openCommentView = openCommentView;
module.exports.closeNotificationPanel = closeNotificationPanel;
module.exports.verifyTaggedComments = verifyTaggedComments;
module.exports.verifyDataInNotificationPanel = verifyDataInNotificationPanel;
module.exports.verifyNotificationNavigation = verifyNotificationNavigation;
module.exports.placeComment = placeComment;
module.exports.verifyEmailNotification = verifyEmailNotification;
module.exports.openCommentViewOfImage = openCommentViewOfImage;
module.exports.placeMarkup = placeMarkup;
