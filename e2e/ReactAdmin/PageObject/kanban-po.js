let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let dJangoAdminLogin = require('../../Admin/PageObject/adminLogin_po.js');
let queries = require('../../../Utils/queriesToRun');
let pg = require('../../../Utils/postgresDB.js');
let dragAndDrop = require('html-dnd').code;
let shotPage = require ('./shots-po');
let shotCardPage = require('../PageObject/shotCard-po.js');

function kanbanPage() {

    this.dragDropKanban = function (draggable, droppable, dropped, verifyNumber1, verifyNumber2, status, refreshFlag) {

        return new Promise(function (resolve, reject) {

            shotCardPage.verifyShotNumber(draggable, verifyNumber1).then(function (shotNumber) {
                browser.logger.info("Shot number of the card to be dragged is: " + shotNumber);
                browser.logger.info("Implementing drag and drop.....");
                browser.executeScript(dragAndDrop, draggable,
                    droppable).then(function () {
                        browser.sleep(2000);
                        if(refreshFlag !== 0){
                            browser.refresh();
                        }
                    browser.logger.info("Verifying status of dragged card.....");
                    shotPage.verifyStatusOfShot(dropped, status).then(function () {
                        browser.logger.info("Drag and drop done....verifying shot number...... ");

                        shotCardPage.verifyShotNumber(dropped, verifyNumber2).then(function (droppedNumber) {
                            browser.logger.info("After dragging..dropped card number is: " + droppedNumber);
                            if (droppedNumber === shotNumber) {
                                browser.logger.info("Card dragged successfully!!");
                                resolve();
                            }
                            else {
                                browser.logger.info("Shot numbers didn't match..drag & drop didn't work OR you tried to put that card back to Photoshoot!!");
                            }
                            data.reactGlobal.closeDrawer.click();

                        })
                    });
                })
            });

        });
    };

    this.verifyForFutureOrNoDates = function () {

        return new Promise(function (resolve, reject) {
            for(i=1; i<5; i++){
                let elem = data.kanban.returnDraggableElement(1, i);
                shotPage.verifyScheduledDateOfShot(elem, data.reactShotList.scheduledOn, 'date')
                    .then(function(scheduled){
                        if(scheduled){
                           browser.logger.info("Scheduled date is not in the future or isnt null!!");
                        }
                        else{
                            browser.logger.info("Scheduled date is in future and is also null!!");
                        }
                    })
            }


        });
    };

    this.searchKanban = function (brand) {

        return new Promise(function (resolve, reject) {
            data.reactGlobal.searchIcon.click();
            data.reactGlobal.searchTextField.sendKeys(brand).then(function(){
                common.waitForElement(data.kanban.returnDraggableElement(1, 1));
                for(i=1; i<5; i++){
                    let elem = data.kanban.returnDraggableElement(1, i);
                    shotPage.verifyBrandOfShot(elem, brand)
                        .then(function(brandName){
                            if(brandName){
                                browser.logger.info("Search has been performed successfully on kanban!!");
                            }
                            else{
                                browser.logger.info("Something wrong with kanban search!!");
                            }
                        })
                }
            })



        });
    };

    this.verifyCountOnSwimlanes = function (queryResponse, queryType) {
        browser.logger.info(queryResponse['count'] + "---" + queryType);
        return new Promise(function (resolve, reject) {
            common.waitForElement(data.shotCard.returnShotCountInSwimlane(queryType));
            browser.logger.info("Number of cards returned from query is: " + queryResponse['count']);
            data.shotCard.returnShotCountInSwimlane(queryType).getText().then(function (count) {
                if(count === queryResponse['count']){
                    browser.logger.info("Count on swimlane same as per database!!");
                    resolve(count);
                }
            });
        });
    };



};
module.exports = new kanbanPage();
