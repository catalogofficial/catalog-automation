let shotsPage = require('../PageObject/shots-po.js');
let shotCardPage = require('../PageObject/shotCard-po')
let contentRequestPage = require('../PageObject/contentRequest-po.js');
let navigationPage = require('../PageObject/navigation-po');
let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let crID;
let values = data.reactShotList.values;


describe('Verify shot listing page on React admin', function () {

    // beforeAll(function () {
    //     navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactContentRequest.viewShotList, "Content Request");
    //     common.waitForElement(data.reactContentRequest.viewShotList);
    //     data.reactContentRequest.viewShotList.click();
    //     common.waitForElement(data.reactShotList.returnShotColumn(1, 3));
    //     // if(data.reactShotList.returnShotColumn(1, 3)){
    //     //     browser.logger.info('Admin is on shot listing page');
    //     // }else{
    //     //     browser.logger.info("Admin couldn't reach the shot listing page");
    //     // }
    // });

    it('Verify CR number on shot ID', function () {
        browser.logger.info("***********Verifying CR number on shot ID***********");
        contentRequestPage.verifyCRNumber(data.reactContentRequest.crId).then(function(crNumber){
            data.reactContentRequest.viewShotList.click();
            common.waitForElement(data.reactShotList.returnShotIds(1));
            data.reactShotList.returnShotIds(1).getText().then(function(shotID){
                console.log("Shots belong to Content Request " + crNumber)
                let crInShotID = shotID.substring(3,6);
                expect(crNumber).toBe(crInShotID)
            })
        })
    });

    it('Verify the page title', function () {
        browser.logger.info("***********Verifying title of shot listing page***********");
        contentRequestPage.verifyDataOnListing(data.reactGlobal.titleLeft, data.reactShotList.shotTitle, 'Title')
            .then(function(title){
                console.log("Title of CR page is: " + title)
            })
    });

    it('Verify the shot count on shot listing page', function () {
        browser.logger.info("***********Verifying the shot count***********");
        common.waitForElement(data.reactShotList.returnShotIds(1));
        shotsPage.getShotCount(10).then(function(count){
            expect(count).toEqual(9);
        })
    });

    it('Verify data on shot listing page', function () {
        browser.logger.info("***********Verifying data on shot listing page***********");
        shotsPage.verifyDataOnShotListing();
    });

    it('Verify category of shots',  async function () {
        await browser.logger.info("***********Verifying category of shots listing page***********");
        await shotsPage.getArrayOfCategories(10)
            .then(async function(actualCategories){
                await expect(data.reactGlobal.expectedCategories).toEqual(actualCategories);
                console.log("Categories found on admin panel are: "+actualCategories);
                console.log("Expected categories where: "+data.reactGlobal.expectedCategories);
        })
    });

    it('Verify due date of shots',  async function () {
        await browser.logger.info("***********Verifying due dates of shots***********");
        browser.navigate().back();
        common.waitForElement(data.reactContentRequest.crId);
        contentRequestPage.setDate().then(function(date){
            data.reactContentRequest.viewShotList.click();
            shotsPage.verifyDueDateOfShot(10, date).then(function(numberOfshots){
                console.log(numberOfshots + " number of shots out of " + 9+ " have dates same as CR!")
            })
        })
    });

    it('Verify while opening shot edit drawer', async function () {
        await browser.logger.info("***********Verifying opening of shot drawer***********");
        common.openDrawer(data.reactShotList.returnShotColumn(1, 3), data.reactContentRequest.commentButton);
    });

    it('Verify setting schedule date time to a shot', async function () {
        await browser.logger.info("***********Verifying assigning scheduled on date to shot***********");
        shotsPage.assignDateToShot('Scheduled', data.reactShotList.scheduledOn);
    });

    it('Verify setting due date time to a shot', async function () {
        await browser.logger.info("***********Verifying assigning due date to shot***********");
        shotsPage.assignDateToShot('Due', data.reactShotList.dueOn);
    });

    it('Verify navigation inside the drawer', async function () {
        await browser.logger.info("***********Verifying navigation inside shot drawer***********");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(1),
            data.reactShotList.returnShotDetail('SHOT DETAILS'), "General navigation within shot drawer");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(2),
            data.reactShotList.returnShotDetail('TALENT'), "Talent navigation within shot drawer");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(3),
            data.reactShotList.returnShotDetail('SCHEDULE'), "Schedule navigation within shot drawer");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(4),
            data.reactShotList.returnShotDetail('COMMENT'), "Comment navigation within shot drawer");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(5),
            data.reactShotList.returnShotDetail('References'), "Reference navigation within shot drawer");
        shotsPage.shotNavigation(data.reactShotList.returnShotNavigation(6),
            data.uploadWidget.uploadButton, "Upload navigation within shot drawer");
    });

    it('Verify while adding a new shot and its presence in the listing', async function () {
        await browser.logger.info("***********Verifying adding a new shot***********");
        await data.reactShotList.addNewShotDropDown.click().then(async function(){
            await data.reactShotList.returnNewShotCategory('Product: Stylized Hero').click();
            browser.sleep(1000);

            await data.reactShotList.returnShotColumn(1, 2).getText().then(async function(shotNumber){
                browser.sleep(1000);
                let trunNumber= shotNumber.substring(12,14);
                await expect(parseInt(trunNumber)).toBe(10);
                await console.log("Shot number " + trunNumber + " successfully added to CR!")
            })
        })
    });

    it('Verify while adding details to newly added shots', async function () {
        await browser.logger.info("***********Verifying adding details to the newly shot***********");
        await shotsPage.updateDataFromShotDrawer();
    })

    it('Verify by adding props', async function () {
        await browser.logger.info("***********Verifying by adding props***********");
        await browser.sleep(1000);
        await shotsPage.addRemoveProps().then(function(){
            console.log("Prop added and removed successfully!")
        })
    })

    it('Verify by adding locations', async function () {
        await browser.logger.info("***********Verifying by adding locations***********");
        await browser.sleep(1000);
        await shotsPage.addLocation().then(function(){
            console.log("Location added successfully!")
        })
    })

    it('Verify by adding talent', async function () {
        await browser.logger.info("***********Verifying by adding talent***********");
        await browser.sleep(1000);
        await shotsPage.addTalent().then(function(){
            console.log("Talent added successfully!")
        })
    })

    it('Verify by verifying details in edit drawer', async function () {
        await browser.logger.info("***********Verifying details saved in drawer***********");
        await common.openDrawer(data.reactShotList.returnShotColumn(2, 2), data.reactContentRequest.commentButton);
        await common.openDrawer(data.reactShotList.returnShotColumn(1, 2), data.reactContentRequest.commentButton);
        await shotsPage.verifyDetailsInDrawer();
    });

    it('Verify while adding due and scheduled date to newly added shots and verify details on listing', async function () {
        await browser.logger.info("***********Adding dates to the newly shot***********");
        await shotsPage.assignDateToShot('Scheduled', data.reactShotList.scheduledOn).then(async function(){
            await common.verifyText(data.reactGlobal.shotStatus.status3, data.reactShotList.shotStatusDrawer,  "Status in drawer")
                .then(function(status){
                    console.log("Assigning scheduled date changed status to: " + status)
                })
        });
        await shotsPage.assignDateToShot('Due', data.reactShotList.dueOn).then(async function(date){
            await data.reactGlobal.closeDrawer.click();
            await shotsPage.verifyDetailsInListing(date);
        })
    });

    it('Verify if details were saved in DB by refreshing the page', async function () {
        await browser.logger.info("***********Verifying details were saved in DB***********");
        browser.refresh();
        common.waitForElement(data.reactShotList.returnShotColumn(1, 2));
        common.openDrawer(data.reactShotList.returnShotColumn(1, 2), data.reactContentRequest.commentButton);
        shotsPage.verifyDetailsInDrawer();
    });

    it('Verify by setting scheduled date to multiple shots', async function () {
        await browser.logger.info("***********Verifying by setting scheduled date to multiple shots***********");
        // browser.refresh();
        for(i=5;i<10;i++){
            common.waitForElement(data.reactShotList.returnShotColumn(i, 2));
            common.openDrawer(data.reactShotList.returnShotColumn(i, 2), data.reactContentRequest.commentButton);
            shotsPage.assignDateToShot('Scheduled', data.reactShotList.scheduledOn, "Calendar");
        }

    });

});
