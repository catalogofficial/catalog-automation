let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let dJangoAdminLogin = require('../../Admin/PageObject/adminLogin_po.js');
let queries = require('../../../Utils/queriesToRun');
let pg = require('../../../Utils/postgresDB.js');
let dragAndDrop = require('html-dnd').code;
let shotPage = require ('./shots-po');
let shotCardPage = require('../PageObject/shotCard-po.js');
let sgpt = require('sg-protractor-tools');
let EC = protractor.ExpectedConditions;
let contentRequestPage = require('../PageObject/contentRequest-po.js');


function productionCalendarPage() {

    this.getShotCard = function (type, waitFor) {

        return new Promise(function (resolve, reject) {
            let backlogCardID =  response => {
                browser.logger.info("Shot detail ID of card returned from query is: " + response['id']);
                let id = response['id'];
                common.waitForElement(waitFor);
                sgpt.scroll.scrollTo(data.productionCalendar.returnShotCardInCalendar(id));
                browser.actions().mouseMove(data.productionCalendar.returnShotCardInCalendar(id)).perform();
                common.waitForElement(data.productionCalendar.returnShotCardInCalendar(id));
                data.productionCalendar.returnShotCardInCalendar(id).isDisplayed().then(function(result){
                    if(result){
                        browser.logger.info("Card is present inside production calendar view with shot detail ID: " + response['id']);
                        resolve(id);
                    }
                    else{
                        browser.logger.info("Card with shot detail ID " + response['id'] + " could not be found anywhere on production calendar!!");

                    }

                })
            }

            if(type === 'Backlog'){
                pg.pgAdmin.ExecuteQuery(queries.queries.GET_BACKLOG_CARD_ID,  backlogCardID);
            }
            else if (type === 'Spilled') {
                pg.pgAdmin.ExecuteQuery(queries.queries.GET_SPILLED_CARD_ID,  backlogCardID);
            }
            else if(type === 'Current-Calendar'){
                pg.pgAdmin.ExecuteQuery(queries.queries.GET_CURRENT_CALENDAR,  backlogCardID);
            }
        });
    };


    this.searchCalendar = function (type, waitForElem) {
        return new Promise(function (resolve, reject) {
            let backlogCardID =  response => {
                browser.logger.info("CR ID of spilled card returned from query is: " + response['content_request_id']);
                let crId = response['content_request_id'];
                common.waitForElement(waitForElem);
                data.productionCalendar.searchCalendar.click();
                data.productionCalendar.searchCalendar.sendKeys(crId);
                browser.actions().sendKeys(protractor.Key.ENTER).perform();
                console.log("Searching for CRID on calendar.....")
                browser.wait((EC.presenceOf(waitForElem))).then(function(){
                    contentRequestPage.verifyDataOnListing(data.productionCalendar.returnShotNumberOnCard(0), crId, 'CRID on card', 'contain');
                    console.log("Search for CR ID performed successfully!!");
                    resolve(crId);
                });
            }

            if(type === 'Backlog'){
                pg.pgAdmin.ExecuteQuery(queries.queries.GET_CRID_BACKLOG_SHOT,  backlogCardID);
            }
            else if(type === 'Spilled'){
                pg.pgAdmin.ExecuteQuery(queries.queries.GET_CRID_SPILLED_SHOT,  backlogCardID);
            }
        });
    };

    this.verifyCountOnBacklog = function (queryResponse) {
        return new Promise(function (resolve, reject) {
            browser.logger.info("Number of cards returned from query is: " + queryResponse['count']);
            common.waitForElement(data.productionCalendar.backlogCount);
            data.productionCalendar.backlogCount.getText().then(function (count) {
                if(count === queryResponse['count']){
                    browser.logger.info("Count on swimlane same as per database!!");
                    resolve(count);
                }
                else{
                    browser.logger.info("Card count did not match!!")
                }
            });
        });
    };
};

module.exports = new productionCalendarPage();
