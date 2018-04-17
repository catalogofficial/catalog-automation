let MapInfluencerpage = require('./MapInfluncer.po');
let SelectCamp = require('../SelectCamp/SelectCamp.po');
let Home = require('../AdminHome/Home.po');
let AddInfluncer = require('../AddInfluncer/AddInfluncer.po');
let CommonActions = require('../../../Common/CommonActions');
let Gmail = require('../../../Common/GmailTest');
let Login = require('../AdminLogin/Login.po');
let AcceptCollaboration = require('../AcceptCollaboration/AcceptCollaboration.po');
let UploadContent = require('../UploadContent/UploadContent.po');


describe('Verify the Influencer mapping functionality', function () {

    let firstName = browser.params.NewInfluencerFirstName;
    let secondName = browser.params.NewInfluencerSecondName;

    beforeAll((done) => {

        browser.get(browser.params.adminUrl);
        Login.doAdminLogin();
        done();
    });

    beforeEach(() => {
        browser.navigate().to('https://api-staging.unityinfluence.com/admin/');
        AddInfluncer.goToCampaignListingPage();


    });

    //Negative scenario

    // it('Verify that Influencer should not get map with a campaign on page reload', () => {
    //     SelectCamp.searchCampaign(browser.params.NotShippedCampaign);
    //     MapInfluencerPage.removeAlreadyExistedInfluencer();
    //     MapInfluencerPage.selectNewInfluencerName();
    //     browser.navigate().to(browser.getCurrentUrl()).then(() => {
    //         CommonActions.waitForElement(MapInfluencerPage.PageElements.rowList);
    //         CommonActions.scrollToElement(MapInfluencerPage.PageElements.rowList);
    //         expect(MapInfluencerPage.PageElements.rowList.count()).toBeLessThan(2);
    //         browser.logger.info('Influncer is not mapped with Campaign on page load')
    //
    //
    //     })
    // });

    it('Verify the matched status of an influncer when mapped to non-shipping campaign and mail triggered in inbox', () => {
        browser.navigate().to('https://api-staging.unityinfluence.com/admin/influencer/influencer/');
        AddInfluncer.clickAddInfluencerBtn();
        AddInfluncer.AddDetails();
        AddInfluncer.confirmSuccessfulNotificationMessage();
        AddInfluncer.goToCampaignListingPage();
        SelectCamp.searchCampaign(browser.params.NotShippedCampaign);
        MapInfluencerpage.removeAlreadyExistedInfluencer();
        MapInfluencerpage.selectNewInfluencerName();
        MapInfluencerpage.saveInfluencer();
        let statusDropDown = element(by.css('#id_campaigninfluencer_set-0-status'));
        expect(statusDropDown.$('option:checked').getText()).toEqual('Invited');
        expect(statusDropDown.isDisabled).toBe(statusDropDown.isDisabled);

        statusDropDown.$('option:checked').getText().then((value) => {
            browser.logger.info('Status is :' + value);
            MapInfluencerpage.influencerEmail();
        });

        MapInfluencerpage.PageElements.collaboration_Page.click();

        browser.getAllWindowHandles().then(function (handles) {

            browser.switchTo().window(handles[1]).then(function () {
                AcceptCollaboration.collaborationDetails();
                browser.driver.close();
                browser.switchTo().window(handles[0]);


            });


        })


    });
    // it('Verify that same details should be there in collaboration email', () => {
    //     SelectCamp.searchCampaign(browser.params.NotShippedCampaign);
    //     MapInfluencerPage.removeAlreadyExistedInfluencer();
    //     MapInfluencerPage.selectNewInfluencerName();
    //     MapInfluencerPage.saveInfluencer();
    //
    //     Gmail.gmailSignIn(browser.params.GmailAddress, browser.params.GmailPswd);
    //     expect(browser.getCurrentUrl()).toContain('https://mail.google.com/mail');
    //     Gmail.verifyReceivedEmail();
    //
    //     //Verify that same details should be there in collaboration email
    //     let emailContent = element.all(by.xpath('//*[starts-with(@id,":")]//following::table//following::tr[3]/td/span[2]'));
    //     CommonActions.waitForElement(emailContent);
    //     CommonActions.scrollToElement(emailContent);
    //     emailContent.map(function (elm, index) {
    //         return {
    //
    //             index: index,
    //             text: elm.getText(),
    //
    //         }
    //     }).then(function (arr) {
    //         console.log(arr.slice(2, 7));
    //
    //         expect(arr.slice(2, 7)).toEqual([
    //             {index: 2, text: 'Automation_Product'},
    //             {index: 3, text: 'This is the test automation description'},
    //             {index: 4, text: '01/03/2018'},
    //             {index: 5, text: 'Photo'},
    //             {index: 6, text: '01/10/2018'}])
    //     });
    //
    //
    // });


    // it('Verify Map New Influencer with Campaign having shipping address and email triggered in inbox', () => {
    //
    //     SelectCamp.searchCampaign(browser.params.FirstCampName);
    //     MapInfluencerPage.removeAlreadyExistedInfluencer();
    //     MapInfluencerPage.selectNewInfluencerName();
    //     MapInfluencerPage.saveInfluencer();
    //     let statusDropDown = element(by.css('#id_campaigninfluencer_set-0-status'));
    //     expect(statusDropDown.$('option:checked').getText()).toEqual('Matched');
    //     expect(statusDropDown.isDisabled).toBe(statusDropDown.isDisabled);
    //
    //     statusDropDown.$('option:checked').getText().then((value) => {
    //         browser.logger.info('Status is :' + value);
    //
    //     });
    //
    //     /*let list = element.all(by.xpath('//!*[@class="form-row field-not_interested_influencers"]//following::div[@class="readonly"]'));
    //     CommonActions.waitForElement(list);
    //     CommonActions.scrollToElement(list);
    //     expect(list.getText()).toMatch(firstName);*/
    //
    //
    //     //Verify email received in inbox
    //     Gmail.gmailSignIn(browser.params.GmailAddress, browser.params.GmailPswd);
    //     expect(browser.getCurrentUrl()).toContain('https://mail.google.com/mail');
    //     Gmail.verifyReceivedEmail();
    //     let email_Subject = element(by.xpath('//*[@class="ha"]'));
    //     expect(email_Subject.getText()).toContain('Unity | Paid collaboration opportunity with');
    //
    // });


    it('Verify all ready mapped influencer there should be a alert (Matched status case)', () => {

        SelectCamp.searchCampaign(browser.params.NotShippedCampaign);

        MapInfluencerpage.allReadyMappedInfluencer();


    });

    it('Verify by clicking on upload content link form admin panel.', () => {


    SelectCamp.searchCampaign(browser.params.NotShippedCampaign);
    MapInfluencerpage.UploadcontentLink();
        browser.getAllWindowHandles().then(function (handles) {

            browser.switchTo().window(handles[1]).then(function () {
                UploadContent.page400();
                browser.driver.close();
                browser.switchTo().window(handles[0]);


            });


        })




    })
});












