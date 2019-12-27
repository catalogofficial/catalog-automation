let navigationPage = require('../../PageObject/navigation-po');
let data = require ('../../../../Utils/dataFile_React.js');
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


describe('Verify placing comments ON content on the new admin', function () {

    it('Enter shot list of a CR', async function () {
        await browser.logger.info("***********Verifying searching through the list of CRs***********");
        common.waitForElement(data.reactGlobal.searchIcon);
        // await common.search(data.reactContentRequest.searchFieldCR, fakeData.randomFirstName + " Brand", data.reactContentRequest.viewShotList)
        await common.search(data.reactContentRequest.searchFieldCR, test + " Brand", data.reactContentRequest.viewShotList)
            .then(function(brand){
                console.log("Search successfully performed for brand: " + brand);
                common.waitForElement(data.reactContentRequest.viewShotList);
                data.reactContentRequest.viewShotList.click();
                common.waitForElement(data.reactShotList.shotStatus);
            })
    });

    it('Verify opening upload widget', function () {
        console.log("***********Verifying opening CR drawer***********");
        data.reactShotList.shotStatus.click();
        common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
        uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
    });

    it('Verify uploading content under Capture tab', function () {
        browser.logger.info("***********Uploading images under Capture tab***********");
        uploadWidgetPage.multipleFileUpload("test1.jpg", "test2.jpg", "test3.jpg", "test4.jpg", "test5.jpg", "test6.jpg", "test8.jpg", "test9.jpg", "test10.jpg", "test11.jpg", "123456.jpg");
    });

    // it('Verify that all files are uploaded', function () {
    //     browser.logger.info("***********Waiting for all files to upload.....***********");
    //     common.waitForElement(data.uploadWidget.textOnUploadQueue);
    // });

    it('Verify selecting images in a shot under Captures tab', async function () {
        await browser.logger.info("***********Verify selecting images in a shot under Captures tab***********");
        browser.sleep(15000);
        uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
        await uploadWidgetPage.selectImageToMap(9);
    });


    it('Verify mapping selected images in a tab', async function () {
        await browser.logger.info("***********Verify mapping selected images in a tab***********");
        await uploadWidgetPage.mapImagesToShot();
    });

    it('Verify mapped images fall under Select tab', async function () {
        await browser.logger.info("***********Verify mapped images fall under Select tab***********");
        await data.uploadWidget.editsTab.click();
    });

    // it('Verify selecting images under Selects tab', async function () {
    //     await browser.logger.info("***********Verify selecting images under Selects tab***********");
    //     await uploadWidgetPage.selectImageToMap(8);
    //     await uploadWidgetPage.mapImagesToShot();
    //
    // });

    it('Verify selected images fall under Edits tab', async function () {
        await browser.logger.info("***********Verify selected images fall under Edits tab***********");
        await data.uploadWidget.editsTab.click();
        await uploadWidgetPage.verifyImagesUnderTab('Edits');
    });

    it('Verify uploading JPG/PNG edited photos', async function () {
        await browser.logger.info("***********Verify uploading JPG/PNG edited photos***********");
        uploadWidgetPage.uploadEditedContent("test77.jpg", 1, "PNG/ JPG");
        expect(data.uploadWidget.returnAddVersionButton(0).isEnabled()).toBe(true);
        console.log("Add new variant button is enabled now!")

    })

    it('Verify changing status of an edited JPG/PNG image ', async function () {
        await browser.logger.info("***********Verify default status of an image***********");
        //Comment this before running entire script!
        // data.uploadWidget.editsTab.click();
        common.waitForElement(data.uploadWidget.returnStatusInDrawer(1, 2));
        data.uploadWidget.returnStatusInDrawer(1, 3).click().then(function(){
            console.log("Status of image successfully changed to Free")
        })
    });

    it('Verify changing status of CR to Ready for images to be available in library! ', async function () {
        await browser.logger.info("***********Changing status of CR to Ready***********");
        data.uploadWidget.getCloseOnWidget('Edits').click();
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactGlobal.searchIcon, "Content Request");
        common.waitForElement(data.reactGlobal.searchIcon);
        common.search(data.reactContentRequest.searchFieldCR, test + " Brand", data.reactContentRequest.viewShotList)
            .then(function(brand) {
                common.waitForElement(data.reactContentRequest.brandInCRListing);
                data.reactContentRequest.brandInCRListing.click();
                // data.reactContentRequest.crCreator.click();
                contentRequestPage.changeStatusOfCR('Ready', data.reactGlobal.CRStatus.status7);
                data.reactContentRequest.viewShotList.click();
                browser.sleep(2500);
                common.waitForElement(data.reactShotList.shotStatus);
                common.openDrawer(data.reactShotList.shotStatus, data.uploadWidget.uploadButton);
                uploadWidgetPage.verifyWidgetOpens("Shot listing", 1);
                data.uploadWidget.editsTab.click();
            })
    })

    it('Verify opening comment view of image', async function () {
        await browser.logger.info("***********Verify opening comment view of image***********");
        notificationsPo.openCommentViewOfImage(1,1, 'lightBoxTrue');
    })


    it('Verify while tagging logged in user while commenting on a CR!', async function () {
        console.log("***********Verifying tagging logged in user while commenting on a CR***********");

        async function getLoggedInUser (response) {
            await notificationsPo.verifyTaggedComments(response['username'],
                data.comments.testComment, "lightbox");

        };
        data.reactGlobal.username.getText().then(async function(username){
            browser.sleep(10000);
            await pg.pgAdmin.ExecuteQuery(queries.queryParams.returnUserEmail(username),getLoggedInUser);
        })
    });

    it('Verify while commenting without tagging!',async function () {
        console.log("***********Verifying tagging without commenting***********");
        browser.sleep(10000);
        notificationsPo.placeComment("This comment does not have any tagged users. "
            + data.comments.testComment);

    });

    it('Verify while fetching list of tagged users from DB while commenting on a CR!',async function () {
        console.log("***********Verifying list of tagged users while commenting on a CR***********");
        function getBusinessUsers (response) {
            notificationsPo.verifyTaggedComments(response['username'],
                data.comments.testComment, "lightbox");
        };

        notificationsPo.openCommentView('lightBoxTrue').then(function(){
            browser.sleep(10000);
            pg.pgAdmin.ExecuteQuery(queries.queryParams.returnBusinessUsers
            (test + "@mailinator.com"), getBusinessUsers);
        })

    });

    it('Verify the content ID inside notification', function () {
        console.log("***********Verifying content ID inside notification***********");
        data.comments.lightboxCrossIcon.click().then(async function(){
            // browser.actions().mouseMove(data.uploadWidget.firstPublicThumbnail)
            // .mouseMove(data.uploadWidget.firstPublicThumbnail).perform().then(function(){
            // expect((data.uploadWidget.returnUniqueIDOnHover(2)).isDisplayed()).toBeTruthy();
            data.uploadWidget.returnUniqueIDOnHover(2).getText().then(function(uniqueID){
                console.log("UNIQUEEE.. " + uniqueID);
                data.uploadWidget.getCloseOnWidget('Edits').click();
                notificationsPo.verifyDataInNotificationPanel(data.comments.returnTagInNotificationPanel(2)
                    , uniqueID, "Content ID").then(function (message) {
                    console.log(message);
                    notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
                });

            })
            // })

        })
    });


    it('Verify the user name of user who made the comment', function () {
        console.log("***********Verifying user name inside notification panel***********");
        data.reactGlobal.username.getText().then(function(loggedInUser) {
            notificationsPo.verifyDataInNotificationPanel(data.comments.returnUserNameInNotificationPanel(2)
                , loggedInUser, "User Name").then(function (message) {
                console.log(message);
                notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
            });
        });
    });

    it('Verify comment in notification panel', function () {
        console.log("***********Verifying comment in notification panel***********");
        notificationsPo.verifyDataInNotificationPanel(data.comments.returnCommentInNotificationPanel(2)
            , data.comments.testComment, "Comment").then(function(message){
            console.log(message);
            notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
        });

    });

    it('Verify clicking on notification should open that particular content', function () {
        console.log("***********Verifying navigation on the click of notification***********");
        data.reactShotList.CRShotID.getText().then(function(CRID) {
            let crid = CRID.substring(3,7);
            notificationsPo.verifyNotificationNavigation("shots?q=" + crid, "lightboxMode")
                .then(function(msg){
                    console.log(msg);
                    data.comments.lightboxCrossIcon.click().then(async function(){
                        data.uploadWidget.getCloseOnWidget('Edits').click();
                    })
                })
        })

    });

    it('Verify re-direction for a comment via email!',async function () {
        console.log("***********Verifying navigation from email***********");
        common.waitForElement(data.reactGlobal.userProfile);
        logout.logoutUser();
        notificationsPo.verifyEmailNotification(gmailUrl, data.uploadWidget.commentIcon
            , "/shots?q=").then(function(message){
            console.log(message)
            data.comments.lightboxCrossIcon.click().then(async function(){
                data.uploadWidget.getCloseOnWidget('Edits').click();
            })
        })

    });

    it('Verify assigning producer to shot',async function () {
        console.log("***********Verifying assigning producer to shot***********");
        common.waitForElement(data.reactShotList.producer);
        data.reactShotList.producer.sendKeys(data.reactLogin.validUser);
        common.waitForElement(data.reactShotList.returnSearchedProducer(data.reactLogin.validUser));
        data.reactShotList.returnSearchedProducer(data.reactLogin.validUser).click().then(function(){
            common.waitForElement(data.reactShotList.returnproducerPill(data.reactLogin.validUser));
            console.log("Producer " + data.reactLogin.validUser +" successfully selected for the shot!")
        })
    });

});
