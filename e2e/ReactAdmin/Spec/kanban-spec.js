let contentRequestPage = require('../PageObject/contentRequest-po.js');
let shotCardPage = require('../PageObject/shotCard-po.js');
let shotPage = require('../PageObject/shots-po.js');
let kanbanPage = require('../PageObject/kanban-po.js');
let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let dragAndDrop = require('html-dnd').code;
let shotNumber;
let pg = require('../../../Utils/postgresDB.js');
let queries = require('../../../Utils/queriesToRun');


describe('Verify kanban page on React admin', function () {

    beforeAll(function () {
        common.waitForElement(data.kanban.kanbanNavigation);
        data.kanban.kanbanNavigation.click();
        common.waitForElement(data.kanban.returnDraggableElement(1,1));
        if(data.kanban.swimlane){
            browser.logger.info('Admin is on kanban page');
            browser.refresh();
        }else{
            browser.logger.info("Admin couldn't reach the kanban page");
        }
    });

    it('Verify that only cards with todays date appear under photoshoot swimlane', function () {
        shotPage.verifyScheduledDateOfShot(data.kanban.returnDraggableElement(1, 1), data.reactShotList.scheduledOn, 'date')
            .then(function(scheduledDate){
                browser.logger.info("Photoshoot swimlane has todays date: " + scheduledDate);
            })

    });

    it('Verify the page title', function () {
        contentRequestPage.verifyDataOnListing(data.reactGlobal.titleLeft, data.kanban.kanbanTitle, 'Title');

    });

    it('Verify dragging & dropping of cards from Photoshoot to Selection', function () {

        kanbanPage.dragDropKanban(data.kanban.returnDraggableElement(1, 1),
                    data.kanban.returnDroppableElement(2), data.kanban.returnDraggableElement(2,1),
            data.shotCard.returnShotNumber(1,1), data.shotCard.returnShotNumber(2,1), 'Selection');

    });

    it('Verify dragging & dropping of cards from Selection to Editing', function () {

        kanbanPage.dragDropKanban(data.kanban.returnDraggableElement(2, 1),
            data.kanban.returnDroppableElement(3), data.kanban.returnDraggableElement(3,1),
            data.shotCard.returnShotNumber(2,1), data.shotCard.returnShotNumber(3,1), 'Editing');

    });

    it('Verify dragging & dropping of cards from Editing to Done', function () {

        kanbanPage.dragDropKanban(data.kanban.returnDraggableElement(3, 1),
            data.kanban.returnDroppableElement(4), data.kanban.returnDraggableElement(4,1),
            data.shotCard.returnShotNumber(3,1), data.shotCard.returnShotNumber(4,1), 'Done');

    });

    it('Verify cards having future schedule dates or no dates don\'t show up here!', function () {
        kanbanPage.verifyForFutureOrNoDates();
    });

    it('Verify moving shot back to Backlog', function () {

        shotPage.changeStatusOfShot(data.kanban.returnDraggableElement(1, 1), data.shotCard.returnShotNumber(1,1), 'Backlog');

    });

    it('Verify moving shot back to Done', function () {

        shotPage.changeStatusOfShot(data.kanban.returnDraggableElement(1, 1), data.shotCard.returnShotNumber(1,1), 'Done', data.shotCard.returnShotNumber(4,1));

    });

    it('Verify that dragging back to Photoshoot is restricted!', function () {
        kanbanPage.dragDropKanban(
            data.kanban.returnDraggableElement(3, 1),
            data.kanban.returnDroppableElement(1), data.kanban.returnDraggableElement(1,1),
            data.shotCard.returnShotNumber(3,1), data.shotCard.returnShotNumber(1,1), 'Photoshoot'
        );
    });

    it('Verify searching through kanban', function () {
        // kanbanPage.searchKanban('Brandless: Uniqueness');
        browser.sleep(4000);
        common.waitForElement(data.kanban.returnDraggableElement(1, 1));
        kanbanPage.searchKanban(fakeData.randomFirstName);
        browser.refresh();

    });

    it('Verify making category changes from edit drawer are reflected on the listing in kanban', function () {
        shotPage.changeShotCategoryAndSetup(data.kanban.returnDraggableElement(2, 1), data.shotCard.returnShotCategory(2, 1),
            data.reactShotList.shotCategory, data.reactShotList.selectedCategory);
    });

    it('Verify making setup changes from edit drawer are reflected on the listing in kanban', function () {
        shotPage.changeShotCategoryAndSetup(data.kanban.returnDraggableElement(2, 1), data.shotCard.returnShotSetup(2, 1),
            data.reactShotList.shotSetup, data.reactShotList.selectedSetup);
    });

    it('Verify that shots marked as Done in the last 7 days show up under Done swimlane', function () {
        pg.pgAdmin.ExecuteQuery(queries.queries.DONE_QUERY,  row => kanbanPage.verifyCountOnSwimlanes(row, 4));

    });

    it('Verify the shot count under Editing swimlane', function () {
        pg.pgAdmin.ExecuteQuery(queries.queries.EDITING_QUERY,  row => kanbanPage.verifyCountOnSwimlanes(row, 3));
    });


    it('Verify the shot count under Selection swimlane', function () {
        pg.pgAdmin.ExecuteQuery(queries.queries.SELECTION_QUERY,  row => kanbanPage.verifyCountOnSwimlanes(row, 2));
    });


    it('Verify the shot count under Photoshoot swimlane', function () {
        pg.pgAdmin.ExecuteQuery(queries.queries.PHOTOSHOOT_QUERY,  row => kanbanPage.verifyCountOnSwimlanes(row, 1));
    });
});
