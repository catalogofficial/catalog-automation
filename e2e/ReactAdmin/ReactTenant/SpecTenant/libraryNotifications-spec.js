let navigationPage = require('../../PageObject/navigation-po');
let data = require ('../../../../Utils/dataFile_React.js');
let dictionary = require('../../../../Utils/DataFile.js')
let notificationsPo = require('../PageObjectTenant/notifications-po');
let fakeData = require('../../../../Utils/FakeData.js');
let common = require ('../../../../Utils/common');
let sgpt = require('sg-protractor-tools');
let pg = require('../../../../Utils/postgresDB.js');
let queries = require('../../../../Utils/queriesToRun');
let logout = require('../../../ReactAdmin/PageObject/login-po');
let uploadWidgetPage = require('../../PageObject/uploadWidget-po');
let contentRequestPage = require('../../PageObject/contentRequest-po.js');
let EC = protractor.ExpectedConditions;
let test = "Alayna"
// let test = fakeData.randomFirstName;
let gmailUrl = "https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";


describe('Verify placing comments ON images in content library', function () {

    beforeAll(function () {
        // browser.get('https://staging.catalog.cc/brands/863/content-library?unique_code=8ccad6bc-f3d8-4337-a64c-b2f1daa15091&content_request=1389');
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactGlobal.searchIcon, "Content Request");
        common.waitForElement(data.reactGlobal.searchIcon);
        common.search(data.reactContentRequest.searchFieldCR, test + " Brand", data.reactContentRequest.viewShotList)
            .then(function(brand) {
                common.waitForElement(data.reactContentRequest.brandInCRListing);
                data.reactContentRequest.brandInCRListing.click().then(function(){
                    common.waitForElement(data.reactContentRequest.hambuger);
                    data.reactContentRequest.hambuger.click();
                    data.reactContentRequest.returnCrActions(2).click().then(function(){
                        browser.getAllWindowHandles().then(async function (handles) {
                            // await browser.switchTo().window(handles[2]);
                            await browser.switchTo().window(handles[1]);

                        });
                    })
                })

            })
    });

    it('Verify opening lightbox view of image', async function () {
        await console.log("***********Verifying opening image in full view***********");
        common.waitForElement(dictionary.dataDictionary.returnImageOnLibrary(1));
        browser.actions().mouseMove(dictionary.dataDictionary.returnImageOnLibrary(1))
            .mouseMove(dictionary.dataDictionary.returnImageOnLibrary(1)).perform();
        browser.sleep(1000);
        expect((dictionary.dataDictionary.zoomIcon).isDisplayed()).toBeTruthy();
        dictionary.dataDictionary.zoomIcon.click();
    })

    it('Verify opening comment view of image in library', async function () {
        await browser.logger.info("***********Verify opening comment view of image***********");
        common.waitForElement(data.comments.frontEndCommentCta);
        data.comments.frontEndCommentCta.click().then(function () {
            expect(data.comments.previewModeFrontEnd.isDisplayed()).toBeTruthy();
            console.log("Comment mode opened successfully in library!");
            data.comments.closeLightBoxFrontEnd.click().then(function(){
                browser.actions().mouseMove(dictionary.dataDictionary.returnImageOnLibrary(1))
                    .mouseMove(dictionary.dataDictionary.returnImageOnLibrary(1)).perform();
                browser.sleep(2000);
                expect((dictionary.dataDictionary.zoomIcon).isDisplayed()).toBeTruthy();
                dictionary.dataDictionary.zoomIcon.click().then(function(){
                    data.comments.frontEndCommentCta.click();
                    expect(data.comments.previewModeFrontEnd.isDisplayed()).toBeTruthy();
                })
            })

        })
    })

    it('Verify placing a markup in content in library', async function () {
        await browser.logger.info("***********Verify opening comment view of image***********");
        common.waitForElement(dictionary.dataDictionary.freeTag);
        notificationsPo.placeMarkup('libraryContent');
    })


    it('Verify while commenting without tagging!',async function () {
        console.log("***********Verifying tagging without commenting***********");
        browser.sleep(10000);
        notificationsPo.placeComment("This comment is made from front end library. "
            + data.comments.testComment, 'lightboxLibrary')

    });


    it('Verify the user name of user who made the comment', function () {
        console.log("***********Verifying user name inside notification panel***********");
        data.comments.closeLightBoxFrontEnd.click().then(function(){
            data.comments.userNameFrontEnd.getText().then(function(loggedInUser) {
                browser.getAllWindowHandles().then(async function (handles) {
                    // await browser.switchTo().window(handles[1]);
                    browser.close();
                    await browser.switchTo().window(handles[0]);
                    notificationsPo.verifyDataInNotificationPanel(data.comments.returnUserNameInNotificationPanel(2)
                        , loggedInUser, "User Name").then(function (message) {
                        console.log(message);
                        notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
                    });
                });

            });
        })

    });

    it('Verify comment in notification panel', function () {
        console.log("***********Verifying comment in notification panel***********");
        notificationsPo.verifyDataInNotificationPanel(data.comments.returnCommentInNotificationPanel(2)
            , data.comments.testComment, "Comment").then(function(message){
            console.log(message);
            notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
        });

    });

    it('Verify that producer receives notification for a comment made in angular', function () {
        console.log("***********Verifying navigation on the click of notification***********");
        data.reactContentRequest.crId.getText().then(function(CRID) {
            let crid = CRID.substring(3,10);
            notificationsPo.verifyNotificationNavigation("shots?q=" + crid, "lightboxMode")
                .then(function(msg){
                    console.log(msg);
                    data.comments.lightboxCrossIcon.click().then(async function(){
                        data.uploadWidget.getCloseOnWidget('Edits').click();
                    })
                })
        })
    });

    it('Verify producer receives email and re-direction for a comment via email!',async function () {
        console.log("***********Verifying navigation from email***********");
        common.waitForElement(data.reactGlobal.userProfile);
        logout.logoutUser();
        notificationsPo.verifyEmailNotification(gmailUrl, data.uploadWidget.commentIcon
            , "/shots?q=");

    });

});
