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
let navigationPage = require('../PageObject/navigation-po');

describe('Verify production calendar page on React admin', function () {

    beforeAll(function () {
        navigationPage.goToPage(data.productionCalendar.productionCalendarNavigation, data.productionCalendar.currentSlot, "Production Calendar");
    });

    it('Verify the page title', async function () {
        await browser.logger.info("***********Verify page title***********");
        await contentRequestPage.verifyDataOnListing(data.reactGlobal.productionCalendarTitle, data.productionCalendar.productionCalendarTitle, 'Title');
    });

    // it('Verify searching for a spilled shot using CRID', async function () {
    //     await browser.logger.info("***********Verify searching for a CRID for spilled shot***********");
    //     await productionCalendarPage.searchCalendar('Spilled', data.productionCalendar.returnSpilledLine(0));
    // });
    //
    // it('Verify the presence of a card in spilled section of backlog', async function () {
    //     await browser.logger.info("***********Verify the presence of a card in spilled section of backlog***********");
    //     await productionCalendarPage.getShotCard('Spilled', data.productionCalendar.returnSpilledLine(0)).then(async function (id) {
    //     });
    // });
    //
    // it('Verify dragging spilled card in backlog in calendar', async function () {
    //     await browser.logger.info("***********Verify dragging spilled card in backlog***********");
    //     await productionCalendarPage.getShotCard('Spilled', data.productionCalendar.returnSpilledLine(0)).then(async function (id) {
    //         await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id),
    //             data.productionCalendar.currentSlot, data.productionCalendar.returnShotCardInCalendar(id),
    //             data.productionCalendar.returnShotNumberOnProductionCalendar(id), data.productionCalendar.returnShotNumberOnProductionCalendar(id), 'Photoshoot', 0)
    //             .then(async function () {
    //                 await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id), data.reactShotList.scheduledOn, 'datetime')
    //                     .then(async function(actualScheduled, expectedScheduled){
    //                         await browser.logger.info("Card successfully moved to calendar with date: " + actualScheduled);
    //                     })
    //             });
    //     });
    // });

    it('Verify dragging spilled card from calendar to backlog', async function () {
        await browser.refresh();
        await productionCalendarPage.getShotCard('Current-Calendar', data.productionCalendar.returnSpilledLine(0)).then(async function(id) {
            await data.productionCalendar.returnShotCardInCalendar(id).isDisplayed().then(async function() {
                await productionCalendarPage.getShotCard('Backlog', data.productionCalendar.returnSpilledLine(0)).then(async function(id2) {
                    await kanbanPage.dragDropKanban(data.productionCalendar.returnShotCardInCalendar(id),
                        data.productionCalendar.returnShotCardInCalendar(id2), data.productionCalendar.returnShotCardInCalendar(id),
                        data.productionCalendar.returnShotNumberOnProductionCalendar(id), data.productionCalendar.returnShotNumberOnProductionCalendar(id), 'Backlog', 0)
                        .then(async function () {
                            await shotPage.verifyScheduledDateOfShot(data.productionCalendar.returnShotNumberOnProductionCalendar(id), data.reactShotList.scheduledOn, 'blank');
                            browser.logger.info("Scheduled date removed for the card dropped in backlog!")
                        });
                })
            })
        });
    });

    // it('Verify searching for a shot pushed in calendar using CRID', async function () {
    //     await browser.logger.info("***********Verify searching for a CRID for spilled shot***********");
    //     await productionCalendarPage.searchCalendar('Spilled', data.productionCalendar.spilledLine);
    // });

// it('Verify the presence of a card in backlog', async function () {
//     await browser.logger.info("***********Verify the presence of a card in backlog***********");
//     await productionCalendarPage.getShotCard('Backlog').then(async function (id) {
//     });
// });
//
// it('Verify the presence of a card in backlog', async function () {
//     await browser.logger.info("***********Verify the presence of a card in backlog***********");
//     await productionCalendarPage.getShotCard('Backlog').then(async function (id) {
//     });
// });
//
// it('Verify the total backlog count', async function () {
//     await browser.logger.info("***********Verify total backlog count***********");
//
//     await pg.pgAdmin.ExecuteQuery(queries.queries.BACKLOG_QUERY,  row => productionCalendarPage.verifyCountOnBacklog(row));
// });
});
