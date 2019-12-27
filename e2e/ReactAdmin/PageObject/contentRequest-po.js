let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
const idArray = [];
let isDescending = true;
let isAscending = true;
const success = true;
let message;
let sgpt = require('sg-protractor-tools');
let fakeData = require('../../../Utils/FakeData.js');

function contentRequestPage() {

    this.verifyDataOnListing =  function (elem, expectedValue, field, check) {
        return new Promise(function(resolve, reject) {
        common.waitForElement(elem);
            if(check !== 'contain'){
                elem.getText().then(function(value){
                    console.log("Expected Value is: " + expectedValue + "| Actual: " + value);                    expect(value).toEqual(expectedValue);
                    resolve(value);
                })
            }
            else{
                elem.getText().then(function(value){
                    console.log("Expected Value is: " + expectedValue + "| Actual: " + value)
                    expect(value).toContain(expectedValue);
                    resolve(value);
                })
            }
        })

    };

    this.verifyCRNumber = function (element) {

        return new Promise(function(resolve, reject){
            common.waitForElement(element)
            element.getText().then(function(crID){
                let truncCRId = crID.substring(3,6)
                resolve(truncCRId);
            });
        });

    };

    this.arrayOfIds = function() {

        return new Promise(function(resolve, reject){
            setTimeout(function() {

                for (let i=1; ; i++) {
                    if (i > 4) break;
                    $('div:nth-child(' + i + ') > div:nth-child(1) > span').getText().then(function (id) {
                        idArray.push(id);
                    })

                };

                if(success) {
                    resolve();
                } else {
                    reject('Error: Something went wrong');
                }
            }, 10000);
        });
    };


    this.verifySortingOrder = function(){
        return new Promise(function(resolve, reject) {

            setTimeout(function () {
                browser.logger.info("First four IDs of CRs in listing " + idArray)
                let l = idArray.length - 1;
                for (let j = 0; j <= l - 1; j++) {
                    isDescending = isDescending && (idArray[j] > idArray[j + 1]);
                    isAscending = isAscending && (idArray[j] < idArray[j + 1]);

                }
                if (isAscending) {
                    message = 'CRs are in ascending order';
                }
                else if (isDescending) {
                    message = 'CRs are in descending order';
                }
                else {
                    message = 'CRs are not sorted';
                }
                resolve(message);
            }, 1000);
        });
    };


    this.updateDataFromDrawer =  function () {

        console.log("Adding and removing brand.....");
        data.reactContentRequest.crossIconSingle.click();
        data.reactContentRequest.addBrand.click();
        common.waitForElement(data.reactContentRequest.selectFilteredOption);
        data.reactContentRequest.addBrand.sendKeys(fakeData.randomFirstName);
        // data.reactContentRequest.addBrand.sendKeys(data.reactGlobal.fakeData);
        common.waitForElement(data.reactContentRequest.selectFilteredOption);
        data.reactContentRequest.selectFilteredOption.click();

        console.log("Deleting channels.....");
        data.reactContentRequest.channelPill.isDisplayed().then(async function (result) {
            if (result) {
                for(k=1; k<7; k++){
                    data.reactContentRequest.deleteChannel.click();
                }
            }
        })

        console.log("Adding new channels.....");
        data.reactContentRequest.addChannels.click();
        data.reactContentRequest.addChannels.sendKeys(data.reactContentRequest.channel);
        common.waitForElement(data.reactContentRequest.selectFirstChannel);
        data.reactContentRequest.selectFirstChannel.click();

        console.log("Adding notes.....");
        sgpt.scroll.scrollTo(data.reactContentRequest.commentButton);
        browser.actions().mouseMove(data.reactGlobal.notes).click();
        data.reactGlobal.notes.clear();
        data.reactGlobal.notes.sendKeys(data.reactGlobal.notesText);

    };

    this.setDate =  function () {
        return new Promise(function(resolve, reject) {

            data.reactGlobal.datePicker.click().then(function() {
                data.reactGlobal.calendarNextButton.click();
                data.reactContentRequest.dateToBeSelected.click();
                browser.sleep(1000);
                data.reactContentRequest.hambuger.click();
                browser.sleep(1000);
                data.reactGlobal.closeDrawer.click()
                    .then(function(){
                        common.openDrawer(data.reactContentRequest.brandName, data.reactContentRequest.commentButton);
                        data.reactGlobal.datePicker.getAttribute('value').then(function(date){
                            browser.logger.info("Due date assigned to content request is " + date);
                            resolve(date);
                        });
                    });

            });

        });
    };

    this.changeStatusOfCR =  function (setToStatus, expectedStatus) {
        // data.reactContentRequest.brandInCRListing.click();
        // data.reactContentRequest.crCreator.click();
        common.waitForElement(data.reactContentRequest.statusDropDown)
        data.reactContentRequest.statusDropDown.click();
        // data.reactContentRequest.selectStatusOfCR(setToStatus).click().then(function(){
        common.waitForElement(data.reactContentRequest.readyStatus);
        data.reactContentRequest.readyStatus.click().then(function(){
            browser.sleep(1000);
            data.reactGlobal.closeDrawer.click();
            data.reactContentRequest.status.getText().then(function(status){
                if(status === expectedStatus){
                    console.log("Status of CR successfully changed to " + status);
                }
            })
        })

    };

};

module.exports = new contentRequestPage();
