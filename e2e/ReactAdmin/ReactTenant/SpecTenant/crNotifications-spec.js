let navigationPage = require('../../PageObject/navigation-po');
let data = require ('../../../../Utils/dataFile_React.js');
let notificationsPo = require('../PageObjectTenant/notifications-po');
let fakeData = require('../../../../Utils/FakeData.js');
let common = require ('../../../../Utils/common');
let sgpt = require('sg-protractor-tools');
let pg = require('../../../../Utils/postgresDB.js');
let queries = require('../../../../Utils/queriesToRun');
let logout = require('../../../ReactAdmin/PageObject/login-po')
let test = "Alayna"
// let test = fakeData.randomFirstName;
let gmailUrl = "https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";

describe('Verify placing comments ON CRs on the new admin', function () {

    beforeAll(function (done) {
        // navigationPage.goToPage(data.reactContentRequest.crNavigation, data.brands.createBrandCTA, "Content Request");
        done();
    });

    it('Search for CR based on brand', async function () {
        await browser.logger.info("***********Verifying searching through the list of CRs***********");
        common.waitForElement(data.reactGlobal.searchIcon);
        // await common.search(data.reactContentRequest.searchFieldCR, fakeData.randomFirstName + " Brand", data.reactContentRequest.viewShotList)
        await common.search(data.reactContentRequest.searchFieldCR, test + " Brand", data.reactContentRequest.viewShotList)
            .then(function(brand){
                console.log("Search successfully performed for brand: " + brand);
                common.waitForElement(data.reactContentRequest.brandInCRListing);
            })
    });

    it('Verify opening CR drawer!', function () {
        console.log("***********Verifying opening CR drawer***********");
        data.reactContentRequest.brandInCRListing.click();
        data.reactContentRequest.crCreator.click();
        common.waitForElement(data.reactContentRequest.shotCategoryDropDown);
        sgpt.scroll.scrollTo(data.reactContentRequest.commentButton);
        browser.actions().mouseMove(data.reactContentRequest.commentButton).perform();
        browser.sleep(3000);
        notificationsPo.openCommentView()
    });

    it('Verify while tagging logged in user while commenting on a CR!', async function () {
        console.log("***********Verifying tagging logged in user while commenting on a CR***********");

        async function getLoggedInUser (response) {
            await notificationsPo.verifyTaggedComments(response['username'],
                data.comments.testComment);


        };
        data.reactGlobal.username.getText().then(async function(username){
            browser.sleep(10000);
            await pg.pgAdmin.ExecuteQuery(queries.queryParams.returnUserEmail(username),getLoggedInUser);
        })
    });
    //
    // it('Verify the presence of unread indication on notification', function () {
    //     console.log("***********Verifying unread notification inside notification panel***********");
    //     data.comments.bellIcon.click();
    //     common.waitForElement(data.comments.returnCommentInNotificationPanel(2));
    //     expect(element.all(by.css('[class*="status-light status-red"]')).get(1).getAttribute('class')).
    //     toMatch('notification-light red-light');
    //     notificationsPo.closeNotificationPanel();
    // });

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

    it('Verify the CRID in notification panel in which comment was made', function () {
        console.log("***********Verifying CRID inside notification panel***********");
        data.reactContentRequest.crId.getText().then(function(CRID) {
            let crid = CRID.substring(3,9);
            notificationsPo.verifyDataInNotificationPanel(data.comments.returnTagInNotificationPanel(2)
                , crid, "CRID").then(function (message) {
                console.log(message);
                notificationsPo.closeNotificationPanel(data.comments.returnCommentBody(1));
            });
        });

    });

    it('Verify clicking on notification should open that particular CR', function () {
        console.log("***********Verifying navigation on the click of notification***********");
        data.reactContentRequest.crId.getText().then(function(CRID) {
            let crid = CRID.substring(3,9);
            notificationsPo.verifyNotificationNavigation("crId=" + crid).then(function(msg){
                console.log(msg)
            })
        })

    });

    it('Verify opening comment mode again!', function () {
        console.log("***********Verifying opening comment mode again***********");
        common.waitForElement(data.reactContentRequest.shotCategoryDropDown);
        sgpt.scroll.scrollTo(data.reactContentRequest.commentButton);
        browser.actions().mouseMove(data.reactContentRequest.commentButton).perform();
        browser.sleep(3000);
        notificationsPo.openCommentView()
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
                data.comments.testComment);
        };

        notificationsPo.openCommentView().then(function(){
            browser.sleep(10000);
            pg.pgAdmin.ExecuteQuery(queries.queryParams.returnBusinessUsers
            (test + "@mailinator.com"), getBusinessUsers);
        })

    });

    it('Verify re-direction for a comment via email!',async function () {
        console.log("***********Verifying navigation from email***********");
        common.waitForElement(data.reactGlobal.userProfile);
        logout.logoutUser();
        notificationsPo.verifyEmailNotification(gmailUrl, data.reactContentRequest.commentButton
        , "crId").then(function(msg){
            console.log(msg)
        })

    });

});
