let contentRequestPage = require('../PageObject/contentRequest-po.js');
let productionCalendarPage = require('../PageObject/productionCalendar-po.js');
let shotPage = require('../PageObject/shots-po.js');
let kanbanPage = require('../PageObject/kanban-po.js');
let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let dragAndDrop = require('html-dnd').code;
let shotNumber;
let pg = require('../../../Utils/postgresDB.js');
let queries = require('../../../Utils/queriesToRun');
let timeSlot;
let sgpt = require('sg-protractor-tools');


describe('Verify production calendar page on React admin', function () {

    beforeAll(function () {
        navigationPage.goToPage(data.reactContentRequest.crNavigation, data.reactContentRequest.viewShotList, "Content Request");
        productionCalendarPage.getShotCard().then(async function(id) {

            browser.logger.info("Shot detail ID of card to be detected is: " + id);
            common.waitForElement(data.productionCalendar.returnShotCardInCalendar(id));
            data.productionCalendar.returnShotCardInCalendar(id).isDisplayed().then(async function(result){
                if(result){
                    browser.logger.info("Admin is on production calendar page!!");
                }
                else{
                    browser.logger.info("Admin could not reach the production calendar page!!");

                }
            })
        })
    });

    // afterEach(function(){
    //     browser.refresh();
    // });

    it('Verify the page title', async function () {
        await browser.logger.info("***********Verify page title***********");

        await contentRequestPage.verifyDataOnListing(data.reactGlobal.productionCalendarTitle, data.productionCalendar.productionCalendarTitle, 'Title');

    });

    it('Verify the total backlog count', async function () {
        await browser.logger.info("***********Verify total backlog count***********");

        await pg.pgAdmin.ExecuteQuery(queries.queries.BACKLOG_QUERY,  row => productionCalendarPage.verifyCountOnBacklog(row));
    });

    it('Verify assigning schedule date to a shot', async function () {
        await productionCalendarPage.getShotCard('Backlog').then(async function(id) {
            data.productionCalendar.returnShotCardInCalendar(id).isDisplayed().then(async function () {

                await data.productionCalendar.returnShotCardInCalendar(id).click();
                common.waitForElement(data.reactContentRequest.commentButton);
                await browser.actions().mouseMove(data.reactContentRequest.commentButton).perform();
                browser.sleep(2000);
                await shotPage.assignDateToShot('Scheduled', data.reactShotList.scheduledOn, 'Calendar')
                    .then(async function(date){
                        await browser.logger.info("Scheduled date assigned to shot is: " + date);
                        browser.refresh();
                        common.waitForElement(data.productionCalendar.returnGeneralBrandOnCard(0));
                        // browser.refresh(6000);
                        sgpt.scroll.scrollTo(data.productionCalendar.returnShotCardInCalendar(id));
                        browser.actions().mouseMove(data.productionCalendar.returnShotCardInCalendar(id)).perform();
                        common.waitForElement(data.productionCalendar.returnShotCardInCalendar(id));
                        await common.returnCurrentDate().then(async function (currentDate) {
                            await shotPage.verifyStatusOfShot(data.productionCalendar.returnShotCardInCalendar(id), 'Photoshoot')
                                .then(function (status) {
                                    browser.logger.info("Status of shot after assigning date is: " + status)
                                });
                            truncDate = date.substring(0,12);
                            console.log("PAAAARULL " + truncDate + " | " + currentDate);
                            await shotPage.verifyScheduledDateOnDrawer(truncDate, currentDate)
                                .then(async function(scheduledDate){
                                    await browser.logger.info("Scheduled Date set in card is: " + scheduledDate);
                                });

                        });
                    });
            });
        });
    });

    it('Verify dragging & dropping of cards from Backlog to current slot in calendar', async function() {
        await browser.logger.info("***********Backlog to current slot in calendar***********");
        await productionCalendarPage.getShotCard('Backlog').then(async function(id1){

            data.productionCalendar.returnShotCardInCalendar(id1).isDisplayed().then(async function(){
                await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id1),
                    data.productionCalendar.currentSlot, data.productionCalendar.returnShotCardInCalendar(id1),
                    data.productionCalendar.returnShotNumberOnProductionCalendar(id1), data.productionCalendar.returnShotNumberOnProductionCalendar(id1), 'Photoshoot', 0)
                    .then(async function(){

                        await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id1), data.reactShotList.scheduledOn, 'datetime')
                            .then(async function(actualScheduled, expectedScheduled){
                                await browser.logger.info("Card successfully moved to calendar with date: " + actualScheduled);
                            })
                    });
            })

        });

    });


    it('Verify dragging & dropping of cards from Backlog to some other time slot in current calendar', async function () {
        await browser.logger.info("***********Backlog to some other time slot in same date***********");

        await productionCalendarPage.getShotCard('Backlog').then(async function(id2) {

            await data.productionCalendar.returnShotCardInCalendar(id2).isDisplayed().then(async function() {

                await common.returnCurrentDateTime().then(async function (currentDateTime) {
                    timeSlot = parseInt(currentDateTime.substring(12, 14)) + 3;
                    await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id2),
                        data.productionCalendar.returnCalendarSlot(timeSlot), data.productionCalendar.returnShotCardInCalendar(id2),
                        data.productionCalendar.returnShotNumberOnProductionCalendar(id2), data.productionCalendar.returnShotNumberOnProductionCalendar(id2), 'Photoshoot', 0)
                        .then(async function () {

                            await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id2), data.reactShotList.scheduledOn, 'futureDatetime')
                                .then(async function (actualScheduled, expectedScheduled) {
                                    await browser.logger.info("Card successfully moved to calendar to time: " + actualScheduled);
                                })
                        });
                })
            })
        });

    });

    it('Verify moving cards within the calendar', async function () {
        await browser.logger.info("**********Moving cards within the calendar***********");

        await productionCalendarPage.getShotCard('Current-Calendar').then(async function(id3) {

            await data.productionCalendar.returnShotCardInCalendar(id3).isDisplayed().then(async function() {

                await common.returnCurrentDateTime().then(async function (currentDateTime) {
                    timeSlot = parseInt(currentDateTime.substring(12, 14)) + 3;
                    await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id3),
                        data.productionCalendar.returnCalendarSlot(timeSlot), data.productionCalendar.returnShotCardInCalendar(id3),
                        data.productionCalendar.returnShotNumberOnProductionCalendar(id3), data.productionCalendar.returnShotNumberOnProductionCalendar(id3), 'Photoshoot', 0)
                        .then(async function () {
                            await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id3), data.reactShotList.scheduledOn, 'futureDatetime')
                                .then(async function (actualScheduled, expectedScheduled) {
                                    await browser.logger.info("Card successfully moved from backlog to calendar at scheduled time: " + actualScheduled);
                                })
                        });
                })
            })
        });

    });

    it('Verify moving cards from calendar to backlog', async function () {
        await browser.logger.info("***********Moving cards from calendar to backlog***********");

        await productionCalendarPage.getShotCard('Current-Calendar').then(async function(id4) {

            await data.productionCalendar.returnShotCardInCalendar(id4).isDisplayed().then(async function() {

                await productionCalendarPage.getShotCard('Backlog').then(async function(id5) {
                    await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id4),
                        data.productionCalendar.returnShotCardInCalendar(id5), data.productionCalendar.returnShotCardInCalendar(id4),
                        data.productionCalendar.returnShotNumberOnProductionCalendar(id4), data.productionCalendar.returnShotNumberOnProductionCalendar(id4), 'Backlog', 0)
                        .then(async function () {
                            await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id4), data.reactShotList.scheduledOn, 'blank');
                            browser.logger.info("Scheduled date removed for the card dropped in backlog!")
                        });
                })
            })
        });

    });

    it('Verify by moving shot from backlog to some other date and from future calendar back to backlog', async function () {
        await browser.logger.info("***********Backlog to some other future date***********");
        await productionCalendarPage.getShotCard('Backlog').then(async function(id7) {

            await data.productionCalendar.returnShotCardInCalendar(id7).isDisplayed().then(async function() {
                await data.productionCalendar.datePickerOnCalendar.click().then(async function () {
                    await data.reactGlobal.calendarNextButton.click().then(async function () {
                        data.productionCalendar.selectedDate.click();
                        data.reactGlobal.userProfile.click();
                        browser.sleep(8000);
                        await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id7),
                            data.productionCalendar.currentSlot, data.productionCalendar.returnShotCardInCalendar(id7),
                            data.productionCalendar.returnShotNumberOnProductionCalendar(id7), data.productionCalendar.returnShotNumberOnProductionCalendar(id7), 'Photoshoot', 0)
                            .then(async function () {
                                await data.productionCalendar.returnShotNumberOnProductionCalendar(id7).click();
                                await data.reactShotList.scheduledOn.getAttribute('value').then(async function (value) {
                                    let actualScheduledDate = value.substring(3, 5);
                                    if (parseInt(actualScheduledDate) === 18) {
                                        await browser.logger.info("Card successfully moved to calendar with date: " + value);
                                        data.reactGlobal.closeDrawer.click();

                                    }
                                    await browser.logger.info("***********From future calendar back to backlog***********");

                                    await data.productionCalendar.returnShotCardInCalendar(id7).isDisplayed().then(async function() {

                                        await productionCalendarPage.getShotCard('Backlog').then(async function(id8) {
                                            await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id7),
                                                data.productionCalendar.returnShotCardInCalendar(id8), data.productionCalendar.returnShotCardInCalendar(id7),
                                                data.productionCalendar.returnShotNumberOnProductionCalendar(id7), data.productionCalendar.returnShotNumberOnProductionCalendar(id7), 'Backlog', 0)
                                                .then(async function () {
                                                    await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id7), data.reactShotList.scheduledOn, 'blank');
                                                    browser.logger.info("Scheduled date removed for the card dropped in backlog!")
                                                });
                                        })
                                    })
                                });


                            });
                    })
                });
            })
        })

    });

});
