let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let contentRequestPage = require('../PageObject/contentRequest-po.js');
let shotCardPage = require('../PageObject/shotCard-po.js');
let sgpt = require('sg-protractor-tools');
let fakeData = require('../../../Utils/FakeData.js');
let defaultShotStatus = data.reactGlobal.shotStatus.status1;
let values = data.reactShotList.values;
let products = values.fakeProduct3 +  ", " + fakeData.randomFirstName + " Spray";

// let products = values.fakeProduct + ", " + values.fakeProduct2 + ", " + values.fakeProduct3;


function shotsPage() {

    this.getShotCount = function (max) {
        return new Promise(async function(resolve, reject) {

            browser.logger.info("Verifying the number of shots in shot listing page.....")
            let shotCount = 0;
            for (i = 1; i < max; i++) {
                await data.reactShotList.returnShotIds(i).isDisplayed().then(async function (result) {
                    if (result) {
                        shotCount++;
                    }
                    else {
                        browser.logger.info("Was unable to find shot at position " + i);
                    }
                })
            }
            await browser.logger.info("Total " + shotCount + " shots exist in CR");
            resolve(shotCount);
        });
    };

    this.verifyDataOnShotListing =  function () {
        return new Promise(async function(resolve, reject) {
            await browser.logger.info("***********Verifying default status of shot***********");

            await contentRequestPage.verifyDataOnListing(data.reactShotList.returnShotColumn(1,3), defaultShotStatus)
                .then(function(status){
                    console.log("Default status of shot is : " + status)
                })

            await browser.logger.info("***********Verifying products of shot***********");

            await contentRequestPage.verifyDataOnListing(data.reactShotList.returnShotColumn(1,4), '')
                .then(function(product){
                    console.log("Products in shot are: " + product)
                })
        })
    };

    this.getArrayOfCategories = function (max) {
        const categoryArray = [];
        return new Promise( function(resolve, reject){
            common.waitForElement(data.reactShotList.returnShotColumn(1,5));

            for (let i=1;i<max; i++) {
                data.reactShotList.returnShotColumn(i, 5).getText().then(function (category) {
                    categoryArray.push(category);
                    if(i===9){
                        resolve(categoryArray)
                    }
                })

            };
        });
    }

    this.verifyDueDateOfShot = function (max, date) {
        let count2 = 0;
        common.waitForElement(data.reactShotList.returnShotColumn(1, 8))
        return new Promise( function(resolve, reject){
            for (let i=1;i<max; i++) {
                data.reactShotList.returnShotColumn(i, 8).getText().then(function (dateOnAdmin) {
                    if(dateOnAdmin === date){
                        count2++
                    }
                    if(i===9){
                        resolve(count2)
                    }
                })

            };
        });
    }

    this.assignDateToShot = function (type, element, page) {
        return new Promise(async function (resolve, reject) {
            data.reactShotList.navigateToSchedule.click();
            browser.sleep(2000);
            await element.click()
                .then(function () {
                    if(type === 'Scheduled'){
                        data.reactGlobal.selectedTodayDate.click();
                        data.reactGlobal.selectedTime.click();
                        browser.sleep(1000);
                    }
                    else if(type === 'Due'){
                        data.reactShotList.returnCrossIcon(2).click();
                        element.click();
                        browser.actions().doubleClick(data.reactGlobal.calendarNextButton).perform();
                        // data.reactGlobal.calendarNextButton.click();
                        data.reactContentRequest.dateToBeSelected.click();
                        browser.sleep(1000);
                        browser.sleep(1000);
                    }

                    if(page !== 'Calendar'){
                        data.reactGlobal.closeDrawer.click().then(function () {
                            browser.sleep(2000);
                            common.openDrawer(data.reactShotList.returnShotColumn(1, 3), data.reactContentRequest.commentButton);
                            element.getAttribute('value').then(function (date) {
                                browser.logger.info(type + " date assigned to shot is " + date);
                                resolve(date);
                            });
                        });
                    }
                    else if(page === 'Calendar'){
                        data.reactGlobal.userProfile.click();
                        browser.sleep(2000);
                        element.getAttribute('value').then(function (date) {
                            browser.logger.info(type + " date assigned to shot is " + date);
                            resolve(date);
                        });
                    }


                });
        });
    };

    this.verifyStatusOfShot = function (elem, expectedStatus) {
        return new Promise(function (resolve, reject) {
            common.waitForElement(elem);
            common.openDrawer(elem, data.reactShotList.statusOfShot);
            data.reactShotList.statusOfShot.getText().then(function (value) {
                if (value === expectedStatus) {
                    browser.logger.info("Status of shot is: " + expectedStatus);
                    browser.logger.info('Status of shot successfully changed!!');
                    resolve(expectedStatus);
                }

            });
        });

    };

    this.changeStatusOfShot = function (elem, verifynumber, expectedStatus, verifynumber2) {
        return new Promise(function (resolve, reject) {
            shotCardPage.verifyShotNumber(elem, verifynumber).then(function (value) {
                common.openDrawer(elem, data.reactShotList.statusOfShot);
                data.reactShotList.statusOfShot.click().then(function () {
                    if (expectedStatus === 'Backlog') {
                        data.reactShotList.backlogStatus.click().then(function () {
                            browser.sleep(2000);
                            browser.refresh();
                            shotCardPage.verifyShotNumber(elem, verifynumber).then(function (value2) {
                                if (value !== value2) {
                                    browser.logger.info('Status changed to ' + expectedStatus);
                                    resolve();
                                }
                                else {
                                    browser.logger.info('Some problem occurred while changing status to: ' + expectedStatus)
                                }
                                ;
                            })

                        })
                    }
                    else if (expectedStatus === 'Done') {
                        data.reactShotList.doneStatus.click().then(function () {
                            browser.sleep(2000);
                            browser.refresh();
                            common.waitForElement(verifynumber2);
                            shotCardPage.verifyShotNumber(elem, verifynumber2).then(function (value2) {
                                if (value === value2) {
                                    browser.logger.info('Status changed to ' + expectedStatus);
                                    resolve();
                                }
                                else {
                                    browser.logger.info('Some problem occurred while changing status to: ' + expectedStatus)
                                }
                                ;
                            })

                        })
                    }


                });

            })


        });

    };
    
    this.verifyScheduledDateOfShot = function (elem, scheduled, type) {
        return new Promise(function (resolve, reject) {
            browser.logger.info("Verifying scheduled date on dragged card.....");
            common.waitForElement(elem);
            common.openDrawer(elem, scheduled);
            scheduled.getAttribute('value').then(function (value) {
                console.log("Scheduled date set inside shot card is: " + value);
                if (type === 'date') {
                    common.returnCurrentDateOrTime('', 'date').then(function (expectedScheduled) {
                        browser.logger.info("Expected : " + expectedScheduled + " Actual: " + value);

                        if (value.includes(expectedScheduled)) {

                            resolve(expectedScheduled);
                        }
                        else if (value > expectedScheduled || value === '') {
                            browser.logger.info("Photoshoot swimlane does not have todays date!!");
                            return false;
                        }

                    });
                }
                else if (type === 'datetime') {
                    common.returnCurrentDateOrTime('','datetime').then(function (expectedScheduledDateTime) {
                        console.log("Date time returned from common function is: " + expectedScheduledDateTime)
                        let expectedScheduledDateHour = expectedScheduledDateTime.substring(0, 15);
                        let actualScheduledDateHour = value.substring(0, 15);
                        console.log("Expected DateHour is: " + expectedScheduledDateHour + " Actual DateHour is: " + actualScheduledDateHour);
                        if (expectedScheduledDateHour === actualScheduledDateHour) {
                            data.reactGlobal.closeDrawer.click();
                            resolve(value, expectedScheduledDateTime);
                        }
                        else {
                            browser.logger.info("Schedule on date times donot match!!");
                            return false;
                        }

                    })
                }

                else if (type === 'futureDatetime') {
                    common.returnCurrentDateOrTime('setDate','datetime').then(function (expectedScheduledDateTime) {
                        let expectedScheduledHour = expectedScheduledDateTime.substring(12, 14);
                        let actualScheduledHour = value.substring(12, 14);

                        browser.logger.info("Expected DateHour is: " + expectedScheduledHour + " Actual DateHour is: " + actualScheduledHour);
                        if (parseInt(actualScheduledHour) === (parseInt(expectedScheduledHour) + 3) - 1) {
                            data.reactGlobal.closeDrawer.click();
                            resolve(value, expectedScheduledDateTime);
                        }
                        else {
                            browser.logger.info("Schedule on date times donot match!!");
                            return false;
                        }

                    })
                }

                else if (type === 'blank') {
                    if (value === '') {
                        browser.logger.info("No scheduled on date set!!")
                        resolve();
                    }
                    else {
                        browser.logger.info("Schedule on date is still set to a date!!")
                    }
                }
            });
        });

    };

    this.verifyScheduledDateOnDrawer = function (actualScheduledDate, expectedScheduledDate) {
        return new Promise(function (resolve, reject) {
            if (actualScheduledDate === expectedScheduledDate) {
                browser.logger.info("Scheduled date assigned to shot is " + actualScheduledDate);
                resolve(actualScheduledDate);
            }
            else {
                reject("Dates didn't match!");
            }

        });
    };

    this.verifyBrandOfShot = function (elem, expectedBrand) {
        return new Promise(function (resolve, reject) {
            common.waitForElement(elem);
            data.shotCard.returnBrandName(1, 1).getText().then(function (value) {
                if (value === expectedBrand) {
                    browser.logger.info("Brand of shot is: " + expectedBrand);
                    resolve(expectedBrand);
                }
                else {
                    return false;
                }

            });
        });

    };

    this.changeShotCategoryAndSetup = function (elemClick, cardCategorySetup, drawerCategorySetup, toBeSelected) {
        return new Promise(function (resolve, reject) {
            common.waitForElement(elemClick);
            common.openDrawer(elemClick, drawerCategorySetup);
            drawerCategorySetup.click().then(function () {
                toBeSelected.click().then(function () {
                    browser.sleep(2000);
                    drawerCategorySetup.getText().then(function (changedCategorySetup) {
                        browser.refresh();
                        common.waitForElement(cardCategorySetup);
                        cardCategorySetup.getText().then(function (onCardCategorySetup) {
                            if (changedCategorySetup.includes(onCardCategorySetup)) {
                                browser.logger.info("Category/ Setup changed successfully to: " + onCardCategorySetup);
                            }
                            else {
                                browser.logger.info("Some error occurred while changing category/ setup");
                            }
                        })

                    })
                });

            })


        });

    };

    this.verifyCRShotID = function (page, refreshFlag) {

        return new Promise(function (resolve, reject) {
            data.reactShotList.CRShotID.getText().then(function (CRShot) {
                browser.logger.info("CR and Shot ID of shot inside edit drawer is: " + CRShot);
                browser.sleep(5000);
                data.reactShotList.navigateToUploadShotImage.click();
                browser.sleep(2000);
                data.uploadWidget.uploadButton.click();
                common.waitForElement(data.uploadWidget.captureTab);
                // uploadWidgetPage.verifyWidgetOpens(page, refreshFlag);
                data.uploadWidget.CRShotIDWidget.getText().then(function (CRShotWidget) {
                    browser.logger.info("CR and Shot ID of shot inside upload widget is: " + CRShotWidget);
                    if (CRShot === CRShotWidget) {
                        browser.logger.info("CR and Shot IDs match on widget!!")
                    }
                    else {
                        browser.logger.info("CR and Shot IDs don't match!!")
                    }
                })

            });

        });
    };

    this.getShotCRShotID = function () {

        return new Promise(function (resolve, reject) {
            data.reactShotList.CRShotID.getText().then(function (CRShot) {
                browser.logger.info("CR and Shot ID of shot inside edit drawer is: " + CRShot);
                resolve(CRShot);
            });

        });
    };

    this.shotNavigation = function (navigateTo, verify, message) {

        return new Promise(function (resolve, reject) {
            navigateTo.click();
            common.waitForElement(verify);
            common.isElementPresent(verify, message);

        });
    };


    this.addRemoveProps = function () {

        return new Promise(function (resolve, reject) {

            // Adding existing props
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.props).sendKeys(values.fakeProp);
            common.waitForElement(data.reactContentRequest.propSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.returnShotDrawerFields(data.placeholder.shots.lighting)).perform();
            browser.sleep(3000);
            data.reactContentRequest.propSelectedFilter.click();
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.props).sendKeys(values.fakeProp2);
            common.waitForElement(data.reactContentRequest.propSelectedFilter);
            data.reactContentRequest.propSelectedFilter.click();
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.props).sendKeys(values.fakeProp3);
            common.waitForElement(data.reactContentRequest.propSelectedFilter);
            data.reactContentRequest.propSelectedFilter.click();
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.props).sendKeys(values.fakeProp4);
            common.waitForElement(data.reactContentRequest.propSelectedFilter);
            data.reactContentRequest.propSelectedFilter.click();

            //Remove recently added prop
            // data.reactShotList.removeProductOrProp(6,4).click();

            resolve();
        });
    };

    this.addLocation = function () {

        return new Promise(function (resolve, reject) {

            //Adding location
            data.reactShotList.addLocation.sendKeys(values.location);
            common.waitForElement(data.reactContentRequest.locationSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.talentNotes).perform();
            browser.sleep(3000);
            data.reactContentRequest.locationSelectedFilter.click();
            resolve();
        });
    };

    this.addTalent = function () {

        return new Promise(function (resolve, reject) {

            //Add photographer
            data.reactShotList.addTalent.sendKeys(values.addTalent);
            common.waitForElement(data.reactContentRequest.talentSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.talentSelectedFilter.click();

            common.waitForElement(data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer))
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer).sendKeys(values.photographer1);
            common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.photographerSelectedFilter.click();

            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer).sendKeys(values.photographer2);
            common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.photographerSelectedFilter.click();

            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer).sendKeys(values.photographer3);
            common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.photographerSelectedFilter.click();

            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer).sendKeys(values.photographer4);
            common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.photographerSelectedFilter.click();

            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addPhotographer).sendKeys(values.photographer5);
            common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            browser.sleep(1000);
            data.reactContentRequest.photographerSelectedFilter.click();

            //Add a photographer
            browser.sleep(1500);
            data.reactShotList.removeProductOrProp(5,5).click();
            browser.sleep(1000);

            data.reactGlobal.userProfile.click();

            // Add other talents
            // data.reactShotList.addTalent.sendKeys(values.addTalent2);
            // common.waitForElement(data.reactContentRequest.talentSelectedFilter);
            // browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            // browser.sleep(1000);
            // data.reactContentRequest.talentSelectedFilter.click();
            //
            // common.waitForElement(data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addModel))
            // data.reactShotList.returnShotDrawerFields(data.placeholder.shots.addModel).sendKeys(values.model1);
            // common.waitForElement(data.reactContentRequest.photographerSelectedFilter);
            // browser.actions().mouseMove(data.reactShotList.dueOn).perform();
            // browser.sleep(1000);
            // data.reactContentRequest.photographerSelectedFilter.click();

            resolve();

        });
    };

    this.updateDataFromShotDrawer =  function () {

        return new Promise(function (resolve, reject) {

            common.waitForElement(data.reactShotList.shotCategory);
            common.waitForElement(data.reactShotList.shotSetup);
            //Updating the category
            data.reactShotList.shotCategory.click();
            data.reactShotList.updateCategory.click();

            //Updating the setup
            data.reactShotList.shotSetup.click();
            data.reactShotList.returnNewShotCategory(data.reactGlobal.setup.setup2).click();
            browser.sleep(1000);

            //Adding existing products
            // data.reactShotList.returnShotDrawerFields(data.placeholder.shots.product).sendKeys(values.fakeProduct);
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.product).sendKeys(fakeData.randomFirstName + " Spray");
            browser.sleep(1000);
            common.waitForElement(data.reactContentRequest.selectFilteredOption);
            data.reactContentRequest.selectFilteredOption.click();
            browser.sleep(1000);
            // data.reactShotList.returnShotDrawerFields(data.placeholder.shots.product).sendKeys(fakeData.randomFirstName);
            // common.waitForElement(data.reactContentRequest.selectFilteredOptionTwo);
            // data.reactContentRequest.selectFilteredOption.click();
            // browser.sleep(1000);


            //Adding new product
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.product).sendKeys(values.fakeProduct3);
            common.waitForElement(data.reactContentRequest.selectFilteredOption);
            data.reactContentRequest.selectFilteredOption.click();
            browser.sleep(2000);

            //Adding shot notes
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.shotNotes).sendKeys(values.shotNotes);

            //Adding product styling
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.productStyling).sendKeys(values.productStyling);

            //Adding prop notes
            data.reactShotList.propNotes.sendKeys(values.propNotes);

            //Adding lightning
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.lighting).sendKeys(values.lighting);

            //Adding background
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.background).sendKeys(values.background);

            //Adding colors
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.colors).sendKeys(values.colors);

            //Adding camera angle
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.cameraAngle).sendKeys(values.cameraAngle);

            //Adding shadows
            browser.actions().mouseMove(data.reactShotList.returnShotDrawerFields(data.placeholder.shots.shadows)).click();
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.shadows).sendKeys(values.shadows);

            //Adding cropping
            data.reactShotList.returnShotDrawerFields(data.placeholder.shots.cropping).sendKeys(values.cropping);

            //Adding location notes
            data.reactShotList.locationNotes.sendKeys(values.locationNotes);

            //Adding talent notes
            data.reactShotList.talentNotes.sendKeys(values.talentNotes);

            //Adding model apparel notes
            data.reactShotList.modelApparelNotes.sendKeys(values.modelApparelNotes);

            data.reactGlobal.userProfile.click();
            browser.sleep(1500);

            resolve();

        });
    };

    this.verifyDetailsInDrawer =  function () {

        return new Promise(function (resolve, reject) {
            browser.sleep(2500);

            //Verifying the category
            common.verifyText('Product: E-Commerce', data.reactShotList.shotCategory, "Category on shot");

            //Verifying the setup
            common.verifyText(data.reactGlobal.setup.setup2, data.reactShotList.shotSetup, "Setup on shot");

            //Verifying products

            // common.verifyText(fakeData.randomFirstName, data.reactShotList.returnProductPill(3), "Product 1 on shot");

            // common.verifyText(values.fakeProduct, data.reactShotList.returnProductPill(1), "Product 1 on shot");
            // common.verifyText(values.fakeProduct2, data.reactShotList.returnProductPill(2), "Product 2 on shot");

            common.verifyText(fakeData.randomFirstName + " Spray", data.reactShotList.returnProductPill(2), "Product 2 on shot");
            common.verifyText(values.fakeProduct3, data.reactShotList.returnProductPill(1), "Product 3 on shot");

            //Verifying shot notes
            common.verifyText(values.shotNotes, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.shotNotes), "Shot notes on shot");

            // Verifying product styling
            common.verifyText(values.productStyling, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.productStyling), "Product styling on shot");

            //Verifying prop notes
            common.verifyText(values.propNotes, data.reactShotList.propNotes, "Prop notes on shot");

            //Verifying lighting
            common.verifyText(values.lighting, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.lighting), "Lighting info on shot", "true");

            //Verifying background
            common.verifyText(values.background, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.background), "Background info on shot");

            //Verifying colors
            common.verifyText(values.colors, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.colors), "Colors info on shot", "true");

            //Verifying camera angle
            common.verifyText(values.cameraAngle, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.cameraAngle), "Camera angle info on shot", "true");

            //Verifying shadows
            common.verifyText(values.shadows, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.shadows), "Shadows info on shot", "true");

            //Verifying cropping
            common.verifyText(values.cropping, data.reactShotList.returnShotDrawerFields(data.placeholder.shots.cropping), "Cropping info on shot", "true");

            //Verifying location notes
            common.verifyText(values.locationNotes, data.reactShotList.locationNotes, "Location notes on shot");

            //Verifying talent notes
            common.verifyText(values.talentNotes, data.reactShotList.talentNotes, "Talent notes on shot");

            //Verifying model apparel notes
            common.verifyText(values.modelApparelNotes, data.reactShotList.modelApparelNotes, "Model apparel notes on shot");

            //Verify Props
            common.verifyText(values.fakeProp4, data.reactShotList.returnPropPill(1), "Prop 1 on shot");
            common.verifyText(values.fakeProp, data.reactShotList.returnPropPill(2), "Prop 2 on shot");
            common.verifyText(values.fakeProp3, data.reactShotList.returnPropPill(3), "Prop 3 on shot");

            //Verify Location
            common.verifyText(values.location, data.reactShotList.returnLocationPill(), "Location on shot");

            //Verify Photographers mapped to shot
            common.verifyText(values.photographer5, data.reactShotList.returnPhotographerPill(1), "Photographer 1 on shot");
            common.verifyText(values.photographer1, data.reactShotList.returnPhotographerPill(2), "Photographer 2 on shot");
            common.verifyText(values.photographer4, data.reactShotList.returnPhotographerPill(3), "Photographer 3 on shot");
            common.verifyText(values.photographer2, data.reactShotList.returnPhotographerPill(4), "Photographer 4 on shot");

            resolve();
        });
    };

    this.verifyDetailsInListing =  function (date) {

        return new Promise(function (resolve, reject) {
            browser.sleep(2500);

            //Verifying status
            common.verifyText(data.reactGlobal.shotStatus.status3, data.reactShotList.returnShotColumn(1, 3),  "Status in listing");

            //Verifying products
            common.verifyText(products, data.reactShotList.returnShotColumn(1, 4), "Products on listing");

            //Verifying category
            common.verifyText('Product: E-Commerce', data.reactShotList.returnShotColumn(1, 5), "Category on listing");

            //Verifying setup
            common.verifyText(data.reactGlobal.setup.setup2, data.reactShotList.returnShotColumn(1, 6), "Setup on listing");

            //Verify due date
            common.verifyText(date, data.reactShotList.returnShotColumn(1, 8), "Due date on listing");

            resolve();
        });
    };
};

module.exports = new shotsPage();
